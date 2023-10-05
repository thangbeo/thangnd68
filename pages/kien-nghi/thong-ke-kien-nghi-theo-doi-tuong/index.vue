<template>
  <div>
    <CardGlobal>
      <v-row class="ma-0" align="center">
        <v-col class="col-auto py-0 pl-0">
          <div
            style="font-size: 1.3rem; font-weight: 500"
            class="pa-1 primary--text"
          >
            <v-btn to="/" icon>
              <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
            </v-btn>
            Tổng số Kiến nghị do {{ objectTypeName }} gửi
          </div>
        </v-col>
        <v-col
          class="col-auto px-0 py-0"
          v-if="
            $store.state.app.requestObjectType != null &&
            $store.state.app.requestObjectType.id !== 25
          "
        >
          <v-btn
            depressed
            class="text-none white--text"
            color="#f2973a"
            to="/kien-nghi/them-moi-kien-nghi"
            >Gửi kiến nghị
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="9" lg="3" class="py-1">
          <DatePickerIcon
            :label="['Từ ngày', 'Đến ngày']"
            :date="date"
            @setDate="setDate"
            ref="refDate"
          ></DatePickerIcon>
        </v-col>

        <v-col class="col-auto pr-0 py-0">
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="resetData" icon v-bind="attrs" v-on="on">
                <v-icon color="primary">mdi-sync</v-icon>
              </v-btn>
            </template>
            <span>Reset bộ lọc</span>
          </v-tooltip> -->
          <v-btn @click="getData" depressed class="primary text-none">
            Thống kê
          </v-btn>
        </v-col>
        <v-col class="col-auto px-0 py-0">
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="getData" icon v-bind="attrs" v-on="on">
                <v-icon color="primary"> mdi-magnify </v-icon>
              </v-btn>
            </template>
            <span>Tìm kiếm</span>
          </v-tooltip> -->
        </v-col>
      </v-row>
    </CardGlobal>

    <v-row class="ma-0" style="padding-top: 3px">
      <TongSoKienNghi
        :typeShow="$store.state.app.stateOnlye"
        ref="TongSoKienNghi"
        :dateTime="date"
        :type="$route.query.objectTypeId"
      ></TongSoKienNghi>

      <HotProblem
        :typeShow="$store.state.app.stateOnlye"
        ref="HotProblem"
        :title="'Lĩnh vực'"
        :type="$route.query.objectTypeId"
        :dateTime="date"
      ></HotProblem>
    </v-row>

    <v-row class="ma-0">
      <v-col
        v-for="(item, index) in Field"
        :key="index"
        cols="12"
        lg="6"
        class="py-0 pl-0"
        :class="{
          'pr-1': (index + 1) % 2 !== 0,
          'pl-1 pr-0': (index + 1) % 2 === 0,
        }"
      >
        <CardGlobal class="mt-2" style="height: 97%">
          <v-row class="ma-0" no-gutters>
            <LinhVucBuuChinh
              :display="2"
              :dataItem="item"
              :object="objectTypeName"
              :type="$route.query.objectTypeId"
              :dateItem="date"
              :id="`refLinhVuc${index}`"
            ></LinhVucBuuChinh>
            <v-col
              cols="12"
              lg="6"
              class="d-flex align-center"
              v-if="item.chart"
            >
              <v-row class="ma-0" no-gutters>
                <v-col cols="12" class="fs-14">
                  <div style="width: 100%">
                    <div
                      class="text-center"
                      style="
                        color: rgb(36, 161, 231);
                        line-height: 20px;
                        font-weight: 500;
                      "
                    >
                      Loại kiến nghị
                    </div>
                    <apexchart
                      type="bar"
                      height="200"
                      :options="item.chart"
                      :series="item.series"
                    ></apexchart></div
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
        </CardGlobal>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import HotProblem from '~/components/home/HotProblem.vue'
// import TongSoKienNghi from '~/components/bieu-do/TongSoKienNghi.vue'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import LinhVucBuuChinh from '~/components/bieu-do/main.vue'
import TongSoKienNghi from '~/components/bieu-do/TongSoKienNghi.vue'

