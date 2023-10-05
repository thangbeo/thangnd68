<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Tài khoản
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>
          <client-only>
            <v-data-table
              :headers="headers"
              :items="Listitem"
              :items-per-page="itemsPerPage"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:top>
                <v-row class="ma-0">
                  <v-spacer></v-spacer>
                  <v-col class="col-auto">
                    <v-text-field
                      dense
                      hide-details=""
                      v-model="UserName"
                      label="Tài khoản"
                      outlined
                      clearable
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="col-auto">
                    <v-text-field
                      dense
                      hide-details=""
                      v-model="fullName"
                      label="Họ tên"
                      outlined
                      clearable
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="col-auto">
                    <v-btn class="primary text-none" @click="search" depressed
                      >Tìm kiếm</v-btn
                    >
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.stt="{ item }">
                <div class="d-flex align-center justify-center">
                  {{ getItemIndex(item) }}
                </div>
              </template>
              <template v-slot:item.status="{ item }">
                <RenDerStatus :status="item.status"></RenDerStatus>
              </template>
              <template v-slot:item.approvalStatus="{ item }">
                <v-chip
                  small
                  outlined
                  :color="item.approvalStatus === 1 ? 'primary' : 'warning'"
                  >{{
                    item.approvalStatus === 1 ? 'Duyệt' : 'Chưa duyệt'
                  }}</v-chip
                >
              </template>
              <template v-slot:item.accountDepartment="{ item }">
                <div v-if="item.accountDepartment.department !== null">
                  {{ item.accountDepartment.department.fullName }}
                </div>
              </template>
              <template v-slot:item.action="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="setActionUpdate(item)"
                        v-on="on"
                        >mdi-pencil-box-multiple-outline</v-icon
                      >
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </client-only>
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
        </v-card>
      </v-col>
    </v-row>

    <UpdateUser
      @Success="Success"
      :dataItem="dataItem"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
    ></UpdateUser>
  </div>
