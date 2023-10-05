<template>
  <div>
    <CardGlobal>
      <v-row class="ma-0" align="center">
        <v-col class="col-auto py-0 px-0">
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
        <v-spacer></v-spacer>
        <v-col cols="3" class="py-1">
          <DateRangePicker
            :label="['Từ ngày', 'Đến ngày']"
            :date="date"
          ></DateRangePicker>
        </v-col>
        <v-col class="col-auto pr-0 py-0">
          <v-btn icon @click="resetData">
            <v-icon color="primary">mdi-sync</v-icon>
          </v-btn>
        </v-col>
        <v-col class="col-auto py-1">
          <v-btn icon @click="getData">
            <v-icon color="primary"> mdi-magnify </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </CardGlobal>

    <v-row class="ma-0" style="padding-top: 3px">
      <TongSoKienNghi
        ref="TongSoKienNghi"
        :dateTime="date"
        :type="$route.query.objectTypeId"
      ></TongSoKienNghi>

      <HotProblem
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
        cols="6"
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
            <v-col cols="6" class="d-flex align-center" v-if="item.chart">
              <v-row class="ma-0" no-gutters>
                <v-col cols="12" class="fs-14">
                  <div style="width: 100%">
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
import LinhVucBuuChinh from '~/components/bieu-do/main.vue'
import TongSoKienNghi from '~/components/bieu-do/TongSoKienNghi.vue'

import moment from 'moment'
import jsCookie from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    HotProblem,
    LinhVucBuuChinh,
    TongSoKienNghi,
  },
  data() {
    return {
      id: null,
      Field: [],
      date: [],
      date2: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
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
  mounted() {
    this.id = jsCookie.get('requestObjectTypeId')
    // console.log(this.$store.state.commonController.stateCommon.itemObjectType)
    if (!this.$isNullOrEmpty()) {
      this.objectTypeName =
        this.$store.state.commonController.stateCommon.itemObjectType.find(
          (item) => item.value == id
        ).text
    }
    this.date = [
      moment(this.$route.query.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      moment(this.$route.query.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    ]
    // console.log(1, 'askljdhasdjasjdas')
    if (!this.$isNullOrEmpty(this.date)) {
      this.getList()
    }
  },
  methods: {
    resetData() {
      this.date = [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]
      this.getData()
    },
    getData() {
      this.getList()
      this.$refs.TongSoKienNghi.getList()
      this.$refs.HotProblem.getList()
    },
    async getList() {
      let data = {
        objectTypeId: this.id,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
      }
      await this.$store
        .dispatch('report/reportQuantityByField', data)
        .then((res) => {
          // this.Field = res.data.data

          for (let i = 0; i < res.data.data.length; i++) {
            this.quantityByRequestType(
              data,
              res.data.data[i].fieldId,
              res.data.data[i]
            )
          }
          for (let i = 0; i < this.Field.length; i++) {
            this.quantityByRequestType(data)
            window.document.getElementById(`refLinhVuc${i}`).click()
          }
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
      await this.$store
        .dispatch('report/quantityByRequestType', data)
        .then((res) => {
          res.data.data.map((item) => {
            arr.push(item.requestTypeName.split('|'))
            series.push(item.totalRequest)
          })
        })

      chartOptions = {
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
          categories: [...arr],
          labels: {
            style: {
              colors: ['#24a1e7', '#38bca4', '#f44336', '#03a9f4'],
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
      // return chartOptions
    },
  },
}
</script>
