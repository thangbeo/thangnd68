<template>
  <div v-if="checkRole(Rules.System.problemGroup.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách nhóm vấn đề
      </div>
    </CardGlobal>
    <CardGlobal class="mt-3">
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
                hide-details=""
                label="Nhóm vấn đề"
              ></v-text-field>
            </v-col>
            <v-col class="col-auto pr-0">
              <v-btn depressed class="primary text-none" @click="search"
                >Tìm kiếm</v-btn
              >
            </v-col>
            <v-col
              v-if="checkRole(Rules.System.problemGroup.actions.add)"
              class="col-auto pr-0"
            >
              <v-btn depressed class="primary text-none" @click="openAdd = true"
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

        <template v-slot:[`item.createTime`]="{ item }">
          <div>
            {{ moment(item.createTime, 'DD/MM/YYYY').format('DD/MM/YYYY') }}
          </div>
        </template>
        <template v-slot:[`item.enable`]="{ item }">
          <v-chip v-if="item.enable == 'ENABLE'" small outlined color="success"
            >Hoạt động</v-chip
          >
          <v-chip v-else small outlined color="warning">Không hoạt động</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip
            v-if="checkRole(Rules.System.problemGroup.actions.update)"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="quest_update(item)" icon v-bind="attrs" v-on="on">
                <v-icon color="success">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Cập nhật</span>
          </v-tooltip>
          <v-tooltip
            v-if="checkRole(Rules.System.problemGroup.actions.delete)"
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
          <v-tooltip
            v-if="checkRole(Rules.System.problemGroup.actions.show_detail)"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="showDetails(item.id)"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="warning">mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>Chi tiết</span>
          </v-tooltip>
        </template>
      </v-data-table>
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

    <addGroup
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListGroup"
    ></addGroup>
    <updateGroup
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getListGroup"
    ></updateGroup>
    <detailGroup
      :open="openDetail"
      :data="data"
      @toggle="openDetail = !openDetail"
      @Success="getListGroup"
    ></detailGroup>
    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa vấn đề này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
import addGroup from '~/components/danh-sach-nhom-van-de/addGroup.vue'
import updateGroup from '~/components/danh-sach-nhom-van-de/updateGroup.vue'
import detailGroup from '~/components/danh-sach-nhom-van-de/detailGroup.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addGroup,
    updateGroup,
    detailGroup,
    footerBo,
  },
  data() {
    return {
      Rules,
      name: null,
      openAdd: false,
      listItem: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      openUpdate: false,
      openDetail: false,
      open_delete: false,
      data: null,
    }
  },
  mounted() {
    this.getListGroup()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.problemGroup.id,
        actionId
      )
      return isAllowed
    },
    geListCommonProblemGroup() {
      this.$store
        .dispatch('commonController/commonProblemGroup')
        .then((res) => {
          // console.log(res)
          let arr = []
          if (res.data.error.code === 0) {
            res.data.data.map((item) => {
              arr.push({
                text: item.name,
                value: item.id,
              })
            })
            this.$store.commit('commonController/setlistProblemGroup', arr)
          }
        })
    },
    getListGroup() {
      let data = {
        // createTime: '10/07/2021',
        // enable
        name: this.name == null ? this.name : this.name.trim(),
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('group/getGroup', data).then((res) => {
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
      this.data = value
      this.openUpdate = true
    },
    askForDeleteItem(value) {
      this.groupID = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('group/getDelete', {
          id: this.groupID,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa nhóm vấn đề thành công')
            this.geListCommonProblemGroup()
            this.getListGroup()
          }
        })
    },
    showDetails(item) {
      // this.$store.commit('utilitiesState/setIDGroup', item)
      this.$router.push(`/kien-nghi/danh-sach-kien-nghi?id=${item}`)
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
          text: 'Nhóm vấn đề',
          sortable: false,
          value: 'name',
          align: 'left',
          width: '30%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'enable',
          align: 'center',
          width: '11%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createTime',
          align: 'center',
          width: '12%',
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
