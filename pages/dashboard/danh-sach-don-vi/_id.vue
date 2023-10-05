<template>
  <client-only>
    <div class="main_body_dsdv">
      <div class="d-none" @click="resetFillter" id="resetFillter"></div>
      <!-- <div></div>   -->
      <!-- <CardGlobal>
        <div class="d-flex">
          <div
            style="font-size: 1.3rem; font-weight: 500"
            class="primary--text"
          >
            <v-btn @click="backHis" icon>
              <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
            </v-btn>

            Danh sách vấn đề nóng
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
      </CardGlobal> -->
      <CardGlobal class="my-1">
        <v-row class="ml-0 my-0 mr-5" style="align-items: center">
          <v-col class="col-auto pa-0">
            <v-btn @click="back" icon>
              <v-icon size="40" color="primary">mdi-arrow-left-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col class="col-auto pa-0 ml-2" style="align-self: center">
            <img class="pt-1" :src="logo" style="width: 9rem" />
          </v-col>
          <v-col cols="6"></v-col>
          <v-col class="pt-2 pt-md-0 pb-2 pb-md-0">
            <DatePickerIcon
              :label="['Từ ngày', 'Đến ngày']"
              :date="date"
              ref="refDate"
            ></DatePickerIcon>
          </v-col>
          <v-col
            class="py-0 pl-0"
            :class="breakpoint == 'mobile' ? 'col-12' : 'col-auto'"
          >
            <v-btn icon depressed @click="resetData" class="mr-1">
              <img src="/icon/reset.png" width="25" />
            </v-btn>
            <v-btn
              depressed
              @click="getDataRequest"
              class="primary text-none"
              :block="breakpoint == 'mobile'"
            >
              Thống kê
            </v-btn>
          </v-col>
        </v-row>
      </CardGlobal>
      <CardGlobal>
        <div class="d-flex">
          <div class="mainLeft" style="width: 15%">
            <div class="title-menu-tab text-center" style="border-radius: 6px">
              <p class="margin-p white--text mb-1">
                Đơn vị
                <span v-if="listItem.length !== 0">
                  ( <span class="white--text">{{ listItem.length }}</span> )
                </span>
              </p>
            </div>
            <CardGlobal>
              <!-- <v-col cols="12">
                <v-text-field
                  outlined
                  hide-details=""
                  clearable
                  :spellcheck="false"
                  placeholder="Nội dung tìm kiếm"
                >
                  <template v-slot:append>
                    <v-btn icon @click="getDataRequest">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col> -->

              <!-- <div class="buttons" v-for="item in listItem" :key="item.unitId">
        
                <v-tabs vertical>
                  <v-tab @click="toggleVisibility(item.unitId)">
                    {{ item.unitName }}
                  </v-tab>
                </v-tabs>
              </div> -->
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="searchName"
                    dense
                    outlined
                    single-line
                    hide-details
                    class="pb-2"
                    placeholder="Tìm kiếm"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <client-only>
                    <v-data-table
                      :headers="headerGroup"
                      :items="listItem"
                      :search="searchName"
                      no-data-text="Không có dữ liệu"
                      no-results-text="Không có kết quả phù hợp"
                      loading-text="Xin chờ..."
                      disable-pagination
                      class="elevation-0 custom_header_table4"
                      hide-default-header
                      hide-default-footer
                      light
                    >
                      <template v-slot:item="{ item }">
                        <template>
                          <tr
                            class="my-4"
                            :class="{
                              'primary white--text font-weight-bold ':
                                item.unitId === selectedId,
                            }"
                          >
                            <td
                              v-if="item.totalRecord !== 0"
                              class="text-left cp w-100"
                              @click="setSelectedItem(item)"
                            >
                              <div class="d-flex w-100">
                                {{ getItemIndex(item) }}. {{ item.unitName }}
                                <div class="flex-grow-1"></div>

                                <span>
                                  (<span
                                    :class="
                                  
                                        item.unitId === selectedId ? 'white--text ' : 'red--text fw-700' ,
                                    "
                                  >
                                    {{ item.totalRecord }}</span
                                  >
                                  )
                                </span>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </template>
                    </v-data-table>
                  </client-only>
                </v-col>
              </v-row>
            </CardGlobal>
          </div>

          <div class="mainRight" style="width: 20%">
            <div
              class="title-right-tab text-center ml-2"
              style="border-radius: 6px"
            >
              <p class="margin-p white--text mb-1">
                Vấn đề
                <span v-if="listItemVD.length !== 0">
                  ( <span class="white--text">{{ totalReqest }}</span> )
                </span>
              </p>
            </div>
            <CardGlobal class="ml-2">
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="searchNameVD"
                    dense
                    outlined
                    single-line
                    hide-details
                    class="pb-2"
                    placeholder="Tìm kiếm"
                    clearable
                    @keydown.enter="getDataVD"
                    @click:clear="clearData"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <client-only>
                    <v-data-table
                      :headers="headerGroupVD"
                      :items="listItemVD"
                      no-data-text="Không có dữ liệu"
                      no-results-text="Không có kết quả phù hợp"
                      loading-text="Xin chờ..."
                      disable-pagination
                      class="elevation-0 custom_header_table4"
                      hide-default-header
                      hide-default-footer
                      light
                    >
                      <template v-slot:item="{ item }">
                        <template>
                          <tr
                            class="my-4"
                            :class="{
                              'primary white--text font-weight-bold ':
                                item.id === selectedIdVD,
                            }"
                          >
                            <td
                              class="text-left cp"
                              @click="setSelectedItemVD(item)"
                            >
                              {{ getItemIndexVD(item) }}.
                              {{ item.rawRequestName }}
                            </td>
                          </tr>
                        </template>
                      </template>
                    </v-data-table>
                  </client-only>
                </v-col>
              </v-row>

              <v-col
                class="col-auto px-0 py-0"
                v-if="(listItemVD || []).length !== 0"
              >
                <paginationNoGo
                  class="mt-1"
                  ref="Pagination"
                  :pageCount="pageCount"
                  :page="page"
                  :pageSize="itemsPerPage"
                  @changePage="changePage"
                  depressed="true"
                ></paginationNoGo>
              </v-col>
            </CardGlobal>
          </div>

          <div class="mainRight" style="width: 65%">
            <div
              class="title-right-tab-nd text-center ml-2"
              style="border-radius: 6px"
            >
              <p class="margin-p white--text mb-1">Nội dung</p>
            </div>
            <v-card
              outlined
              class="ml-2"
              flat
              style="
                border: thin solid rgba(0, 0, 0, 0.12);
                border-radius: 10px;
              "
            >
              <!-- <v-card-title class="pb-0 pt-2">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="searchND"
                      dense
                      outlined
                      hide-details
                      class="pb-2"
                      placeholder="Tìm kiếm"
                      @keydown.enter="setColorSearch"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-title> -->
              <v-card-text
                v-if="!$isNullOrEmpty(content)"
                class="classContent"
                style="max-height: calc(100vh - 13rem); overflow-x: hidden"
              >
                <v-divider class="mb-3"></v-divider>
                <div v-if="!$isNullOrEmpty(reality)" class="fw-500 fs-18 pb-1">
                  Thực trạng:
                </div>

                <div
                  class="pl-3"
                  v-if="!$isNullOrEmpty(reality)"
                  v-html="reality"
                ></div>
                <div
                  v-if="!$isNullOrEmpty(content)"
                  class="font-weight-bold fs-18 pb-1"
                >
                  Giải pháp:
                </div>
                <div
                  class="pl-3"
                  v-if="!$isNullOrEmpty(content)"
                  v-html="content"
                ></div>

                <div
                  v-if="!$isNullOrEmpty(internationalExp)"
                  class="font-weight-bold fs-18 pb-1"
                >
                  Kinh nghiệm quốc tế:
                </div>
                <div
                  class="pl-3"
                  v-if="!$isNullOrEmpty(internationalExp)"
                  v-html="internationalExp"
                ></div>

                <div v-if="!$isNullOrEmpty(note)" class="fw-500 fs-18 pb-1">
                  Ghi chú:
                </div>
                <div
                  class="pl-3 pb-5"
                  v-if="!$isNullOrEmpty(note)"
                  v-html="note"
                ></div>
              </v-card-text>
              <v-card-text v-else class="pt-4">
                <div class="v-data-table__empty-wrapper">
                  Không có dữ liệu
                </div></v-card-text
              >
            </v-card>
          </div>
        </div>
      </CardGlobal>
    </div>
  </client-only>
