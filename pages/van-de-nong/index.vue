<template>
  <div v-if="checkRole(Rules.System.hotProblem.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách vấn đề nóng
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
                  hide-details=""
                  v-model="name"
                  label="Tên vấn đề"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-select
                  outlined
                  dense
                  clearable
                  :items="itemStatus"
                  hide-details=""
                  v-model="status"
                  label="Trạng thái"
                ></v-select>
              </v-col>

              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col
                v-if="checkRole(Rules.System.hotProblem.actions.add)"
                class="col-auto"
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
          <template v-slot:item="data">
            <tr>
              <td class="text-center">
                {{ data.index + 1 + itemsPerPage * (page - 1) }}
              </td>
              <td class="text-left">{{ data.item.name }}</td>
              <td class="text-left">{{ data.item.description }}</td>
              <td class="text-center">{{ data.item.createBy }}</td>
              <td class="text-center">{{ data.item.updateBy }}</td>
              <td class="text-center">
                {{
                  moment(data.item.createTime, 'DD/MM/YYYY').format(
                    'DD/MM/YYYY'
                  )
                }}
              </td>
              <td class="text-center">
                {{ data.item.orderNo }}
              </td>

              <td class="text-center">
                <v-chip
                  v-if="data.item.enable == 'ENABLE'"
                  small
                  outlined
                  color="success"
                >
                  Hoạt động
                </v-chip>
                <v-chip small outlined v-else color="warning">
                  Không hoạt động</v-chip
                >
              </td>
              <td class="text-center">
                <v-tooltip
                  v-if="checkRole(Rules.System.hotProblem.actions.update)"
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="quest_update(data.item)"
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
                  v-if="checkRole(Rules.System.hotProblem.actions.delete)"
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

    <addHot
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getHot"
    ></addHot>
    <updateHot
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getHot"
    ></updateHot>
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
import updateHot from '~/components/van-de-nong/updateHot.vue'
import addHot from '~/components/van-de-nong/addHot.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addHot,
    updateHot,
    footerBo,
  },
  data() {
    return {
      Rules,
      name: null,
      status: null,
      itemStatus: [
        {
          text: 'Hoạt động',
          value: 'ENABLE',
        },
        {
          text: 'Không hoạt động',
          value: 'DISABLE',
        },
      ],
      openAdd: false,
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      listItem: [],
      openUpdate: false,
      open_delete: false,
      data: null,
    }
  },
  mounted() {
    this.getHot()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.hotProblem.id,
        actionId
      )
      return isAllowed
    },
    getHot() {
      let data = {
        name: this.name == null ? this.name : this.name.trim(),
        enable: this.status,
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('hotProblem/getProblem', data).then((res) => {
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
      this.getHot()
    },
    changePage(value) {
      this.page = value
      this.getHot()
    },
    search() {
      this.page = 1
      this.getHot()
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
        .dispatch('hotProblem/getdelete', {
          id: this.idDelete,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa vấn đề thành công')
            this.getHot()
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
          width: '2%',
        },
        {
          text: 'Tên vấn đề',
          sortable: false,
          width: '15%',
        },
        {
          text: 'Mô tả',
          sortable: false,
          width: '20%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Người chỉnh sửa',
          sortable: false,
          width: '14%',
        },
        {
          text: 'Thời gian tạo',
          sortable: false,
          width: '11%',
        },
        {
          text: 'Thứ tự sắp xếp',
          sortable: false,
          width: '11%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          width: '8%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          width: '12%',
        },
      ]
    },
  },
}
</script>