import moment from 'moment'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    HotProblem,
    LinhVucBuuChinh,
    TongSoKienNghi,
    DatePickerIcon,
  },
  data() {
    return {
      Field: [],
      date: [],

      series: [{ name: 'Số lượng', data: [200, 222, 100, 500] }],
      objectTypeName: null,
      chartOptions: {
        chart: {
          height: 250,
          type: 'bar',
        },
        colors: ['#24a1e7', '#38bca4', '#f44336', '#03a9f4'],
        plotOptions: {
          bar: {
            distributed: true,
            columnWidth: '20%',
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val
          },
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ['#304758'],
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: ['akjsdhas'],
          labels: {
            style: {
              colors: ['#24a1e7', '#38bca4', '#f44336', '#03a9f4'],
              fontSize: '11px',
            },
          },
        },
      },
    }
  },
  created() {
    // this.$store.dispatch('common/getConfigTimeRequest').then((res) => {
    //   if (!res.error) {
    //     this.date = [
    //       moment(res.data.data.startTime, 'DD/MM/YYYY HH:mm:ss').format(
    //         'YYYY-MM-DD'
    //       ),
    //       moment(res.data.data.endTime, 'DD/MM/YYYY HH:mm:ss').format(
    //         'YYYY-MM-DD'
    //       ),
    //     ]
    //   }
    // })
  },
  mounted() {
    if (!this.$isNullOrEmpty(this.$route.query.objectTypeId)) {
      this.objectTypeName =
        this.$store.state.commonController.stateCommon.itemObjectType.find(
          (item) => item.value == this.$route.query.objectTypeId
        ).text
    }
    // console.log(this.$store.state.dataConfig.dateSelect)
    this.date = JSON.parse(
      JSON.stringify(this.$store.state.dataConfig.dateSelect)
    )

    if (!this.$isNullOrEmpty(this.date)) {
      this.getList()
    }
  },
  methods: {
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
      this.$store.commit(
        'dataConfig/setDate',
        JSON.parse(JSON.stringify(this.date))
      )
    },
    resetData() {
      this.date = []

      this.$store.dispatch('common/getConfigTimeRequest').then((res) => {
        if (!res.error) {
          this.date = [
            moment(res.data.data.startTime, 'DD/MM/YYYY HH:mm:ss').format(
              'YYYY-MM-DD'
            ),
            moment(res.data.data.endTime, 'DD/MM/YYYY HH:mm:ss').format(
              'YYYY-MM-DD'
            ),
          ]
        }
      })

      this.getData()
    },
    getData() {
      this.getList()
      this.$refs.TongSoKienNghi.getList()
      this.$refs.HotProblem.getList()
    },
    getList() {
      this.Field = []
      let data = {
        objectTypeId: this.$route.query.objectTypeId,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
      }
      this.$store
        .dispatch('report/reportQuantityByField', data)
        .then(async (res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            await this.quantityByRequestType(
              data,
              res.data.data[i].fieldId,
              res.data.data[i]
            )
          }
          // for (let j = 0; j < this.Field.length; j++) {
          //   this.quantityByRequestType(data)
          //   window.document.getElementById(`refLinhVuc${j}`).click()
          // }
        })
    },
    async quantityByRequestType(dataItem, fieldId, dataTotal) {
      let data = {
        ...dataItem,
        fieldId: fieldId,
      }
      let chartOptions = null
      let arr = []
      let series = []
      let totalRequest = null
      await this.$store
        .dispatch('report/quantityByRequestType', data)
        .then(async (res) => {
          await res.data.data.map((item) => {
            arr.push(item.requestTypeName.split('|'))
            series.push(item.totalRequest)
            totalRequest += item.totalRequest
          })
        })

      chartOptions = {
        chart: {
          height: 250,
          type: 'bar',
        },
        colors: ['#24a1e7', '#38bca4', '#f44336', '#aba234', '#660e5c'],
        plotOptions: {
          bar: {
            distributed: true,
            columnWidth: '20%',
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val === 0
              ? 0 + '%'
              : parseFloat(val * (100 / totalRequest)).toFixed(1) + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ['#304758'],
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [...arr],
          labels: {
            style: {
              colors: ['#24a1e7', '#38bca4', '#f44336', '#aba234', '#660e5c'],
              fontSize: '11px',
            },
          },
        },
      }
      this.Field.push({
        ...dataTotal,
        chart: chartOptions,
        series: [{ name: 'Số lượng', data: [...series] }],
      })
      // console.log(this.Field)
      // return chartOptions
    },
  },
}
</script>
