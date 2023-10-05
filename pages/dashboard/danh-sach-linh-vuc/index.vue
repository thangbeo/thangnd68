<template>
  <div v-if="checkRole(Rules.System.field.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        <v-btn @click="backHis" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Danh sách lĩnh vực
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
                  v-model="name"
                  outlined
                  dense
                  hide-details=""
                  label="Tên lĩnh vực"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-text-field
                  outlined
                  v-model="order"
                  dense
                  hide-details=""
                  label="Thứ tự sắp xếp"
                ></v-text-field>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
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
              v-if="checkRole(Rules.System.field.actions.update)"
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

    <addField :open="openAdd" @toggle="openAdd = !openAdd"></addField>
    <updateField
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getListRequest"
    ></updateField>
  </div>
</template>
<script>
import addField from '~/components/danh-sach-linh-vuc/addField.vue'
import updateField from '~/components/danh-sach-linh-vuc/updateField.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addField,
    updateField,
    footerBo,
  },
  data() {
    return {
      name: null,
      order: null,
      openAdd: false,
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      listItem: [],
      openUpdate: false,
      data: null,
      Rules,
    }
  },
  mounted() {
    this.getListRequest()
  },
  methods: {
    backHis() {
      window.history.back()
    },
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.field.id,
        actionId
      )
      return isAllowed
    },
    getListRequest() {
      let data = {
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
        name: this.name == null ? this.name : this.name.trim(),
        orderNo: this.order == null ? this.order : this.order.trim(),
      }
      this.$store.dispatch('fields/getField', data).then((res) => {
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
          text: 'Tên lĩnh vực',
          sortable: false,
          align: 'left',
          value: 'name',
          width: '20%',
        },
        {
          text: 'Thứ tự sắp xếp',
          sortable: false,
          align: 'center',
          value: 'orderNo',
          width: '5%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          align: 'center',
          value: 'actions',
          width: '6%',
        },
      ]
    },
  },
}
</script>
