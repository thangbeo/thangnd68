<template>
  <client-only>
    <div>
      <div class="d-none" @click="resetFillter" id="resetFillter"></div>
      <CardGlobal>
        <div class="pa-1 d-flex align-center">
          <v-btn to="/" icon>
            <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
          </v-btn>
          <span
            style="font-size: 1.3rem; font-weight: 500"
            class="primary--text"
          >
            Danh sách kiến nghị chưa trả lời
          </span>
          <v-spacer> </v-spacer>
          <div
            class="d-flex align-center"
            v-if="
              $store.state.app.requestObjectType != null &&
              $store.state.app.requestObjectType.id !== 25
            "
          >
            <span class="ml-4">Đơn vị</span>
            <v-switch
              @change="getListRequest"
              v-model="typeShowDonVi"
              :input-value="typeShowDonVi"
              :true-value="true"
              :false-value="false"
              class="ma-0 pl-2 pt-0"
              hide-details=""
              color="primary"
            ></v-switch>
            Toàn bộ
          </div>
        </div>
      </CardGlobal>
      <CardGlobal class="mt-2">
        <v-data-table
          hide-default-header
          :items="listItem"
          :items-per-page="itemsPerPage"
          hide-default-footer
          mobile-breakpoint="0"
          loading-text="Xin chờ"
          no-results-text="Không có kết quả phù hợp"
          no-data-text="Không có dữ liệu"
          class="elevation-0 custom_header_table"
          fixed-header
          light
          :class="{
            'header-full': typeShow === 2,
          }"
        >
          <template v-slot:header>
            <haerderDefault
              ref="resetHeader"
              v-if="typeShow === 1"
              @searchFilter="searchFilter"
            ></haerderDefault>
            <HeaderFull
              ref="resetHeader"
              @searchFilter="searchFilter"
              v-else
            ></HeaderFull>
          </template>
          <template v-slot:top>
            <v-row class="ma-0 pb-2" align="center">
              <v-col class="col-auto py-1">
                <div style="font-size: 16px; color: red !important">
                  Tổng số kiến nghị chưa trả lời:
                  {{ $formatMoney({ amount: totalNonReplyRequest }) }}/{{
                    $formatMoney({ amount: totalReqest })
                  }}
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="col-auto">
                <v-row class="ma-0" no-gutters align="center">
                  <v-col class="d-flex align-center px-2 col-12 col-lg-auto">
                    <div
                      style="height: 10px; width: 20px; background: purple"
                      class="mr-2"
                    ></div>
                    Đã trả lời nhưng chưa có phản hồi
                  </v-col>
                  <v-col class="d-flex align-center px-2 col-12 col-lg-auto">
                    <div
                      style="height: 10px; width: 20px; background: #009cf7"
                      class="mr-2"
                    ></div>
                    Đã trả lời thỏa đáng
                  </v-col>
                  <v-col class="d-flex align-center px-2 col-12 col-lg-auto">
                    <div
                      style="height: 10px; width: 20px; background: #ef7004"
                      class="mr-2"
                    ></div>
                    Cần được làm rõ nội dung trả lời
                  </v-col>
                  <v-col class="d-flex align-center col-12 col-lg-auto pl-2">
                    <div
                      style="height: 10px; width: 20px; background: red"
                      class="mr-2"
                    ></div>
                    Chưa trả lời
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>

          <template
            v-if="listItem.length > 0 && loadingHeader == false"
            v-slot:item="data"
          >
            <tr
              v-if="typeShow === 1"
              :class="{
                UnSeen:
                  data.item.seenStatus !== 'SEEN' &&
                  data.item.seenStatus !== null,
                UnReply: data.item.replyStatus === 'UN_REPLY',
                RepliedAndNotSeen:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'NOTSEEN',
                RepliedAndSeen:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'SEEN',
                RepliedAndAgree:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'ARGEE',
                requestReplyNotSuccess:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'CLARIFY',
              }"
            >
              <td class="text-center">
                <div>
                  {{ itemsPerPage * (pageIndex - 1) + data.index + 1 }}
                </div>
              </td>
              <td>
                <div>
                  <span
                    v-if="
                      data.item.requestObjectTypeName !== 'Đối tượng quản lý' &&
                      data.item.requestObjectTypeName !== 'Cử tri tỉnh/thành'
                    "
                  >
                    {{ data.item.requestObjectTypeName }}
                  </span>
                  {{ data.item.objectRequestName }}
                </div>
              </td>
              <td style="cursor: pointer">
                <v-row no-gutters align="center">
                  <v-col
                    :cols="
                      (data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null) ||
                      data.item.overdueStatus === 'OVER'
                        ? 10
                        : 12
                    "
                  >
                    <v-tooltip bottom max-width="900" :open-delay="800">
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          class="hide-text"
                          v-bind="attrs"
                          v-on="on"
                          @click="detail(data.item)"
                          v-html="data.item.requestContent"
                        ></div>
                      </template>
                      <span v-html="data.item.requestContent"></span>
                    </v-tooltip>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    v-if="
                      (data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null) ||
                      data.item.overdueStatus === 'OVER'
                    "
                    class="col-auto"
                  >
                    <div
                      v-if="
                        data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null
                      "
                      style="color: white !important"
                      class="text-center style-tag-new"
                      :class="{
                        'mb-1': data.item.overdueStatus === 'OVER',
                      }"
                    >
                      Mới
                    </div>
                    <div
                      v-if="data.item.overdueStatus === 'OVER'"
                      class="text-center style-tag-over"
                      style="color: white !important"
                      :class="{
                        'mt-1':
                          data.item.seenStatus !== 'SEEN' &&
                          data.item.seenStatus !== null,
                      }"
                    >
                      Quá hạn
                    </div>
                  </v-col>
                </v-row>
              </td>
              <td class="text-center">
                <div v-if="data.item.field">{{ data.item.field.name }}</div>
              </td>
              <td>
                <div v-if="data.item.requestType">
                  {{ data.item.requestType.name }}
                </div>
              </td>
              <td>
                <div>{{ data.item.units }}</div>
              </td>
            </tr>
            <tr
              v-else
              :class="{
                UnSeen:
                  data.item.seenStatus !== 'SEEN' &&
                  data.item.seenStatus !== null,
                UnReply: data.item.replyStatus === 'UN_REPLY',
                RepliedAndNotSeen:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'NOTSEEN',
                RepliedAndSeen:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'SEEN',
                RepliedAndAgree:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'ARGEE',
                requestReplyNotSuccess:
                  data.item.replyStatus === 'REPLIED' &&
                  data.item.acceptReplyStatus === 'CLARIFY',
              }"
            >
              <td class="text-center">
                <div>{{ itemsPerPage * (pageIndex - 1) + data.index + 1 }}</div>
              </td>
              <td v-if="$dtqlNotShow()">
                <div style="min-width: 150px">
                  {{ data.item.requestObjectTypeName }}
                </div>
              </td>
              <td>
                <div style="min-width: 150px">
                  {{ data.item.objectRequestName }}
                </div>
              </td>
              <td style="cursor: pointer">
                <v-row no-gutters align="center">
                  <v-col
                    :cols="
                      (data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null) ||
                      data.item.overdueStatus === 'OVER'
                        ? 10
                        : 12
                    "
                  >
                    <v-tooltip bottom max-width="900" :open-delay="800">
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          class="hide-text"
                          v-bind="attrs"
                          v-on="on"
                          @click="detail(data.item)"
                          v-html="data.item.requestContent"
                        ></div>
                      </template>
                      <span v-html="data.item.requestContent"></span>
                    </v-tooltip>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    v-if="
                      (data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null) ||
                      data.item.overdueStatus === 'OVER'
                    "
                    class="col-auto"
                  >
                    <div
                      v-if="
                        data.item.seenStatus !== 'SEEN' &&
                        data.item.seenStatus !== null
                      "
                      style="color: white !important"
                      class="text-center style-tag-new"
                      :class="{
                        'mb-1': data.item.overdueStatus === 'OVER',
                      }"
                    >
                      Mới
                    </div>
                    <div
                      v-if="data.item.overdueStatus === 'OVER'"
                      class="text-center style-tag-over"
                      style="color: white !important"
                      :class="{
                        'mt-1':
                          data.item.seenStatus !== 'SEEN' &&
                          data.item.seenStatus !== null,
                      }"
                    >
                      Quá hạn
                    </div>
                  </v-col>
                </v-row>
              </td>
              <td class="text-center">
                <div
                  v-if="!$isNullOrEmpty(data.item.comingTime)"
                  style="min-width: 80px"
                >
                  {{
                    moment(data.item.comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD'
                    )
                  }}
                </div>
              </td>
              <td class="text-center">
                <div
                  v-if="!$isNullOrEmpty(data.item.comingTime)"
                  style="min-width: 80px"
                >
                  {{
                    moment(data.item.comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'MM'
                    )
                  }}
                </div>
              </td>
              <td class="text-center">
                <div
                  v-if="!$isNullOrEmpty(data.item.comingTime)"
                  style="min-width: 80px"
                >
                  {{
                    moment(data.item.comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'YYYY'
                    )
                  }}
                </div>
              </td>
              <td>
                <div
                  v-if="!$isNullOrEmpty(data.item.deadline)"
                  style="min-width: 120px"
                >
                  {{
                    moment(data.item.deadline, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD/MM/YYYY'
                    )
                  }}
                </div>
              </td>
              <td>
                <div v-if="data.item.field" style="min-width: 120px">
                  {{ data.item.field.name }}
                </div>
              </td>
              <td>
                <div style="min-width: 150px">
                  {{ data.item.fieldThemeName }}
                </div>
              </td>
              <td>
                <div v-if="data.item.requestType" style="min-width: 150px">
                  {{ data.item.requestType.name }}
                </div>
              </td>
              <td>
                <div style="min-width: 150px">
                  <v-tooltip bottom max-width="600" max-height="700">
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        style="max-width: 500px"
                        class="hide-text"
                        v-html="data.item.requestAnwser"
                        v-bind="attrs"
                        v-on="on"
                      ></div>
                    </template>
                    <span
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 10;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                      "
                      v-html="data.item.requestAnwser"
                    ></span>
                  </v-tooltip>
                </div>
              </td>
              <td class="text-center">
                <div style="min-width: 180px">{{ data.item.units }}</div>
              </td>
              <td>
                <div style="min-width: 120px">
                  {{ data.item.replyNumber }}
                </div>
              </td>
            </tr>
          </template>
          <template
            slot="body"
            v-if="listItem.length == 0 && loadingHeader == false"
          >
            <tr>
              <td></td>
            </tr>
          </template>
          <template slot="body" v-if="loadingHeader == true">
            <tr>
              <td colspan="15">
                <v-progress-linear
                  indeterminate
                  color="warning"
                ></v-progress-linear>
              </td>
            </tr>
          </template> </v-data-table
      ></CardGlobal>
      <CardGlobal class="mt-2">
        <v-row class="ma-0" no-gutters align="center">
          <v-col class="pr-0 col-auto">
            <div class="d-flex align-center">
              Chế độ hiển thị: <span class="ml-4">rút gọn</span>
              <v-switch
                @change="changeTypeShow"
                v-model="typeShow"
                :true-value="2"
                :false-value="1"
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
          <v-col class="col-auto ml-4">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogSearchMore = true"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="30" color="primary"> mdi-plus-circle</v-icon>
                </v-btn>
              </template>
              <span>Mở rộng bộ lọc</span>
            </v-tooltip>
          </v-col>
          <v-col class="col-auto pl-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="resetFillter" icon v-bind="attrs" v-on="on">
                  <v-icon size="30" color="primary">mdi-reload</v-icon>
                </v-btn>
              </template>
              <span>Reset bộ lọc</span>
            </v-tooltip>
          </v-col>
          <v-col class="col-auto ml-2">
            <v-btn depressed class="primary text-none" @click="getListRequest"
              >Tìm kiếm</v-btn
            >
          </v-col>
          <v-col
            class="col-auto ml-4"
            v-if="
              $checkRole(
                Rules.System.ListRequest.actions.them_moi,
                Rules.System.ListRequest.id
              )
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
      <searchMore
        :objectTypeId="objectTypeId"
        :fieldSearch="field"
        @search="search"
        :open="openDialogSearchMore"
        @toggle="openDialogSearchMore = !openDialogSearchMore"
      ></searchMore>
      <yes-no-alert
        :open="openDeleteRequest"
        @toggle="openDeleteRequest = !openDeleteRequest"
        alertMsg="Bạn có chắc chắn muốn xóa kiến nghị này?"
        @OK="confirmDelete"
      >
      </yes-no-alert>
    </div>
  </client-only>
