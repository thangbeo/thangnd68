<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        <!-- <v-btn v-if="condition" @click="backHis" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn> -->
        Danh sách loại kiến nghị
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
                  v-model="name_request"
                  dense
                  hide-details=""
                  label="Tên loại kiến nghị"
                ></v-text-field>
              </v-col>
              <v-col style="max-width: 130px" class="px-0">
                <v-select
                  no-data-text="Không có dữ liệu"
                  v-model="dateYear"
                  label="Năm"
                  outlined
                  dense
                  menu-props="auto"
                  :items="Year"
                  class="ml-2"
                  hide-details
                ></v-select>
              </v-col>
              <v-col style="max-width: 160px" class="px-0">
                <v-select
                  no-data-text="Không có dữ liệu"
                  v-model="month"
                  clearable
                  label="Tháng"
                  outlined
                  dense
                  menu-props="auto"
                  :items="ItemMonth"
                  class="ml-2"
                  hide-details
                ></v-select>
              </v-col>
              <!-- <v-col style="max-width: 130px" class="pr-0">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="moment(dateMonth).format('MM-YYYY')"
                      label="Tháng"
                      clearable
                      v-on="on"
                      hide-details
                      dense
                      outlined
                      readonly
                    >
                    </v-text-field>
                  </template>

                  <v-date-picker
                    locale="vn"
                    type="month"
                    v-model="dateMonth"
                    @input="onChange($event)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col> -->

              <v-col cols="3">
                <DateRangePicker :label="label_date" :date="date">
                </DateRangePicker>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="resetFillter" icon v-bind="attrs" v-on="on">
                      <v-icon color="primary">mdi-reload</v-icon>
                    </v-btn>
                  </template>
                  <span>Reset bộ lọc</span>
                </v-tooltip>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn depressed class="primary text-none" @click="search"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col class="col-auto pr-0">
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
              <td>{{ data.item.name }}</td>
              <td>{{ data.item.shortName }}</td>

              <td class="text-center">Tháng {{ data.item.month }}</td>
              <td class="text-center">{{ data.item.year }}</td>
              <td class="text-center">
                {{
                  moment(data.item.startTime, 'DD/MM/YYYY HH:mm:ss').format(
                    'DD/MM/YYYY'
                  )
                }}
              </td>
              <td class="text-center">
                {{
                  moment(data.item.endTime, 'DD/MM/YYYY HH:mm:ss').format(
                    'DD/MM/YYYY'
                  )
                }}
              </td>
              <td class="text-center">
                <v-tooltip bottom>
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
                <v-tooltip bottom>
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
    <addRequest
      :open="openAdd"
      @toggle="openAdd = !openAdd"
      @Success="getListRequest"
    ></addRequest>
    <updateRequest
      :open="openUpdate"
      :data="data"
      @toggle="openUpdate = !openUpdate"
      @Success="getListRequest"
    ></updateRequest>
    <yes-no-alert
      :open="open_delete"
      @toggle="open_delete = !open_delete"
      alertMsg="Bạn có chắc chắn muốn xóa kiến nghị này không?"
      @OK="confirm_delete"
    >
    </yes-no-alert>
  </div>
</template>
<script>
const date = new Date()
const firstDate = new Date(
  date.getFullYear(),
  date.getMonth() - 1,
  date.getDate() + 1
)
  .toISOString()
  .substr(0, 10)
const lastDate = moment(new Date()).format('yyyy-MM-DD').substr(0, 10)
const today = new Date()
const month = new Date(today.getFullYear(), today.getMonth(), 15)
  .toISOString()
  .substr(0, 7)
