<template>
  <div v-if="checkRole(Rules.System.session.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách khóa họp quốc hội
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
                  v-model="name"
                  dense
                  clearable
                  hide-details=""
                  label="Tên khóa họp"
                ></v-text-field>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col
                v-if="checkRole(Rules.System.session.actions.add)"
                class="col-auto pr-0"
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
          <template v-slot:[`item.stt`]="{ item }">
            <div class="d-flex align-center justify-center">
              {{ getItemIndex(item) }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip
              v-if="checkRole(Rules.System.session.actions.update)"
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
            <!-- <v-tooltip v-if="checkRole(Rules.System.session.actions.delete)" bottom>
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
            </v-tooltip> -->
            <v-tooltip
              v-if="checkRole(Rules.System.session.actions.updateStatus)"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="showDetails(item)">
                  <v-icon color="warning">mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>Danh sách kỳ</span>
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

    <addSession
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListGroup"
    ></addSession>
    <updateSession
      :open="openUpdate"
      :data="dataUpdate"
      @toggle="openUpdate = !openUpdate"
      @Success="getListGroup"
    ></updateSession>
    <detailSession
      :open="openDetail"
      :data="dataDetail"
      @toggle="openDetail = !openDetail"
    ></detailSession>
    <!-- @Success="getListGroup" -->
    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa khóa họp quốc hội này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
import addSession from '~/components/khoa-hop-quoc-hoi/addSession.vue'
import updateSession from '~/components/khoa-hop-quoc-hoi/updateSession.vue'
import detailSession from '~/components/khoa-hop-quoc-hoi/detailSession.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addSession,
    updateSession,
    detailSession,
    footerBo,
  },
  data() {
    return {
      Rules,
      name: null,
      openAdd: false,
      dataDetail: null,
      listItem: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      openUpdate: false,
      openDetail: false,
      open_delete: false,
      dataUpdate: null,
    }
  },
  mounted() {
    this.getListGroup()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.session.id,
        actionId
      )
      return isAllowed
    },
    getListGroup() {
      let data = {
        name: this.name == null ? this.name : this.name.trim(),
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('session/getSession', data).then((res) => {
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
      this.getListGroup()
    },
    changePage(value) {
      this.page = value
      this.getListGroup()
    },
    search() {
      this.page = 1
      this.getListGroup()
    },
    quest_update(value) {
      this.dataUpdate = value
      this.openUpdate = true
    },
    askForDeleteItem(value) {
      this.groupID = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('session/getdelete', {
          id: this.groupID,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa khóa họp quốc hội thành công')
            this.getListGroup()
          }
        })
    },
    showDetails(value) {
      this.dataDetail = value
      this.openDetail = true
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
          text: 'Tên khóa họp',
          sortable: false,
          value: 'name',
          align: 'left',
          width: '20%',
        },
        {
          text: 'Mô tả',
          sortable: false,
          value: 'description',
          align: 'left',
          width: '20%',
        },
        {
          text: 'Thứ tự sắp xếp',
          sortable: false,
          value: 'orderNo',
          align: 'center',
          width: '8%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          align: 'center',
          value: 'actions',
          width: '10%',
        },
      ]
    },
  },
}
</script>