</template>
<script>
import UpdateUser from '~/components/nguoi-dung/UpdateUser.vue'
import InsertUsert from '~/components/nguoi-dung/InsertUsert.vue'
import SingeDatePicker from '~/components/SingeDatePicker'
import RenDerStatus from '~/components/Status.vue'
import { mapState } from 'vuex'
import { state } from '~/store/login'
import ULT from '~/plugins/ult'
import Rules from '~/assets/configurations/Rules'
import Dialog from '~/components/Dialog'
import footerBo from '~/components/footer/footerBo.vue'
// 2 loai item : item tu database va item tu class mac dinh
export default {
  transition: 'slide-x-transition',
  components: {
    SingeDatePicker,
    RenDerStatus,
    Dialog,
    InsertUsert,
    UpdateUser,
    footerBo,
  },
  head() {
    return {
      title: 'Quản lý tài khoản',
    }
  },
  data: () => ({
    UserName: null,
    fullName: null,
    openConfirmReset: false,
    dataItem: null,
    openDialogInsert: false,
    openDialogUpdate: false,
    Rules,
    headers: [
      {
        text: 'STT',
        sortable: false,
        value: 'stt',
        width: '2%',
      },
      {
        text: 'Tên đăng nhập',
        sortable: false,
        value: 'userName',
        width: '13%',
      },

      { text: 'Họ tên', value: 'fullName', width: '15%', sortable: false },
      { text: 'Email', value: 'email', sortable: false, width: '10%' },
      // { text: 'Nhân sự', value: 'mobileNumber', sortable: false, width: '10%' },

      {
        text: 'Trạng thái duyệt',
        value: 'approvalStatus',
        sortable: false,
        align: 'center',
        width: '11%',
      },
      {
        text: 'Trạng thái kích hoạt',
        value: 'status',
        sortable: false,
        align: 'center',
        width: '11%',
      },
      {
        text: 'Chức năng',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '11%',
      },
    ],
    headerIP: [
      {
        text: 'Địa chỉ IP',
        value: 'ip_address',
        sortable: false,
        align: 'left',
      },
      {
        text: 'Chức năng',
        value: 'action',
        sortable: false,
        align: 'right',
      },
    ],
    openIPDialog: false,
    userItem: null,
    currentIP: [],
    deleteIP: [],
    editIP: '',
    errorIP: false,
    idxIP: -1,
    showPassword: false,
    units: ['admin', 'employee'],
    sexs: [
      { value: 0, text: 'Chọn giới tính' },
      { value: 1, text: 'Nam' },
      { value: 2, text: 'Nữ' },
    ],
    openConfirm: false,
    birthday: '',
    updateWhat: '',
    confirmMessage: '',
    openDeleteDialog: false,
    deleteMessage: '',
    openEditDialog: false,
    allowAccess: true,

    startIndex: 1,
    page: 1,
    pageCount: 10,
    itemsPerPage: 20,
    customPage: 1,
    Listitem: [],
    id: null,
    pageSizes: [10, 20, 50, 100, 150, 200, 300],
    openDetailDialog: false,
    rules: {
      required: (value) => !!value || 'Vui lòng nhập nội dung',
      checkIP: (value) => {
        return this.$isIPAddress(value) || 'Địa chỉ IP sai định dạng.'
      },
    },
  }),

  computed: {
    ...mapState({
      selectedItem: (state) => state.users.selectedItem,
      selectedIndex: (state) => state.users.selectedIndex,
      groups: (state) => state.users.groups,
      detailUser: (state) => state.users.detailUser,
      addressIpOfUser: (state) => state.users.addressIpOfUser,
      groupUser: (state) => state.users.groupUser,
      schedules: (state) => state.users.schedules,
    }),
    isSelectGroup() {
      return true
    },
    formTitle() {
      return this.selectedIndex === -1
        ? 'Thêm mới người dùng'
        : 'Cập nhật người dùng'
    },
    lst_group: {
      set(value) {
        this.$store.dispatch('users/changeComplexStateSeletedValue', {
          field: 'list_group',
          value: value,
        })
      },
      get() {
        return this.selectedItem.list_group
      },
    },
    getIPError() {
      return this.errorIP === true
        ? 'Địa chỉ IP không hợp lệ hoặc đã tồn tại.'
        : ''
    },
  },

  watch: {},

  mounted() {
    // if (!this.$isServer && this.checkRole(Rules.System.User.actions.view_list))
    console.log(1)
    this.initialize()
  },

  methods: {
    deleteUser() {
      this.$store
        .dispatch('users/deleted_user', { userId: this.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Success()
            this.$showSuccess(this, 'Xóa user thành công')
          }
        })
    },
    ResetUser() {
      this.$store.dispatch('users/reset_pass', this.id).then((res) => {
        if (res.data.error.code === 0) {
          this.Success()
          this.$showSuccess(this, 'Reset mật khẩu thành công')
        }
      })
    },
    Success() {
      this.getListItems()
    },
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.User.id,
        actionId
      )
      return isAllowed
    },
    getItemIndex(item) {
      return (
        (this.page - 1) * this.itemsPerPage + this.Listitem.indexOf(item) + 1
      )
    },
    changePageSize(value) {
      this.page = 1
      this.itemsPerPage = value

      this.$refs.pagination.reset()
      this.getListItems()
    },
    changePage(value) {
      this.page = value
      this.getListItems()
    },
    getListItems() {
      this.$store
        .dispatch('users/get_list', {
          pageIndex: this.page,
          pageSize: this.itemsPerPage,
          userName: this.UserName,
          fullName: this.fullName,
          approvalStatus: 1,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data.data
            this.pageCount = res.data.data.totalPages
          }
        })
    },
    search() {
      this.page = 1
      this.getListItems()
    },
    initialize() {
      this.getListItems()
    },

    setSelectedItem(item) {
      this.$store.dispatch('users/setSelectedItem', item)
    },

    setActionUpdate(item) {
      // console.log(item, '(item')
      this.dataItem = item
      this.openDialogUpdate = true
      // console.log(this.dataItem)
    },

    changeBirthdayTest(value) {
      console.log(value, 'AAAAA')
      //this.birthday=value
    },

    //update event to save add add new
    updateItem() {
      //update ip
      //console.log(this.currentIP,'updateItem');
      this.$store.dispatch('users/changeComplexStateSeletedValue', {
        field: 'ip',
        value: this.currentIP,
      })
      //update in there
      this.$store.dispatch('users/saveItem', this.deleteIP).then((res) => {
        if (res == 1) {
          this.toggleEditDialog()
        }
      })
      //remove IP
    },

    changeStatus(value, item) {
      //console.log(value)
      this.updateWhat = 'STATUS'
      //this.setSelectedItem(item)
      this.$store
        .dispatch('users/setSelectedItemWithDetailInfor', { item })
        .then((res) => {
          this.$store.dispatch('users/changeSimpleStateSeletedValue', {
            field: 'status',
            value: value,
            inItem: true,
          })
          this.toggleConfirm()
        })
    },

    // detail user
    setActionDetail(item) {
      this.$store.dispatch('users/setSelectedItemWithDetailInfor', { item })
      this.toggleDetailDialog()
    },

    setNewStatus(value) {
      //console.log(value)
      this.$store.dispatch('users/changeSimpleStateSeletedValue', {
        field: 'status',
        value,
      })
    },
    //ask to delete
    askForDeleteItem(item) {
      this.id = item.id
      this.openConfirm = true
      // this.setSelectedItem(item)
      // this.deleteMessage =
      //   'Bạn có muốn xóa người dùng ' + item.user_name + ' này không?'
      // this.toggleDeleteDialog()
    },
    deleteItem(item) {
      this.$store.dispatch('users/deleteItem', item)
      //this.toggleDeleteDialog()
    },

    setResetUserPass(item) {
      this.openConfirmReset = true
      this.id = item.id
    },

    resetUserPass() {
      this.$store.dispatch('users/resetPass')
    },

    confirmAction() {
      if (this.openConfirm) {
        if (this.updateWhat == 'RESET') {
          this.resetUserPass()
        } else {
          this.$store.dispatch('users/setStatus')
        }
        //this.toggleConfirm()
      }
    },
    toggleConfirm() {
      this.openConfirm = !this.openConfirm
      if (this.openConfirm) {
        if (this.updateWhat == 'RESET')
          this.confirmMessage =
            'Bạn có muốn reset mật khẩu của người dùng này không?'
        else
          this.confirmMessage =
            'Bạn có muốn thay đổi trạng thái của người dùng này không?'
      } else {
        if (this.updateWhat !== 'RESET') {
          //console.log(this.updateWhat)
          this.$store.dispatch('users/undoChangeStatus')
        }

        this.updateWhat = ''
        this.confirmMessage = ''
      }
    },
    setActionForIP(item, action) {
      //console.log(item,'IP');
      if (action === 0) {
        //them moi
        this.editIP = ''
        this.idxIP = -1
      }
      this.toggleIPDialog()
    },
    saveIP() {
      let ip = this.editIP
      if (this.$isIPAddress(ip) === false) {
        this.errorIP = true
        return
      }
      let hasExist = false
      this.currentIP.forEach((p) => {
        if (p.ip_address === ip) hasExist = true
      })
      if (hasExist) {
        this.errorIP = true
        return
      }
      if (this.idx == undefined || this.idxIP < 0) {
        let lst = []
        this.currentIP.forEach((p) => {
          lst.push({ ip_address: p.ip_address, id: p.id })
        })
        lst.push({ ip_address: ip, id: 0 })
        this.currentIP = lst
      }

      this.$store.dispatch('users/changeComplexStateSeletedValue', {
        field: 'ip',
        value: this.currentIP,
      })
      this.toggleIPDialog()
    },
    removeIP(item) {
      let obj = this.currentIP.find((i) => i.ip_address === item.ip_address)
      let idx = this.currentIP.indexOf(obj)
      if (idx >= 0) {
        let lst = []
        this.currentIP.forEach((p) => {
          if (p.ip_address !== item.ip_address) lst.push(p)
        })
        this.currentIP = lst
        if (item.id > 0)
          //this.$store.dispatch('users/deleteIP', item.id)
          this.deleteIP.push(item.id)
      }
    },

    toggleEditDialog() {
      this.openEditDialog = !this.openEditDialog
      if (!this.openEditDialog) {
        this.$store.dispatch('users/unsetItem')
      }
    },
    toggleDeleteDialog() {
      this.openDeleteDialog = !this.openDeleteDialog
    },
    toggleDetailDialog() {
      this.openDetailDialog = !this.openDetailDialog
    },
    toggleIPDialog() {
      this.openIPDialog = !this.openIPDialog
      if (this.openIPDialog === false) this.errorIP = false
    },
    //-----------toogle dialog---
  },
}
</script>
