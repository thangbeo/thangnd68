<template>
  <client-only>
    <div
      v-if="$checkRole(Rules.System.Home.actions.VIEW, Rules.System.Home.id)"
    >
      <v-row class="ma-0">
        <v-col cols="12" class="px-0 py-0">
          <BannerGlobal></BannerGlobal
        ></v-col>

        <v-col cols="12" class="px-0 pb-0 pt-2">
          <card-global>
            <v-row class="ma-0" align="center">
              <!-- <v-col
              class="col-auto px-0 py-0"
              v-if="
                $store.state.app.requestObjectType != null &&
                ($store.state.app.requestObjectType.id == 3 ||
                  $store.state.app.requestObjectType.id == 4)
              "
            >
              <v-btn
                depressed
                class="text-none white--text"
                color="#f2973a"
                to="/kien-nghi/them-moi-kien-nghi"
                >Gửi kiến nghị
              </v-btn>
            </v-col> -->

              <!-- <v-col
              class="col-auto px-0 py-0"
              v-if="token == undefined || token == 'undefined'"
            >
              <v-btn
                depressed
                class="text-none white--text"
                color="#f2973a"
                to="/them-kien-nghi-dtql"
                >Gửi kiến nghị
              </v-btn>
            </v-col> -->

              <!-- <v-col
              cols="12"
              sm="5"
              lg="4"
              v-if="
                $route.name !== 'dashboard-danh-sach-kien-nghi' &&
                breakpoint !== 'desktop'
              "
            >
              <v-text-field
                dense
                style="border-radius: 20px"
                hide-details=""
                clearable
                v-model="contentRequest"
                @keydown="$event.key === 'Enter' && getDataRequest()"
                placeholder="Nội dung tìm kiếm (Nội dung kiến nghị)"
              >
                <template v-slot:append>
                  <v-btn icon @click="getDataRequest">
                    <v-icon color="primary">mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col> -->
              <v-spacer></v-spacer>

              <!-- <v-col
                class="col-auto"
                v-if="
                  $store.state.app.requestObjectType != null &&
                  $store.state.app.requestObjectType.id !== 25
                "
              >
                <div class="d-flex align-center">
                  <span class="ml-4">Đơn vị</span>
                  <v-switch
                    @change="changeTypeShow"
                    v-model="typeShow"
                    :input-value="typeShow"
                    :true-value="true"
                    :false-value="false"
                    class="ma-0 pl-2 pt-0"
                    hide-details=""
                    color="primary"
                  ></v-switch>
                  Toàn bộ
                </div>
              </v-col> -->
              <v-col class="pt-2 pt-md-0 pb-2 pb-md-0 col-auto">
                <DatePickerIcon
                  :label="['Từ ngày', 'Đến ngày']"
                  :date="date"
                  @setDate="setDate"
                  ref="refDate"
                ></DatePickerIcon>
              </v-col>
              <v-col
                class="py-0 pl-0"
                :class="breakpoint == 'mobile' ? 'col-12' : 'col-auto'"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                      icon
                      depressed
                      @click="resetData"
                      class="mr-1"
                    >
                      <img src="/icon/reset.png" width="25" />
                    </v-btn>
                  </template>
                  <span>Reset bộ lọc</span>
                </v-tooltip>

                <v-btn
                  @click="getData"
                  depressed
                  class="primary text-none"
                  :block="breakpoint == 'mobile'"
                >
                  Thống kê
                </v-btn>
              </v-col>
              <!-- <v-col class="col-auto pr-0 pl-2 py-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="resetData" icon v-bind="attrs" v-on="on">
                    <v-icon color="primary">mdi-sync</v-icon>
                  </v-btn>
                </template>
                <span>Reset bộ lọc thống kê</span>
              </v-tooltip>
            </v-col> -->
            </v-row>
          </card-global></v-col
        >
        <v-row class="mt-0">
          <v-col cols="6" class="pt-1 pb-2 pr-0">
            <CardGlobal>
              <div class="fs-24 fw-500 py-3 text-center primary--text">
                Dashboard biểu đồ tròn
              </div></CardGlobal
            >
          </v-col>
          <v-col cols="6" class="pt-1 pb-2 pl-2">
            <CardGlobal
              ><div class="fs-24 fw-500 py-3 text-center primary--text">
                Dashboard biểu đồ cột
              </div></CardGlobal
            >
          </v-col>
        </v-row>
        <v-col cols="12" class="px-0 py-0">
          <transition name="fade">
            <div class="pt-1">
              <v-row class="ma-0">
                <client-only>
                  <TongSoVanDe
                    :typeShow="typeShow"
                    ref="TongSoKienNghi"
                    :dateTime="date"
                  ></TongSoVanDe>

                  <HotProblem
                    :typeShow="typeShow"
                    ref="HotProblem"
                    :title="''"
                    :dateTime="date"
                  ></HotProblem>

                  <!-- <HotUnit
                    :title="'dashboard vấn đề theo đơn vị'"
                    :dateTime="date"
                  ></HotUnit> -->
                </client-only>
              </v-row>
            </div>
          </transition>
        </v-col>

        <!-- <v-col cols="12" class="px-0 pt-2 py-0">
          <v-card
            flat
            style="
              border: 1px solid #aeaeaf42;
              border-radius: 10px;
              height: 100%;
            "
          >
            <v-row class="ma-0" no-gutters>
              <v-col class="col-auto">
                <div
                  style="font-size: 1.2rem; font-weight: 500; color: #383838"
                  class="px-4 pb-2 pt-4"
                >
                  THỐNG KÊ VẤN ĐỀ THEO LĨNH VỰC
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-0" no-gutters>
              <LinhVucBuuChinh
                :dateItem="date"
                v-for="(item, index) in Field"
                :key="index"
                :dataItem="item"
                :id="`refLinhVuc${index}`"
              ></LinhVucBuuChinh>
            </v-row>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
  </client-only>
