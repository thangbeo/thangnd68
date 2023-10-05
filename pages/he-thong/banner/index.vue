<template>
  <div v-if="checkRole(Rules.System.banner.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Quản lý banner
      </div>
    </CardGlobal>
    <CardGlobal class="mt-3">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="listBanner"
          :items-per-page="pageSize"
          :page.sync="page"
          @page-count="pageCount = $event"
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
              <v-col class="col-auto pr-0">
                <v-btn
                  v-if="checkRole(Rules.System.banner.actions.add)"
                  depressed
                  class="primary text-none mr-0 pr0"
                  @click="openAdd = true"
                  >Thêm mới</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td class="text-center">
                {{ data.index + 1 + pageSize * (page - 1) }}
              </td>
              <td>
                <div class="d-flex justify-center py-2">
                  <v-img
                    max-width="750"
                    max-height="120"
                    :src="data.item.imageUrl.url"
                  ></v-img>
                </div>
              </td>
              <td class="text-center">
                <v-chip
                  outlined
                  small
                  color="success"
                  v-if="data.item.enable === 1"
                  >Hiển thị</v-chip
                >
                <v-chip outlined small color="warning" v-else
                  >Không hiển thị</v-chip
                >
              </td>
              <td>
                <div class="d-flex align-center justify-center">
                  <v-tooltip
                    v-if="checkRole(Rules.System.banner.actions.update)"
                    bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        @click="quest_update(data.item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
                  <v-tooltip
                    v-if="checkRole(Rules.System.banner.actions.delete)"
                    bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                        medium
                        @click="askForDeleteItem(data.item.id)"
                        v-on="on"
                        >mdi-delete</v-icon
                      >
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </client-only>
    </CardGlobal>
    <pagination
      class="px-0 pt-3 pb-3"
      ref="pagination"
      :page="page"
      :pageCount="pageCount"
      :pageSize="pageSize"
      @changePage="changePage"
      @changePageSize="changePageSize"
      depressed="true"
    ></pagination>
    <Add
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListBanner"
    ></Add>
    <Edit
      :open="openEdits"
      @toggle="openEdits = !openEdits"
      :data="dataDetail"
      @Success="getListBanner"
    ></Edit>

    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa banner này không"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import Vue from 'vue'
import footerBo from '~/components/footer/footerBo.vue'
import Add from '~/components/banner/Add.vue'
import Edit from '~/components/banner/Edit.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  data() {
    return {
      openAdd: false,
      openEdits: false,
      dataDetail: null,
      page: 1,
      pageCount: null,
      pageSize: 20,
      name: null,
      listBanner: [],
      open_delete: false,
      Rules,
    }
  },
  components: {
    Add,
    Edit,
    footerBo,
  },
  transition: 'slide-x-transition',
  mounted() {
    this.getListBanner()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.banner.id,
        actionId
      )
      return isAllowed
    },
    getListBanner() {
      this.$store.dispatch('banner/getListBanner').then((res) => {
        if (res.data.error.code === 0) {
          this.listBanner = res.data.data
          this.pageCount = res.data.data.totalPages
          let arr = []

          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index]
            if (element.enable == 1) {
              arr.push(element.imageUrl.url)
            }
          }

          this.$store.commit('dataConfig/setBanner', arr)
        }
      })
    },
    // Search() {
    //   this.page = 1
    //   this.getListBanner()
    // },
    changePage(value) {
      this.page = value
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.pagination.reset()
      }
    },
    quest_update(value) {
      this.dataDetail = value
      this.openEdits = true
    },
    askForDeleteItem(value) {
      this.idDelete = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('banner/bannerDelete', {
          id: this.idDelete,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa dữ liệu thành công')
            this.getListBanner()
          }
        })
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'stt',
          sortable: false,
          align: 'left',
          width: 40,
        },
        {
          text: 'Ảnh',
          sortable: false,
          align: 'center',
          width: 200,
        },
        {
          text: 'Trạng thái',
          sortable: false,
          align: 'center',
          width: 100,
        },
        {
          text: 'Chức năng',

          sortable: false,
          align: 'center',
          width: 80,
        },
      ]
    },
  },
}
</script>