import moment from 'moment'
import addRequest from '~/components/loai-kien-nghi/addRequest.vue'
import updateRequest from '~/components/loai-kien-nghi/updateRequest.vue'
import footerBo from '~/components/footer/footerBo.vue'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    addRequest,
    updateRequest,
    footerBo,
  },
  data() {
    return {
      name_request: null,
      Year: [],
      dateYear: Number(moment().format('YYYY')),
      dateMonth: null,
      month: null,
      ItemMonth: [
        {
          text: 'Tháng 1',
          value: '01',
        },
        {
          text: 'Tháng 2',
          value: '02',
        },
        {
          text: 'Tháng 3',
          value: '03',
        },
        {
          text: 'Tháng 4',
          value: '04',
        },
        {
          text: 'Tháng 5',
          value: '05',
        },
        {
          text: 'Tháng 6',
          value: '06',
        },
        {
          text: 'Tháng 7',
          value: '07',
        },
        {
          text: 'Tháng 8',
          value: '08',
        },
        {
          text: 'Tháng 9',
          value: '09',
        },
        {
          text: 'Tháng 10',
          value: '10',
        },
        {
          text: 'Tháng 11',
          value: '11',
        },
        {
          text: 'Tháng 12',
          value: '12',
        },
      ],
      menu: false,
      date: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      label_date: ['Từ ngày', 'Đến ngày'],
      openAdd: false,
      page: 1,
      pageCount: null,
      itemsPerPage: 20,
      listItem: [],
      openUpdate: false,
      open_delete: false,
      data: null,
    }
  },
  mounted() {
    let year = Number(moment().format('YYYY'))
    for (let index = year; index > year - 31; index--) {
      this.Year.push({
        text: index,
        value: index,
      })
    }
    this.getListRequest()
  },
  methods: {
    geListCommonRequestType() {
      this.$store.dispatch('commonController/commonRequestType').then((res) => {
        // console.log(res)
        let arr = []
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            arr.push({
              text: item.name,
              value: item.id,
            })
          })
          this.$store.commit('commonController/setlistRequestType', arr)
        }
      })
    },
    // rules: (val) => {
    //   let date = moment(new Date()).format('YYYY-MM')
    //   const [year, month] = val.split('-')
    //   const [year1, month1] = date.split('-')
    //   if (parseInt(year) === parseInt(year1)) {
    //     if (parseInt(month) > parseInt(month1)) {
    //       return false
    //     } else return true
    //   } else if (parseInt(year) > parseInt(year1)) {
    //     return false
    //   } else return true
    // },
    resetFillter() {
      this.page = 1
      this.itemsPerPage = 50
      this.name_request = null
      this.dateYear = Number(moment().format('YYYY'))
      this.month = null
      this.date = [firstDate, lastDate]
      this.getListRequest()
    },
    onChange() {
      this.menu = false
    },
    getListRequest() {
      let data = {
        name:
          this.name_request == null
            ? this.name_request
            : this.name_request.trim(),
        startTime: this.$ymdToD(this.date[0]),
        endTime: this.$ymdToD(this.date[1]),
        year: this.dateYear,
        month: this.month,
        // month: moment(this.dateMonth, 'YYYY-MM').format('MM'),
        pageIndex: this.page,
        pageSize: this.itemsPerPage,
      }
      this.$store.dispatch('requestType/getListRequest', data).then((res) => {
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
      this.productID = value
      this.open_delete = true
    },
    confirm_delete() {
      this.$store
        .dispatch('requestType/delete', {
          id: this.productID,
        })
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Xóa kiến nghị thành công')
            this.geListCommonRequestType()
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
          width: '2%',
        },
        {
          text: 'Tên loại kiến nghị',
          sortable: false,
          align: 'left',
          width: '30%',
        },
        {
          text: 'Tên ngắn',
          sortable: false,
          align: 'left',
          width: '20%',
        },

        {
          text: 'Tháng',
          sortable: false,
          align: 'center',
          width: '10%',
        },
        {
          text: 'Năm',
          sortable: false,
          align: 'center',
          width: '10%',
        },
        {
          text: 'Ngày bắt đầu',
          sortable: false,
          align: 'center',
          width: '10%',
        },
        {
          text: 'Ngày kết thúc',
          sortable: false,
          align: 'center',
          width: '10%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          value: 'actions',
          align: 'center',
          width: '10%',
        },
      ]
    },
  },
}
</script>
