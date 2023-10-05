<template>
  <div v-if="checkRole(Rules.System.leader.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách người chỉ đạo
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
                dense
                v-model="name"
                hide-details=""
                label="Tên người chỉ đạo"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pr-0">
              <v-text-field
                outlined
                dense
                hide-details=""
                v-model="positions"
                label="Chức vụ"
              ></v-text-field>
            </v-col>
            <v-col class="col-auto pr-0">
              <v-btn depressed class="primary text-none" @click="search"
                >Tìm kiếm</v-btn
              >
            </v-col>
            <v-col
              v-if="checkRole(Rules.System.leader.actions.add)"
              class="col-auto pr-0"
            >
              <v-btn depressed class="primary text-none" @click="openAdd = true"
                >Thêm mới</v-btn
              >
            </v-col>
          </v-row>
        </template>
        <template v-slot:item="data">
          <tr>
            <td class="text-center">
              {{ data.index + 1 + itemsPerPage * (page - 1) }}
            </td>
            <td>{{ data.item.name }}</td>
            <td class="text-center">{{ data.item.position }}</td>
            <td class="text-center">
              <v-tooltip
                v-if="checkRole(Rules.System.leader.actions.update)"
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="quest_update(data.item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="success">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Cập nhật</span>
              </v-tooltip>
              <v-tooltip
                v-if="checkRole(Rules.System.leader.actions.delete)"
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="askForDeleteItem(data.item.id)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Xóa</span>
              </v-tooltip>
            </td>
          </tr>
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

    <addLeader
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getLeaders"
    ></addLeader>

    <updateLeader
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getLeaders"
    ></updateLeader>

    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa người chỉ đạo này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
import addLeader from '~/components/nguoi-chi-dao/addLeader.vue'
import updateLeader from '~/components/nguoi-chi-dao/updateLeader.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    updateLeader,
    addLeader,
    footerBo,
  },
  data() {
    return {
      name: null,
      positions: null,
      openDialogSearchMore: false,
      listItem: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      open_delete: false,
      openUpdate: false,
      openAdd: false,
      data: null,
      Rules,
    }
  },
  mounted() {
    this.getLeaders()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.leader.id,
        actionId
      )
      return isAllowed
    },
    getLeaders() {
      this.$store
        .dispatch('leader/getLeader', {
          name: this.name == null ? this.name : this.name.trim(),
          position:
            this.positions == null ? this.positions : this.positions.trim(),
          pageIndex: this.page,
          pageSize: this.itemsPerPage,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listItem = res.data.data.data
            this.pageCount = res.data.data.totalPages
          }
        })
    },
    geListCommonLeader() {
      this.$store.dispatch('commonController/commonLeader').then((res) => {
        // console.log(res)
        let arr = []
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            arr.push({
              text: item.name,
              value: item.id,
            })
          })
          this.$store.commit('commonController/setlistLeader', arr)
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
      this.getLeaders()
    },
    changePage(value) {
      this.page = value
      this.getLeaders()
    },
    search() {
      this.page = 1
      this.getLeaders()
    },
    askForDeleteItem(value) {
      this.idDelete = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('leader/getdelete', {
          id: this.idDelete,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa người chỉ đạo thành công')
            this.geListCommonLeader()
            this.getLeaders()
          }
        })
    },
    quest_update(value) {
      this.data = value
      this.openUpdate = true
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'Stt',
          sortable: false,
          align: 'center',
          width: '2%',
        },
        {
          text: 'Tên người chỉ đạo',
          sortable: false,
          align: 'center',
          width: '20%',
        },
        {
          text: 'Chức vụ',
          sortable: false,
          align: 'center',
          width: '10%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          align: 'center',
          width: '5%',
        },
      ]
    },
  },
}
</script>