</template>
<script>
import searchMore from '~/components/danh-sach-kien-nghi/searchMore.vue'
// import dataConfig from '~/plugins/dataConfig'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import haerderDefault from '~/components/danh-sach-kien-nghi/header/haerderDefault.vue'
import HeaderFull from '~/components/danh-sach-kien-nghi/header/HeaderDSKN.vue'
import Rules from '~/assets/configurations/Rules'
// import request from '~/store/request'
import moment from 'moment'
import { set } from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    searchMore,
    haerderDefault,
    HeaderFull,
    DatePickerIcon,
  },
  data() {
    return {
      objectRequestIds: [],
      Rules,
      headers: [],
      listTypeShow: [
        {
          text: 'Rút gọn',
          value: 1,
        },
        {
          text: 'Đầy đủ',
          value: 2,
        },
      ],
      loadingHeader: true,
      openDeleteRequest: false,
      pageCount: 1,
      openDialogSearchMore: false,
      pageIndex: 1,
      itemsPerPage: 20,
      listItem: [],
      requestType: [],
      problemGroup: [],
      typeShowDonVi: true,
      approvalStatus: null,
      replyStatus: null,
      changeStatus: null,
      selectDeadline: '',
      unit: [],
      leader: null,
      field: [],
      content: null,
      synbol: null,
      totalReqest: 0,
      idRequest: null,
      totalApprovedRequest: 0,
      totalNonReplyRequest: 0,
      totalPendingRequest: 0,
      totalRepliedRequest: 0,
      hotProblem: null,
      policyProblem: null,
      typeShow: 1,
      fieldName: null,
      statusName: null,
      objectTypeName: null,
      object: null,
      objectTypeId: [],

      date: [
        // moment().startOf('year').format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD'),
      ],
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
    this.headers = this.$store.state.dataConfig.HeadersDefault
    if (!this.$isNullOrEmpty(this.$store.state.utilitiesState.contentFillter)) {
      this.content = this.$store.state.utilitiesState.contentFillter
    } else {
      this.content = this.$store.state.request.contentRequest
    }
    if (!this.$isNullOrEmpty(this.$store.state.dataConfig.dateSelect)) {
      this.date = JSON.parse(
        JSON.stringify(this.$store.state.dataConfig.dateSelect)
      )
    } else {
      if (Number(moment().format('MM')) > 3) {
        this.date = [
          moment().startOf('year').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        ]
      } else {
        this.date = [
          moment().startOf('year').subtract(1, 'years').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        ]
      }
    }
    this.path = this.$route.fullPath
    setTimeout(() => {
      if (
        this.$store.state.app.requestObjectType != null &&
        this.$store.state.app.requestObjectType.id !== 25
      ) {
        this.typeShowDonVi = false
      }
      this.getListRequest()
    }, 500)

    // this.requestStatistic()
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
      this.$store.commit('dataConfig/setDate', this.date)
    },
    searchFilter(value) {
      this[value.field] = value.data
      this.pageIndex = 1
      this.getListRequest()
    },
    changeTypeShow() {
      if (this.typeShow === 2) {
        this.headers = this.$store.state.dataConfig.HeadersFull
      } else {
        this.headers = this.$store.state.dataConfig.HeadersDefault
        if (
          !this.$isNullOrEmpty(this.$store.state.utilitiesState.contentFillter)
        ) {
          this.content = this.$store.state.utilitiesState.contentFillter
        } else {
          this.content = this.$store.state.request.contentRequest
        }
      }
    },
    selectAllPaymentStatus() {
      this.$nextTick(() => {
        if (this.selectedAllStatus) {
          this.problemGroup = []
        } else {
          let data = []
          this.$store.state.commonController.stateCommon.listProblemGroup
            .slice()
            .map((problemGroup) => {
              data.push(problemGroup.value)
            })
          this.problemGroup = data
        }
      })
    },
    resetFillter() {
      this.pageIndex = 1
      this.itemsPerPage = 50
      this.requestType = []
      this.problemGroup = []
      this.approvalStatus = null
      this.replyStatus = null
      this.changeStatus = null
      this.selectDeadline = ''
      this.unit = []
      this.leader = null
      this.field = []
      this.content = null
      this.synbol = null
      this.idRequest = null
      this.object = null
      this.fieldName = null
      this.objectTypeName = null
      this.statusName = null
      this.objectTypeId = []
      this.$store.commit('dataConfig/setObjectRequestIds', [])
      this.$store.commit('dataConfig/setObjectTypeId', [])
      this.$store.commit('dataConfig/setField', [])
      this.$store.commit('dataConfig/setRoute', [])
      this.$store.commit('dataConfig/setUnit', [])
      this.$store.commit('dataConfig/setRequestType', [])
      this.$store.commit('utilitiesState/setContentFillter', null)
      setTimeout(() => {
        this.$refs.resetHeader.reset()
        this.getListRequest()
      }, 100)
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
    },
    deleteItem(item) {
      this.idRequest = item.id
      this.openDeleteRequest = true
    },
    confirmDelete() {
      this.$store
        .dispatch('request/requestDelete', { id: this.idRequest })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Xóa kiến nghị thành công')
            this.getListRequest()
          }
        })
    },
    detail(item) {
      if (
        this.$checkRole(
          Rules.System.ListRequest.actions.chitiet,
          Rules.System.ListRequest.id
        )
      ) {
        this.$store
          .dispatch('request/detailRequest', { id: item.id })
          .then((res) => {
            if (res.data.error.code === 0) {
              this.$store.commit('request/setDataDetailRequest', res.data.data)
              this.$router.push('/kien-nghi/chi-tiet-kien-nghi')
            }
          })
      }
      // console.log(item)
    },
    update(item) {
      // console.log(item)
      this.$store.commit('dataConfig/setUrlUpdateRequest', this.$route.fullPath)
      this.$store
        .dispatch('request/detailRequest', { id: item.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$store.commit('request/setDataDetailRequest', res.data.data)
            console.log(res.data.data)
          }
        })
        .finally(() => {
          this.$router.push('/kien-nghi/cap-nhat-kien-nghi')
        })
    },
    search(value) {
      this.synbol = value.synbol
      this.hotProblem = value.hotProblem
      this.policyProblem = value.policyProblem
      this.pageIndex = 1
      this.getListRequest()
    },
    changePageSize(value) {
      this.pageIndex = 1
      this.itemsPerPage = value

      this.$refs.pagination.reset()
      this.getListRequest()
    },
    changePage(value) {
      this.pageIndex = value
      this.getListRequest()
    },
    getListRequest() {
      this.loadingHeader = true
      let data = {
        objectRequestIds: this.objectRequestIds.join(),
        NumberOfAnswers: this.NumberOfAnswers,
        onlyMe: !this.typeShowDonVi ? true : false,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
        hotProblems: this.hotProblem,
        policyProblems: this.policyProblem,
        // id: this.$store.state.utilitiesState.idGroup,
        approvalStatus: this.approvalStatus,
        changeStatus: this.changeStatus,
        replyStatus: this.replyStatus,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? null
          : this.problemGroup.join(),
        content: this.content,
        deadline: this.selectDeadline,
        fieldId: this.field.join(),
        leaderId: this.leader,
        requestTypeId: this.requestType.join(),
        symbols: this.synbol,
        unitId: this.unit.join(),
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        objectTypeId: this.objectTypeId.join(),
        // problemGroups:this.problemGroup
      }
      this.$store.dispatch('request/requestNonReply', data).then((res) => {
        if (res.data.error.code === 0) {
          // console.log(res)
          this.listItem = res.data.data.data
          this.pageCount = res.data.data.totalPages
          this.loadingHeader = false
        }
      })
      this.$store.dispatch('request/requestStatistic', data).then((res) => {
        if (res.data.error.code === 0) {
          this.totalReqest = res.data.data.totalRequest
          this.totalApprovedRequest = res.data.data.totalApprovedRequest
          this.totalNonReplyRequest = res.data.data.unreplied
          this.totalPendingRequest = res.data.data.totalPendingRequest
          this.totalRepliedRequest = res.data.data.totalRepliedRequest
        }
      })
    },
  },
  computed: {
    selectedAllStatus() {
      return (
        this.problemGroup.length ===
        this.$store.state.commonController.stateCommon.listProblemGroup.length
      )
    },
    icon() {
      if (this.selectedAllStatus) return 'mdi-close-box'
      if (this.selectedSomeStatus) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    selectedSomeStatus() {
      return this.problemGroup.length > 0 && !this.selectedAllStatus
    },
  },
}
</script>
<style lang="scss">
.requestNotApprove {
  td {
    div {
      color: black !important;
    }
  }
}
.requestDone {
  td {
    // div {
    color: #009cf7 !important;
    // }
  }
}
.requestNotReply {
  td {
    // div {
    color: red !important;
    // }
  }
}
.requestReplyNotSuccess {
  td {
    // div {
    color: #ef7004 !important;
    // }
  }
}
// .header-full {
//   div {
//     table {
//       width: 160% !important;
//       border-spacing: 0;
//     }
//   }
// }
</style>
