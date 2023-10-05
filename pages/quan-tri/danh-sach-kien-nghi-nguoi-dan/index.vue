<template>
  <div>
    <client-only
      v-if="
        $checkRole(
          Rules.System.RequestManage.actions.viewList,
          Rules.System.RequestManage.id
        )
      "
    >
      <div v-if="actionss === 1">
        <div class="d-none" @click="resetFillter" id="resetFillter"></div>
        <CardGlobal>
          <div
            style="font-size: 1.3rem; font-weight: 500"
            class="pa-1 primary--text"
          >
            <v-btn to="/" icon>
              <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
            </v-btn>
            Danh sách kiến nghị người dân
            <span v-if="!this.$isNullOrEmpty(objectTypeName)"
              >- {{ objectTypeName }}</span
            >
            <span v-if="!this.$isNullOrEmpty(fieldName)"
              >- {{ fieldName }}</span
            >

            <span v-if="!this.$isNullOrEmpty(statusName)"
              >- {{ statusName }}</span
            >
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
                    Tổng số kiến nghị:
                    {{ $formatMoney({ amount: totalReqest }) }}
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
              v-slot:item="data"
              v-if="listItem.length > 0 && loadingHeader == false"
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
                  <!-- <div v-if="!$isNullOrEmpty(data.item.peopleName)">
                  {{ data.item.peopleName }}
                </div> -->
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.provinceName)">
                  {{ data.item.provinceName }}
                </div> -->
                </td>
                <td class="text-center">
                  <!-- <div v-if="!$isNullOrEmpty(data.item.peoplePhone)">
                  {{ data.item.peoplePhone }}
                </div> -->
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.peopleEmail)">
                  {{ data.item.peopleEmail }}
                </div> -->
                </td>
                <td class="text-center">
                  <!-- <div v-if="!$isNullOrEmpty(data.item.cccd)">
                  {{ data.item.cccd }}
                </div> -->
                </td>
                <td style="cursor: pointer">
                  <!-- <div v-if="!$isNullOrEmpty(data.item.requestContent)">
                  <div v-html="data.item.requestContent"></div>
                </div> -->
                  <v-row no-gutters align="center">
                    <v-col cols="12">
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
                  </v-row>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="d-flex justify-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="confirm(data.item)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="success">mdi-check</v-icon>
                        </v-btn>
                      </template>
                      <span>Duyệt</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon size="20" color="success"
                            >mdi-block-helper</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Từ chối duyệt</span>
                    </v-tooltip>
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.RequestManage.actions.updateRequest,
                          Rules.System.RequestManage.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="update(data.item)"
                        >
                          <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Cập nhật</span>
                    </v-tooltip>
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.RequestManage.actions.deleteRequest,
                          Rules.System.RequestManage.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="deleteItem(data.item)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Xóa</span>
                    </v-tooltip>
                  </div>
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
                  <div>
                    {{ itemsPerPage * (pageIndex - 1) + data.index + 1 }}
                  </div>
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.peopleName)">
                  {{ data.item.peopleName }}
                </div> -->
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.provinceName)">
                  {{ data.item.provinceName }}
                </div> -->
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.districtName)">
                  {{ data.item.districtName }}
                </div> -->
                </td>
                <td>
                  <!-- <div v-if="!$isNullOrEmpty(data.item.wardName)">
                  {{ data.item.wardName }}
                </div> -->
                </td>

                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.fullAddress)"
                >
                  {{ data.item.fullAddress }}
                </div> -->
                </td>
                <td class="text-center">
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.peoplePhone)"
                >
                  {{ data.item.peoplePhone }}
                </div> -->
                </td>
                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.peopleEmail)"
                >
                  {{ data.item.peopleEmail }}
                </div> -->
                </td>
                <td class="text-center">
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.cccd)"
                >
                  {{ data.item.cccd }}
                </div> -->
                </td>
                <!-- lĩnh vực -->
                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.fieldName)"
                >
                  {{ data.item.fieldName }}
                </div> -->
                </td>
                <!-- chủ đề trong lĩnh vực -->
                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.fieldThemeName)"
                >
                  {{ data.item.fieldThemeName }}
                </div> -->
                </td>
                <!-- kiến nghị -->
                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.requestType)"
                >
                  {{ data.item.requestType.name }}
                </div> -->
                </td>
                <td>
                  <!-- <div
                  style="min-width: 150px"
                  v-if="!$isNullOrEmpty(data.item.requestContent)"
                >
                  <div v-html="data.item.requestContent"></div>
                </div> -->
                </td>
                <td>
                  <!-- <div style="min-width: 120px">
                  {{ data.item.replyNumber }}
                </div> -->
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div class="d-flex justify-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon color="success">mdi-check</v-icon>
                        </v-btn>
                      </template>
                      <span>Duyệt</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon size="20" color="success"
                            >mdi-block-helper</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Từ chối duyệt</span>
                    </v-tooltip>
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.RequestManage.actions.updateRequest,
                          Rules.System.RequestManage.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="update(data.item)"
                        >
                          <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Cập nhật</span>
                    </v-tooltip>
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.RequestManage.actions.deleteRequest,
                          Rules.System.RequestManage.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="deleteItem(data.item)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Xóa</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </template>
            <!-- <template
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
                </td></tr></template
          > -->
          </v-data-table>
          <v-btn
            v-if="
              $checkRole(
                Rules.System.ListRequest.actions.export_file,
                Rules.System.ListRequest.id
              )
            "
            :loading="loaddingExport"
            @click="exportFile"
            depressed
            small
            class="success white--text mt-2"
          >
            Xuất file danh sách kiến nghị
          </v-btn>
        </CardGlobal>
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
                  Rules.System.RequestManage.actions.addRequest,
                  Rules.System.RequestManage.id
                )
              "
            >
              <v-btn
                depressed
                class="text-none white--text"
                color="#f2973a"
                to="/quan-tri/them-moi-kien-nghi-nguoi-dan"
                >Thêm kiến nghị
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="col-auto">
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
        <yes-no-alert
          :open="openApproval"
          @toggle="openApproval = !openApproval"
          alertMsg="Bạn có chắc chắn muốn duyệt kiến nghị này?"
          @OK="requestApproval"
        >
        </yes-no-alert>
      </div>
      <updatePage
        v-show="actionss === 2"
        :open="actionss"
        :data="dataDetail"
        @success="getListRequest"
        @toggle="actionss = 1"
      ></updatePage>
    </client-only>
  </div>
