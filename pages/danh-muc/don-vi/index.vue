<template>
  <div v-if="checkRole(Rules.System.unit.actions.show_list)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách đơn vị
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
                  hide-details=""
                  v-model="name"
                  label="Tên đơn vị"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-text-field
                  outlined
                  dense
                  v-model="email"
                  hide-details=""
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-text-field
                  outlined
                  dense
                  v-model="phone"
                  hide-details=""
                  label="Số điện thoại"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  outlined
                  :items="$store.state.commonController.stateCommon.listField"
                  v-model="field"
                  dense
                  no-data-text="Không có dữ liệu"
                  hide-details=""
                  label="Lĩnh vực"
                ></v-autocomplete>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <!-- <v-col class="col-auto">
              <v-btn depressed class="primary text-none" @click="openAdd = true"
                >Thêm mới</v-btn
              >
            </v-col> -->
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td class="text-center">
                {{ data.index + 1 + itemsPerPage * (page - 1) }}
              </td>
              <td class="text-left">{{ data.item.name }}</td>
              <td class="text-left">{{ data.item.email }}</td>
              <td class="text-left">{{ data.item.phone }}</td>
              <td class="text-left">
                <span v-for="(item,index) in data.item.fieldDtos" :key="`item${index}`">
                  {{item.name}}
                  <span v-if="index != data.item.fieldDtos.length-1">-</span>
                </span>
<!--                {{ data.item.field.name }}-->
              </td>
              <td class="text-center">
                {{ data.item.orderNo }}
              </td>

              <td class="text-center">
                <v-tooltip
                  v-if="checkRole(Rules.System.unit.actions.update)"
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
                  v-if="checkRole(Rules.System.unit.actions.show_detail)"
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="getNhanSu(data.item)"
                    >
                      <v-icon color="warning">mdi-account</v-icon>
                    </v-btn>
                  </template>
                  <span>Danh sách nhân sự</span>
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

    <addUnit :open="openAdd" @toggle="openAdd = !openAdd"></addUnit>
    <updateUnit
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getUnit"
    ></updateUnit>
    <ListStaff
      :dataDepartment="dataDepartment"
      :open="openNhanSu"
      @toggle="openNhanSu = !openNhanSu"
    ></ListStaff>
  </div>
</template>
<script>
import ListStaff from '~/components/danh-sach-don-vi/ListStaff.vue'
import updateUnit from '~/components/danh-sach-don-vi/updateUnit.vue'
import addUnit from '~/components/danh-sach-don-vi/addUnit.vue'
import footerBo from '~/components/footer/footerBo.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addUnit,
    updateUnit,
    ListStaff,
    footerBo,
  },
  data() {
    return {
      Rules,
      name: null,
      phone: null,
      email: null,
      field: null,
      openAdd: false,
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      listItem: [],
      openUpdate: false,
      data: null,
      openNhanSu: false,
      dataDepartment: null,
    }
  },
  mounted() {
    this.getUnit()
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.unit.id,
        actionId
      )
      return isAllowed
    },
    getUnit() {
      let data = {
        name: this.name == null ? this.name : this.name.trim(),
        phone: this.phone == null ? this.phone : this.phone.trim(),
        email: this.email == null ? this.email : this.email.trim(),
        fieldId: this.field,
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('unit/getListUnit', data).then((res) => {
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
      this.getUnit()
    },
    changePage(value) {
      this.page = value
      this.getUnit()
    },
    search() {
      this.page = 1
      this.getUnit()
    },
    quest_update(value) {
      this.data = value
      this.openUpdate = true
    },
    getNhanSu(item) {
      this.openNhanSu = true
      this.dataDepartment = item
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
          text: 'Tên đơn vị',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Email',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Số điện thoại',
          sortable: false,
          width: '10%',
        },
        {
          text: 'Lĩnh vực',
          sortable: false,
          width: '20%',
        },
        {
          text: 'Thứ tự sắp xếp',
          sortable: false,
          width: '8%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          width: '8%',
        },
      ]
    },
  },
}
</script>