</template>

<script>
import DaiBieuQuocHoi from '~/components/bieu-do/theo-doi-tuong/main.vue'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import HotProblem from '~/components/van-de-nong/bieu-do/HotProblem.vue'
import LinhVucBuuChinh from '~/components/van-de-nong/bieu-do/main.vue'
import TongSoVanDe from '~/components/van-de-nong/bieu-do/TongSoVanDe.vue'
import footerHome from '~/components/footer/footerHome.vue'
import BannerGlobal from '~/components/BannerGlobal.vue'
import Rules from '~/assets/configurations/Rules'
import Cookies from 'js-cookie'
import moment from 'moment'
import CardGlobal from '~/components/CardGlobal.vue'
import MainObjectType from '~/components/dashboard/objectType/main.vue'
// import HotUnit from '~/components/van-de-nong/bieu-do/HotUnit.vue'
export default {
  components: {
    DatePickerIcon,
    HotProblem,
    DaiBieuQuocHoi,
    BannerGlobal,
    footerHome,
    TongSoVanDe,
    LinhVucBuuChinh,
    CardGlobal,
    MainObjectType,
    // HotUnit,
  },
  data: () => {
    return {
      date: [
        // moment().startOf('year').format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD'),
      ],
      token: null,
      date2: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      background: '/background/bg1.png',
      value: (480 / 540) * 100,
      total: 480,
      Field: [],
      objectType: [],
      requestObjectTypeId: null,
      // typeShow: true,
      contentRequest: null,
      Rules,
    }
  },
  // created() {
  //   this.$store.dispatch('common/getConfigTimeRequest').then((res) => {
  //     if (!res.error) {
  //       this.date = [
  //         moment(res.data.data.startTime, 'DD/MM/YYYY HH:mm:ss').format(
  //           'YYYY-MM-DD'
  //         ),
  //         moment(res.data.data.endTime, 'DD/MM/YYYY HH:mm:ss').format(
  //           'YYYY-MM-DD'
  //         ),
  //       ]
  //     }
  //   })
  // },
  mounted() {
    // console.log(this.$store.state.app.requestObjectType, 'Done')
    // if (this.$store.state.app.requestObjectType != null) {
    //   this.typeShow = false
    //   this.$store.commit('app/setOnlyme', this.typeShow)
    //   this.requestObjectTypeId = Cookies.get('requestObjectTypeId')
    // }
    this.token = Cookies.get('token')
    this.date = JSON.parse(
      JSON.stringify(this.$store.state.dataConfig.dateSelect)
    )

    this.getList()
    // this.getListObjectType()
  },

  methods: {
    resetFilter() {},
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.Home.id,
        actionId
      )
      return isAllowed
    },
    RgetDataequest() {
      this.$store.commit('request/setContentRequest', this.contentRequest)
      this.$router.push('/dashboard/danh-sach-kien-nghi')
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
    },
    changeTypeShow() {
      this.$store.commit('app/setOnlyme', this.typeShow)
    },
    resetData() {
      this.date = [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]
      setTimeout(() => {
        this.$refs.TongSoKienNghi.getList()
        this.$refs.HotProblem.getList()
        this.getList()
      }, 100)

      // this.getListObjectType()

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
    getData() {
      if (!this.typeShow) {
        this.$refs.MainObjectType.getData()
      } else {
        this.$refs.TongSoKienNghi.getList()
        this.$refs.HotProblem.getList()
        this.getList()
        // this.getListObjectType()
      }
    },
    getList() {
      let data = {
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
      }
      this.$store
        .dispatch('report/dashboardQuantityByField', data)
        .then((res) => {
          this.Field = res.data.data
          for (let i = 0; i < this.Field.length; i++) {
            window.document.getElementById(`refLinhVuc${i}`).click()
          }
        })
    },
    // getListObjectType() {
    //   let data = {
    //     fromTime:
    //       moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
    //     toTime:
    //       moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
    //   }
    //   this.$store.dispatch('report/quantityByObjectType', data).then((res) => {
    //     this.objectType = res.data.data
    //     for (let i = 0; i < this.Field.length; i++) {
    //       window.document.getElementById(`refDoiTuong${i}`).click()
    //     }
    //   })
    // },
  },
  transition: 'slide-x-reverse-transition',
  watch: {
    date(value) {
      this.$store.commit(
        'dataConfig/setDate',
        JSON.parse(JSON.stringify(value))
      )
    },
  },
  computed: {
    breakpoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'mobile'
        case 'md':
          return 'desktop'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
      }
    },

    typeShow: {
      get() {
        return this.$store.state.app.stateOnlye
      },
      set(value) {
        this.$store.commit('app/setStateOnlyme', value)
      },
    },
  },
  // watch: {
  //   'this.$store.state.app.stateOnlyme'(value) {
  //     console.log(value)
  //   },
  // },
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// .fade-enter-active {
//   animation: bounce-in .5s;
// }
// .fade-leave-active {
//   animation: bounce-in .5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }

//   50% {
//     transform: scale(1.2);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
// .v-input__append-inner {
//   margin-top: 1px !important;
// }
.main_container {
  .main_data_table {
    .theme--light.v-data-table.v-data-table--fixed-header thead th {
      background-color: #0065bd !important;
      color: white !important;
    }
  }
  .main_data_table1 {
    .theme--light.v-data-table.v-data-table--fixed-header thead th {
      background-color: #0065bd !important;
      color: white !important;
    }
  }
  .divider-vertical-oranges {
    width: 3px !important;
    height: 12px;
    background-color: #ff9a16;
  }
}
.border-right {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
.border-r-bt {
  border-right: thin solid rgba(0, 0, 0, 0.12);
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.boder-bt {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.max-height-title-card {
  min-height: 25px;
  max-height: 25px;
}
</style>