</template>
<script>
import searchMore from '~/components/danh-sach-kien-nghi/searchMore.vue'
// import dataConfig from '~/plugins/dataConfig'
import haerderDefault from '~/components/kien-nghi-nguoi-dan/header/HeaderDefault.vue'
import HeaderFull from '~/components/kien-nghi-nguoi-dan/header/HeaderFull.vue'
import Rules from '~/assets/configurations/Rules'
// import request from '~/store/request'
import updatePage from '~/pages/quan-tri/cap-nhat-kien-nghi-nguoi-dan/index.vue'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import moment from 'moment'
import jsCookie, { set } from 'js-cookie'
import Cookies from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    searchMore,
    haerderDefault,
    HeaderFull,
    DatePickerIcon,
    updatePage,
  },
  data() {
    return {
      date: [
        // moment().startOf('year').format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD'),
      ],
      objectRequestIds: [],
      loadingHeader: true,
      unitName: null,
      openApproval: false,
      openMove: false,
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
      loaddingExport: false,
      openDeleteRequest: false,
      pageCount: 1,
      openDialogSearchMore: false,
      pageIndex: 1,
      itemsPerPage: 20,
      listItem: [],
      requestType: [],
      problemGroup: [],
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
      departmentId: null,
      departmentName: null,
      dataItem: {},
      dataDetail: {},
      actionss: 1,
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
    this.departmentId = jsCookie.get('departmentId')
    this.$store.state.commonController.stateCommon.listUnit.map((item) => {
      if (item.value == this.departmentId) {
        this.departmentName = item.text
      }
    })
    this.headers = this.$store.state.dataConfig.HeadersDefault
    if (!this.$isNullOrEmpty(this.$store.state.utilitiesState.contentFillter)) {
      this.content = this.$store.state.utilitiesState.contentFillter
    } else {
      this.content = this.$store.state.request.contentRequest
    }
    this.path = this.$route.fullPath
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

    if (!this.$isNullOrEmpty(this.$route.query.id)) {
      setTimeout(() => {
        this.problemGroup.push(Number(this.$route.query.id))
      }, 700)
    }
    if (!this.$isNullOrEmpty(this.$route.query.field)) {
      setTimeout(() => {
        this.field.push(Number(this.$route.query.field))
        this.fieldName =
          this.$store.state.commonController.stateCommon.listField.find(
            (item) => item.value == this.$route.query.field
          ).text
      }, 700)
    }

    if (!this.$isNullOrEmpty(this.$route.query.objectTypeId)) {
      setTimeout(() => {
        this.objectTypeName =
          this.$store.state.commonController.stateCommon.itemObjectType.find(
            (item) => item.value == this.$route.query.objectTypeId
          ).text
        if (this.$route.query.objectTypeId === 'null') {
          this.objectTypeId = []
        } else {
          this.objectTypeId.push(this.$route.query.objectTypeId)
        }
      }, 700)
    }

    if (!this.$isNullOrEmpty(this.$route.query.object)) {
      setTimeout(() => {
        this.object = this.$route.query.object
      }, 700)
    }
    if (!this.$isNullOrEmpty(this.$route.query.status)) {
      setTimeout(() => {
        if (this.$route.query.status === '1') {
          this.statusName = 'Trả lời thỏa đáng'
          this.replyStatus = 'REPLIED'
        } else if (this.$route.query.status === '3') {
          this.statusName = 'Chưa trả lời'
          this.replyStatus = 'UN_REPLY'
        } else {
          this.statusName = 'Đã trả lời, cần làm rõ'
        }
      }, 700)
    }
    setTimeout(() => {
      this.getListRequest()
    }, 700)
    // this.requestStatistic()
  },

  methods: {
    // duyệt kiến nghị

    confirm(item) {
      this.dataItem = item
      this.openApproval = true
    },
    requestApproval() {
      let data = {
        requestPendingId: this.dataItem.id,
        approvalStatus: 1,
        fieldId: this.dataItem.fieldId,
        fieldThemeId: this.dataItem.fieldThemeId,
        unitId: null,
        showHome: null,
      }
      this.$store
        .dispatch('requestPeople/approvalPending', data)
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Duyệt kiến nghị thành công')
            this.getListRequest()
          }
        })
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
    async exportFile() {
      // this.loaddingExport = true
      let data = {
        objectRequestIds: this.$store.state.dataConfig.objectRequestIds.join(),
        NumberOfAnswers: this.NumberOfAnswers,

        hotProblems: this.hotProblem,
        policyProblems: this.policyProblem,

        approvalStatus: this.approvalStatus,
        changeStatus: this.changeStatus,
        replyStatus: this.replyStatus,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? null
          : this.problemGroup.join(),

        deadline: this.selectDeadline,
        fieldId: this.$store.state.dataConfig.field.join(),
        leaderId: this.leader,
        requestTypeId: this.$store.state.dataConfig.requestType.join(),
        symbols: this.synbol,
        unitId: this.$store.state.dataConfig.unit.join(),

        // objectTypeId: this.$store.state.dataConfig.objectTypeId.join(),

        //
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
        name: this.$store.state.dataConfig.fullName,
        phone: this.$store.state.dataConfig.phoneNumber,
        email: this.$store.state.dataConfigemail,
        districtCode: this.$store.state.dataConfig.district,
        provinceCode: this.$store.state.dataConfig.province,
        wardCode: this.$store.state.dataConfig.ward,
        address: this.$store.state.dataConfig.address,
        cccd: this.$store.state.dataConfig.cccd,
        content: this.$store.state.utilitiesState.contentFillter,
        // problemGroups:this.problemGroup
      }
      // await this.$store
      //   .dispatch('exportFile/exportListRequest', data)
      //   .then((res) => {
      //     if (res.data.error.code === 0) {
      //       window.location.href = res.data.data.url
      //     }
      //     this.loaddingExport = false
      //   })
      // this.loaddingExport = false
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
      this.$store
        .dispatch('request/detailRequest', { id: item.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$store.commit('request/setDataDetailRequest', res.data.data)
            this.$router.push('/quan-tri/chi-tiet-kien-nghi-nguoi-dan')
          }
        })
    },
    update(item) {
      this.$store.commit('dataConfig/setUrlUpdateRequest', this.$route.fullPath)
      this.$store
        .dispatch('request/detailRequest', { id: item.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.dataDetail = res.data.data
            this.$store.commit('request/setDataDetailRequest', res.data.data)
            this.actionss = 2
          }
        })
        .finally(() => {
          // this.$router.push('/quan-tri/cap-nhat-kien-nghi-nguoi-dan')
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
      // this.loadingHeader = true
      let data = {
        objectRequestIds: this.$store.state.dataConfig.objectRequestIds.join(),
        NumberOfAnswers: this.NumberOfAnswers,
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
        hotProblems: this.hotProblem,
        policyProblems: this.policyProblem,

        approvalStatus: this.approvalStatus,
        changeStatus: this.changeStatus,
        replyStatus: this.replyStatus,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? null
          : this.problemGroup.join(),
        content: this.$store.state.utilitiesState.contentFillter,
        deadline: this.selectDeadline,
        fieldId: this.$store.state.dataConfig.field.join(),
        leaderId: this.leader,
        requestTypeId: this.$store.state.dataConfig.requestType.join(),
        symbols: this.synbol,
        unitId: this.$store.state.dataConfig.unit.join(),
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        objectTypeId: this.$store.state.dataConfig.objectTypeId.join(),
        // problemGroups:this.problemGroup
      }
      // this.$store
      //   .dispatch('requestPeople/requestPeopleList', data)
      //   .then((res) => {
      //     if (res.data.error.code === 0) {
      //       // console.log(res)
      //       this.listItem = res.data.data.data
      //       this.pageCount = res.data.data.totalPages
      //       this.loadingHeader = false
      //     }
      //   })
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
// Chưa trả lời
//replyStatus = UNREPLLIED
.UnReply {
  td {
    div {
      color: red !important;
    }
  }
}

// Đã trả lời
//đã trả lời nhưng chưa xem
//replyStatus = REPLLIED && acceptReplyStatus = NOTSEEN
.RepliedAndNotSeen {
  td {
    div {
      color: purple !important;
    }
  }
}

//đã trả lời và đã xem
//replyStatus = REPLLIED && acceptReplyStatus = SEEN
.RepliedAndSeen {
  td {
    div {
      color: purple !important;
    }
  }
}

//đã trả lời và đã đồng ý
//replyStatus = REPLLIED && acceptReplyStatus = AGREE
.RepliedAndAgree {
  td {
    // div {
    color: #009cf7 !important;
    // }
  }
}
//đã trả lời và cần làm rõ
//replyStatus = REPLLIED && acceptReplyStatus = CLARIFY
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
