<template>
  <div v-if="checkRole(Rules.System.requestObj.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách đối tượng kiến nghị
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
                  clearable
                  dense
                  hide-details=""
                  label="Tên đối tượng"
                ></v-text-field>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <!-- <v-col v-if="checkRole(Rules.System.requestObj.actions.add)" class="col-auto">
                <v-btn
                  depressed
                  class="primary text-none"
                  @click="openAdd = true"
                  >Thêm mới</v-btn
                >
              </v-col> -->
            </v-row>
          </template>
          <template v-slot:[`item.stt`]="{ item }">
            <div class="d-flex align-center justify-center">
              {{ getItemIndex(item) }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip
              v-if="checkRole(Rules.System.requestObj.actions.update)"
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
            <!-- <v-tooltip v-if="checkRole(Rules.System.requestObj.actions.delete)" bottom>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openShowListStaff(item)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="warning">mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>Danh sách nhân sự</span>
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

    <addObj
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListGroup"
    ></addObj>
    <updateObj
      :open="openUpdate"
      :data="dataUpdate"
      @toggle="openUpdate = !openUpdate"
      @Success="getListGroup"
    ></updateObj>
    <detailObj
      :open="openDetail"
      :data="dataDetail"
      @toggle="openDetail = !openDetail"
      @Success="getListGroup"
    ></detailObj>
    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa đối tượng kiến nghị này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
    <dialogListStaff
      :open="showListStaff"
      :data="dataDetail"
      @toggle="showListStaff = !showListStaff"
      @success="getListGroup"
    ></dialogListStaff>
  </div>
</template>
<script>
import addObj from '~/components/doi-tuong-kien-nghi/addObj.vue'
import updateObj from '~/components/doi-tuong-kien-nghi/updateObj.vue'
import detailObj from '~/components/doi-tuong-kien-nghi/detailObj.vue'
import footerBo from '~/components/footer/footerBo.vue'
import dialogListStaff from '~/components/doi-tuong-kien-nghi/dialogListStaff.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addObj,
    updateObj,
    detailObj,
    footerBo,
    dialogListStaff,
  },
  data() {
    return {
      showListStaff: false,
      Rules,
      name: null,
      openAdd: false,
      dataDetail: {},
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
        Rules.System.requestObj.id,
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
      this.$store.dispatch('ObjectType/getObjType', data).then((res) => {
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
        .dispatch('ObjectType/getdelete', {
          id: this.groupID,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa đối tượng kiến nghị thành công')
            this.getListGroup()
          }
        })
    },
    showDetails(item) {
      this.dataDetail = item
      this.openDetail = true
    },
    openShowListStaff(item) {
      this.dataDetail = item

      this.showListStaff = true
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
          text: 'Tên đối tượng',
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