</template>
<script>
// import dataConfig from '~/plugins/dataConfig'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import haerderDefault from '~/components/van-de-nong/header/HeaderDV.vue'
// import HeaderFull from '~/components/van-de-nong/header/HeaderFull.vue'
import Rules from '~/assets/configurations/Rules'
// import request from '~/store/request'
import URL from '~/assets/configurations/urlConfig'

import moment from 'moment'
import jsCookie, { set } from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    haerderDefault,
    // HeaderFull,
    DatePickerIcon,
  },
  data() {
    return {
      page: 1,
      date: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      loaddingExport: false,
      objectRequestIds: [],
      loadingHeader: true,
      acceptReplyStatus: null,
      unitName: null,
      openApproval: false,
      openMove: false,
      Rules,
      searchND: null,
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
      openDeleteRequest: false,
      pageCount: 1,

      pageIndex: 1,
      itemsPerPage: 20,

      itemsPerPage: 10,
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
      doiTuongQuanLy: jsCookie.get('requestObjectTypeId'),
      listItem: [],
      listItemVD: [],
      selectedId: null,
      searchName: null,
      internationalExp: null,
      reality: null,
      note: null,
      content: null,
      selectedIdVD: null,
      searchNameVD: null,
      total_item: 0,
      logo: null,
      // typeShowDonVi: true,
    }
  },

  head() {
    return {
      title: 'Dashboard thống kê theo đơn vị',

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard thống kê theo đơn vị',
        },
        {
          hid: 'title',
          name: 'og:title',
          property: 'og:title',
          content: 'Dashboard thống kê theo đơn vị',
        },
        {
          hid: 'url',
          name: 'og:url',
          property: 'og:url',
          content: this.urlShare,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.title,
        },

        {
          name: 'og:type',
          property: 'og:type',
          content: 'article',
        },
      ],
    }
  },

  mounted() {
    this.date = [this.$route.query.startDate, this.$route.query.endDate]

    this.getDataRequest()
  },

  methods: {
    resetData() {
      this.date = [this.$route.query.startDate, this.$route.query.endDate]
      this.getDataRequest()
    },
    getMultipleIndexOf(str, searchQuery, acc = 0, result = []) {
      if (!str || !searchQuery) {
        return { result, acc }
      }
      const foundIndex = str.toLowerCase().indexOf(searchQuery.toLowerCase())
      if (foundIndex < 0) {
        return { result, acc }
      }
      return this.getMultipleIndexOf(
        str.slice(foundIndex + searchQuery.length),
        searchQuery,
        acc + foundIndex + searchQuery.length,
        [...result, acc + foundIndex]
      )
    },

    toNonAccentVietnamese(str) {
      str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A')
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/Đ/g, 'D')
      str = str.replace(/đ/g, 'd')
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
      return str
    },
    setColorSearch(value) {
      console.log(value, '23123123123123')
      let text = value
      console.log(text, '2131231231')
      // text = this.$isNullOrEmpty(text) ? '' : text.trim()
      if (text == '') return

      setTimeout(() => {
        let elementToBeSearched = document.querySelector('.classContent')
        if (elementToBeSearched == null) return
        // let lst_text = elementToBeSearched.querySelectorAll("p");
        let lst_text = elementToBeSearched.childNodes
        for (let i = 0; i < lst_text.length; i++) {
          if (lst_text[i].innerHTML == undefined) continue
          console.log(lst_text[i].innerHTML)
          let nonAccentText = this.toNonAccentVietnamese(lst_text[i].innerHTML)
          let nonAccentSearch = this.toNonAccentVietnamese(text)
          let result = this.getMultipleIndexOf(nonAccentText, nonAccentSearch)
          let stt = 1

          if (result.result.length > 0) {
            for (let j = 0; j < result.result.length; j++) {
              if (j != 0) {
                let totalStart = 13 * (stt - 1)
                result.result[j] += totalStart
              }
              lst_text[i].innerHTML = [
                lst_text[i].innerHTML.slice(0, result.result[j]),
                '<mark>',
                lst_text[i].innerHTML.slice(result.result[j]),
              ].join('')
              let end = result.result[j] + text.length + 6

              lst_text[i].innerHTML = [
                lst_text[i].innerHTML.slice(0, end),
                '</mark>',
                lst_text[i].innerHTML.slice(end),
              ].join('')
              stt++
            }
          }
        }
      }, 1000)
    },

    clearData() {
      this.searchNameVD = null
      this.getDataVD()
    },
    back() {
      window.history.back()
    },
    getItemIndex(item) {
      return this.listItem.indexOf(item) + 1
    },
    getItemIndexVD(item) {
      return this.listItemVD.indexOf(item) + 1
    },
    setSelectedItem(item) {
      this.content = null
      this.selectedId = item.unitId
      this.listItemVD = []

      this.getDataVD()
    },
    changePage(value) {
      this.page = value
      this.getDataVD()
    },
    getDataVD() {
      this.listItemVD = []
      this.$store
        .dispatch('request/requestHotIssue', {
          unitId: this.selectedId,
          requestName: this.searchNameVD,
          pageIndex: this.page,
          pageSize: this.itemsPerPage,
          fieldId: this.$route.query.onlyme,
          fromTime: moment(this.date[0], 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          toTime: moment(this.date[1], 'YYYY-MM-DD').format(
            'DD/MM/YYYY 23:59:59'
          ),
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            // console.log(res)
            this.listItemVD = []
            this.listItemVD = res.data.data.data
            this.pageCount = res.data.data.totalPages

            this.totalReqest = res.data.data.totalRecords
          }
        })
    },
    setSelectedItemVD(item) {
      this.selectedIdVD = item.id
      this.getDataDetail()
    },
    getDataDetail() {
      this.$store
        .dispatch('request/requestHotIssueDetail', {
          id: this.selectedIdVD,
        })
        .then((res) => {
          if (!res.error) {
            // kinh nghiệm quốc tế
            this.internationalExp = res.data.data.internationalExp
            this.reality = res.data.data.reality
            this.note = res.data.data.note
            this.content = res.data.data.requestContent
          }
        })
    },
    getDataRequest() {
      this.loadingHeader = true
      let data = {
        fieldId: this.$route.query.onlyme,
        fromTime: moment(this.date[0], 'YYYY-MM-DD').format(
          'DD/MM/YYYY 00:00:00'
        ),
        toTime: moment(this.date[1], 'YYYY-MM-DD').format(
          'DD/MM/YYYY 23:59:59'
        ),
        name: this.$isNullOrEmpty(this.searchName)
          ? null
          : this.searchName.trim(),
      }
      this.$store
        .dispatch('request/dashboardSummaryByUnit', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listItem = []
            res.data.data.map((item) => {
              if (item.totalRecord !== 0) {
                this.listItem.push({
                  ...item,
                })
              }
            })

            this.logo = res.data.data[0].logo
            this.loadingHeader = false
          }
        })
    },
    // toggleVisibility(value) {

    // },

    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.list_problem.id,
        actionId
      )
      return isAllowed
    },

    backHis() {
      // this.$store.commit('utilitiesState/setContentFillter', null)
      window.history.back()
    },
    confirm(item) {
      // console.log(item)
      this.idRequest = item.id
      this.openApproval = true
    },

    searchFilter(value) {
      this[value.field] = value.data
      this.pageIndex = 1
    },
    changeTypeShow() {
      if (this.typeShow === 2) {
        this.headers = this.$store.state.dataConfig.HeadersFull
      } else {
        this.headers = this.$store.state.dataConfig.HeadersDefault
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
      this.itemsPerPage = 20
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
      this.$store.commit('utilitiesState/setContentFillter', '')
      this.date = [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]

      setTimeout(() => {
        this.$refs.resetHeader.reset()
      }, 100)
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
          }
        })
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
          this.$router.push('')
        })
    },
    search(value) {
      this.synbol = value.synbol
      this.hotProblem = value.hotProblem
      this.policyProblem = value.policyProblem
      this.pageIndex = 1
    },
  },
  computed: {
    headerGroup() {
      return [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'unitName',
        },
      ]
    },
    headerGroupVD() {
      return [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'unitName',
        },
      ]
    },

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

    typeShowDonVi: {
      get() {
        return this.$store.state.app.stateOnlye
      },
      set(value) {
        this.$store.commit('app/setStateOnlyme', value)
      },
    },
    checkSo: {
      get() {
        if (this.$store.state.app.requestObjectType != null) {
          return this.$store.state.app.requestObjectType.id
        } else {
          return null
        }
      },
      set() {},
    },
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

