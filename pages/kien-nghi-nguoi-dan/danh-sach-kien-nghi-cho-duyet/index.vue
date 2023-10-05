<template>
  <div>
    <CardGlobal>
      <div style="font-size: 1.3rem; font-weight: 500" class="primary--text">
        <v-btn @click="backHis" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Danh sách kiến nghị người dân chờ duyệt
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-data-table
        hide-default-header
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
        <template v-slot:header>
          <HeaderDefault
            ref="resetHeader"
            :typeShow="typeShow"
            @search="search"
          ></HeaderDefault>
        </template>
        <template v-slot:item="data">
          <tr>
            <td class="text-center" style="min-width: 80px !important">
              {{ data.index + 1 + (pageIndex - 1) * itemsPerPage }}
            </td>
            <td style="min-width: 220px !important">
              {{ data.item.peopleName }}
            </td>
            <td style="min-width: 200px !important">
              {{ data.item.provinceName }}
            </td>
            <td v-if="typeShow">
              {{ data.item.districtName }}
            </td>
            <td style="min-width: 200px !important" v-if="typeShow">
              {{ data.item.wardName }}
            </td>
            <td style="min-width: 250px !important" v-if="typeShow">
              {{ data.item.peopleAddress }}
            </td>
            <td style="min-width: 200px !important">
              {{ data.item.peoplePhone }}
            </td>
            <td style="min-width: 230px !important">
              {{ data.item.peopleEmail }}
            </td>
            <td style="min-width: 230px !important">
              {{ data.item.cccd }}
            </td>
            <td
              style="min-width: 350px !important; cursor: pointer"
              @click="detail(data.item)"
            >
              <v-tooltip bottom max-width="900" :open-delay="800">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="hide-text"
                    v-bind="attrs"
                    v-on="on"
                    v-html="data.item.requestContent"
                  ></div>
                </template>
                <span v-html="data.item.requestContent"></span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0" no-gutters align="center">
        <v-col class="pr-0 col-auto">
          <div class="d-flex align-center">
            Chế độ hiển thị: <span class="ml-4">rút gọn</span>

            <v-switch
              @change="changeTypeShow"
              :input-value="typeShow"
              v-model="typeShow"
              class="ma-0 pl-2 pt-0"
              hide-details=""
              color="primary"
            ></v-switch>
            đầy đủ
          </div>
        </v-col>
        <v-col class="col-2 ml-4">
          <DatePickerIcon
            :label="['Từ ngày', 'Đến ngày']"
            :date="date"
            @setDate="setDate"
            ref="refDate"
          ></DatePickerIcon>
        </v-col>

        <!-- <v-col class="col-auto pl-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="resetFillter" icon v-bind="attrs" v-on="on">
                <v-icon size="30" color="primary">mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reset bộ lọc</span>
          </v-tooltip>
        </v-col> -->
        <v-col class="col-auto ml-2">
          <v-btn
            depressed
            class="primary text-none"
            @click="requestPeoplePending"
            >Tìm kiếm</v-btn
          >
        </v-col>

        <v-spacer></v-spacer>
        <v-col class="col-auto ml-4">
          <pagination
            ref="pagination"
            :pageCount="pageCount"
            :page="pageIndex"
            :pageSize="itemsPerPage"
            @changePage="changePage"
            @changePageSize="changePageSize"
            depressed="true"
          ></pagination>
        </v-col>
      </v-row>
    </CardGlobal>
  </div>
</template>
<script>
import HeaderDefault from '~/components/kien-nghi-nguoi-dan/header/HeaderDefault.vue'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import moment from 'moment'
export default {
  data() {
    return {
      typeShow: false,
      listItem: [],
      itemsPerPage: 50,
      date: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      pageCount: 1,
      pageIndex: 1,
      fullName: null,
      province: null,
      district: null,
      ward: null,
      address: null,
      phoneNumber: null,
      email: null,
      contnent: null,
      cccd: null,
    }
  },
  components: {
    HeaderDefault,
    DatePickerIcon,
  },
  computed: {},
  mounted() {
    this.requestPeoplePending()
  },
  methods: {
    search(value) {
      this[value.field] = value.value
      this.requestPeoplePending()
    },
    changeTypeShow() {
      if (this.typeShow) {
        this.typeShow = true
      } else this.typeShow = false
    },
    setDate(value) {
      const [day, month, year] = value[0].split('/')
      const [day1, month1, year1] = value[1].split('/')
      if (Number(year) > Number(year1)) {
        this.date = [
          moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
          moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
        ]
      } else if (Number(year) === Number(year1)) {
        if (Number(month) > Number(month1)) {
          this.date = [
            moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
            moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
          ]
        } else if (Number(month) === Number(month1)) {
          if (Number(day) > Number(day1)) {
            this.date = [
              moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
              moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
            ]
          } else {
            this.date = [
              moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
              moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
            ]
          }
        } else {
          this.date = [
            moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
            moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
          ]
        }
      } else {
        this.date = [
          moment(value[0], 'DD/MM/YYYY').format('YYYY-MM-DD'),
          moment(value[1], 'DD/MM/YYYY').format('YYYY-MM-DD'),
        ]
      }
      this.$store.commit('dataConfig/setDate', this.date)
    },
    detail(item) {
      this.$store
        .dispatch('requestPeople/requestPeoplePendingDetail', {
          requestId: item.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$store.commit(
              'requestPeople/setDataDetailRequest',
              res.data.data
            )
            this.$router.push(
              '/kien-nghi-nguoi-dan/chi-tiet-kien-nghi-nguoi-dan'
            )
          }
        })
    },
    requestPeoplePending() {
      // address
      // cccd
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00', //'28/03/2021 09:46:25',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
        content: this.contnent,
        fieldIds: null,
        fieldThymeIds: null,
        name: this.fullName,
        phone: this.phoneNumber,
        email: this.email,
        districtCode: this.district,
        provinceCode: this.province,
        wardCode: this.ward,
        address: this.address,
        cccd: this.cccd,
      }
      this.$store
        .dispatch('requestPeople/requestPeoplePending', data)
        .then((res) => {
          if (!res.error) {
            // console.log(res)
            this.listItem = res.data.data.data
            this.pageCount = res.data.data.totalPages
          }
        })
    },
    changePage(value) {
      this.pageIndex = value
      this.requestPeoplePending()
    },
    changePageSize(value) {
      this.itemsPerPage = value
      this.pageIndex = 1
      this.requestPeoplePending()
    },
    backHis() {
      window.history.back()
    },
  },
}
</script>