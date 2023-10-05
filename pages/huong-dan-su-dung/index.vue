<template>
  <div v-if="checkRole(Rules.System.tutorial.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Hướng dẫn sử dụng
      </div>
    </CardGlobal>
    <CardGlobal class="mt-3">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="listItem"
          :items-per-page="itemsPerPage"
          hide-default-footer
          loading-text="Xin chờ"
          no-results-text="Không có kết quả phù hợp"
          no-data-text="Không có dữ liệu"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:top>
            <v-row class="ma-0" align="center">
              <v-spacer></v-spacer>
              <v-col cols="2" class="pr-0">
                <v-text-field
                  outlined
                  dense
                  clearable
                  v-model="name"
                  hide-details=""
                  label="Tên hướng dẫn"
                ></v-text-field>
              </v-col>
              <v-col class="col-auto">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col
                v-if="checkRole(Rules.System.tutorial.actions.add)"
                class="col-auto px-0"
              >
                <v-btn
                  depressed
                  class="primary text-none"
                  @click="openAdd = true"
                  >Thêm mới</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.createTime`]="{ item }">
            <div>
              {{ moment(item.createTime, 'DD/MM/YYYY').format('DD/MM/YYYY') }}
            </div>
          </template>
          <template v-slot:[`item.stt`]="{ item }">
            <div class="d-flex align-center justify-center">
              {{ getItemIndex(item) }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip
              v-if="checkRole(Rules.System.tutorial.actions.update)"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="quest_update(item)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Cập nhật</span>
            </v-tooltip>
            <v-tooltip
              v-if="checkRole(Rules.System.tutorial.actions.down)"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-none borderButton"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  depressed
                  text
                  :href="item.document.url"
                  target="_blank"
                >
                  <v-icon color="warning">mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Tải xuống</span>
            </v-tooltip>

            <v-tooltip
              v-if="checkRole(Rules.System.tutorial.actions.delete)"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="askForDeleteItem(item.id)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Xóa</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </client-only>
    </CardGlobal>
    <pagination
      class="px-0 pt-3 pb-3"
      ref="pagination"
      :pageCount="pageCount"
      :page="page"
      :pageSize="itemsPerPage"
      @changePage="changePage"
      @changePageSize="changePageSize"
      depressed="true"
    ></pagination>
    <addTutorial
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListRequest"
    ></addTutorial>
    <updateTutorial
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getListRequest"
    ></updateTutorial>
    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa file hướng dẫn này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
import addTutorial from '~/components/huong-dan-su-dung/addTutorial.vue'
import updateTutorial from '~/components/huong-dan-su-dung/updateTutorial.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addTutorial,
    updateTutorial,
    footerBo,
  },
  data() {
    return {
      Rules,
      openAdd: false,
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      name: null,
      listItem: [],
      openUpdate: false,
      open_delete: false,
      data: null,
    }
  },
  mounted() {
    this.getListRequest()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.tutorial.id,
        actionId
      )
      return isAllowed
    },

    getListRequest() {
      let data = {
        name: this.name == null ? this.name : this.name.trim(),
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('tutorial/getListTutorial', data).then((res) => {
        if (res.data.error.code === 0) {
          this.listItem = res.data.data.data
          this.pageCount = res.data.data.totalPages
        }
      })
    },
    getItemIndex(item) {
      return (
        (this.page - 1) * this.itemsPerPage + this.listItem.indexOf(item) + 1
      )
    },
    changePageSize(value) {
      this.page = 1
      this.itemsPerPage = value

      this.$refs.pagination.reset()
      this.getListRequest()
    },
    changePage(value) {
      this.page = value
      this.getListRequest()
    },
    search() {
      this.page = 1
      this.getListRequest()
    },
    quest_update(value) {
      this.data = value
      this.openUpdate = true
    },
    askForDeleteItem(value) {
      this.idDelete = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('tutorial/getDelete', {
          id: this.idDelete,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa dữ liệu thành công')
            this.getListRequest()
          }
        })
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'Stt',
          sortable: false,
          align: 'center',
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên hướng dẫn',
          sortable: false,
          align: 'center',
          value: 'name',
          width: '30%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          align: 'center',
          value: 'createTime',
          width: '10%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          align: 'center',
          value: 'actions',
          width: '8%',
        },
      ]
    },
  },
}
</script>