.actions-coordinates-1 {
  position: fixed;
  z-index: 5;
  right: 0;

  bottom: 0;
}
// .actions-coordinates-2 {
//   position: fixed;
//   padding-bottom: 20px;
//   padding-top: 10px;
//   z-index: 5;
//   right: 0;
//   bottom: 0;
//   background-color: #f5f7fe;
// }

.v-tabs--vertical > .v-tabs-bar {
  width: 30% !important;
}
.v-tab {
  min-width: 100% !important;
  max-width: 100% !important;
  justify-content: left !important;
  letter-spacing: inherit;
}

.problem-id {
  cursor: pointer;
  font-size: 15px;
}
.itemMenu a {
  text-decoration: none;
  color: #000;
  font-size: 15px;
  padding: 0 10px;
}
/*.buttons{*/
/*  padding-top: 10px;*/
/*}*/
/*#tab{*/
/*  padding-top: 10px;*/
/*}*/
/*#tab-1{*/
/*  padding-top: 10px;*/
/*}*/
.v-card__text {
  padding-top: 0 !important;
}
.itemMenu {
  background: #f5f5f5;
  padding: 10px 0;
  margin: 3px 0;
}
.v-tabs--vertical > .v-tabs-bar .v-tab {
  min-height: 25px !important;
}
.titletab {
  text-transform: none;
  max-width: 52%;
  text-align: left;
  margin: 3px;
}
/*.content-tab{*/
/*  display: none;*/
/*}*/
.v-tabs-slider {
  display: none;
}
.v-slide-group__content {
  white-space: inherit;
}
.v-pagination {
  justify-content: flex-start;
}
.title-menu-tab,
.title-right-tab,
.title-right-tab-nd {
  background-color: #2196f3;
  position: relative;
}
.title-right-tab-nd::after {
  position: absolute;
  top: 11px;
  left: 0;
}
.title-right-tab::after {
  position: absolute;
  top: 11px;
  left: 0;
}
.margin-p {
  padding: 0;
  margin: 0;
}
.title-menu-tab p,
.title-right-tab p,
.title-right-tab-nd p {
  font-size: 16px;
  padding: 10px;
  font-weight: bold;
}
</style>
<style lang="scss"  >
.main_body_dsdv {
  .v-data-table__wrapper {
    max-height: calc(100vh - 18rem) !important;
    overflow-y: auto !important;
  }
}
</style>

