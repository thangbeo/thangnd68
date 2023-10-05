<template>
  <client-only>
    <div>
      <!-- <div class="d-flex w-100 actions-coordinates-1">
      <div class="flex-grow-1"></div>

      <v-btn
        class="text-none white--text mr-3"
        color="#4873C2"
        width="120px"
        dark
        depressed
      >
        Đặt lại</v-btn
      >
      <v-btn
        class="text-none white--text mr-3"
        color="#4873C2"
        dark
        depressed
        width="120px"
      >
        Xem trước
      </v-btn>
      <div class="d-flex w-100 actions-coordinates-2">
        <div class="flex-grow-1"></div>
        <v-btn
          color="error"
          class="text-none white--text mr-3"
          depressed
          width="90"
          >Hủy</v-btn
        >
      </div>
    </div> -->
      <!-- <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text d-flex align-center"
      >
        <v-btn @click="back" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Thông tin vấn đề nóng
        <v-spacer></v-spacer>

        <v-switch
          v-if="
            acceptReplyStatus == 'ARGEE' &&
            requestObjectTypeId &&
            requestObjectTypeId == 25
          "
          class="ma-0 pa-0"
          :v-model="showHistory"
          :true-value="true"
          @change="showHistory = !showHistory"
          :false-value="false"
          color="primary"
          hide-details=""
          label="Hiển thị quá trình xử lý vấn đề"
        ></v-switch>
      </div>
    </CardGlobal> -->

      <v-row class="ma-0">
        <v-col
          :cols="
            acceptReplyStatus !== 'ARGEE' || showHistory
              ? breakpoint == 'desktop'
                ? 8
                : 12
              : 12
          "
          class="py-0 pl-0"
          :class="{
            'pr-0': acceptReplyStatus == 'ARGEE',
            'pr-2': acceptReplyStatus !== 'ARGEE' || showHistory,
          }"
        >
          <div>
            <CardGlobal>
              <div class="py-1 mx-4">
                <div class="pb-2 d-flex">
                  <span style="font-size: 1rem">
                    <v-btn @click="backHis" icon>
                      <v-icon size="30" color="primary"
                        >mdi-arrow-left-circle</v-icon
                      >
                    </v-btn>
                    <span style="font-weight: 500"> NỘI DUNG VẤN ĐỀ</span>
                    <span style="color: #c30404"> </span>

                    <span class="fs-14" v-if="!$isNullOrEmpty(comingTime)">
                      {{
                        moment(comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                          'DD/MM/YYYY HH:mm'
                        )
                      }}
                    </span>
                    <span class="ml-n1">,</span>
                    <span style="color: #c30404">
                      {{ unitName }}
                    </span>
                    <span
                      style="
                        color: black;
                        font-style: italic;
                        font-size: 0.9rem;
                      "
                      >đề xuất
                    </span>
                    <span class="black--text ml-n1">,</span>
                    <span>
                      <span style="color: #c30404">{{ field_name }}</span></span
                    >
                    <span
                      v-if="fieldThemeName"
                      class="ml-n1"
                      style="
                        color: black;
                        font-style: italic;
                        font-size: 0.9rem;
                      "
                      >, chủ đề trong lĩnh vực
                    </span>
                    <span style="color: #c30404">{{ fieldThemeName }}</span>

                    <span
                      v-if="problemGroups"
                      style="
                        color: black;
                        font-style: italic;
                        font-size: 0.9rem;
                      "
                      >, nhóm vấn đề
                    </span>
                    <span style="color: #c30404">{{ problemGroups }}</span>
                    <span v-if="session" class="ml-n1"
                      >, <span style="color: #c30404">{{ session }}</span></span
                    >
                    <span v-if="period" class="ml-n2"
                      >, <span style="color: #c30404">{{ period }}</span></span
                    >
                  </span>

                  <v-spacer></v-spacer>
                </div>

                <v-divider class="blue"></v-divider>
                <div class="mt-3"></div>
                <span v-if="!$isNullOrEmpty(title)">
                  <span class="font-weight-bold mr-2 fs-18" style="float: left"
                    >Vấn đề:
                  </span>
                  <span
                    class="fs-18 font-weight-bold blue--text"
                    v-html="title"
                  >
                  </span>
                </span>
                <v-divider class="my-3"></v-divider>
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

                <div>
                  <v-row>
                    <template v-for="item in listFileImage">
                      <v-col
                        :key="item.index"
                        :cols="listFileImage.length < 1 ? 12 : 6"
                      >
                        <img style="width: 100%" :src="item.url" />
                      </v-col>
                    </template>
                  </v-row>
                </div>

                <v-divider
                  v-if="(fileAttach || []).length !== 0"
                  class="my-3"
                />

                <div class="ml-2" v-if="(fileAttach || []).length !== 0">
                  <div v-for="(i, idx) in fileAttach" :key="`${i}${idx}`">
                    <a
                      icon
                      :href="i.url"
                      class="textDeco"
                      style="font-style: italic"
                    >
                      {{ idx + 1 }}. {{ i.fileName }}
                    </a>
                  </div>
                </div>
              </div>
            </CardGlobal>
          </div>
        </v-col>
        <v-col
          v-if="acceptReplyStatus !== 'ARGEE' || showHistory"
          class="pa-0 col-12 col-md-4"
        >
          <CardGlobal>
            <v-row class="ma-0 pb-2">
              <v-col class="col-auto" style="font-size: 14pt; font-weight: 500"
                >Quá trình xử lý vấn đề nóng</v-col
              >
            </v-row>
            <PerfectScrollbar :options="{ swipeEasing: true }" class="scroll">
              <v-row class="ma-0" no-gutters>
                <v-col
                  class="px-5"
                  cols="12"
                  v-for="(itemLog, indexLog) in requestLogs"
                  :key="`log---${indexLog}`"
                >
                  <v-divider v-if="indexLog == 0"></v-divider>
                  <div class="py-1">
                    {{ itemLog.createTime }}: {{ itemLog.fullName }}
                    {{ itemLog.content }}
                  </div>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </PerfectScrollbar>
          </CardGlobal>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-spacer></v-spacer>

        <!-- <v-col class="col-auto pr-0">
        <v-btn
          depressed
          class="primary text-none"
          @click="openDialogInputReasonUnit = true"
          >Lãnh đạo chỉ đạo</v-btn
        >
      </v-col> -->

        <!-- <v-col class="col-auto pr-0">
          <v-btn depressed class="secondary text-none" @click="close"
            >Trở lại</v-btn
          >
        </v-col> -->
      </v-row>
      <RepRequest
        :requestObjectType="requestObjectType"
        :open="openReply"
        :replyNumberDetail="replyNumberDetail"
        @toggle="openReply = !openReply"
        @Success="Success"
      ></RepRequest>

      <Clarify
        :open="openClarify"
        @toggle="openClarify = !openClarify"
      ></Clarify>

      <!-- <InputReasonUnit
      :open="openDialogInputReasonUnit"
      @toggle="openDialogInputReasonUnit = !openDialogInputReasonUnit"
      @Success="detailItem"
    ></InputReasonUnit> -->
    </div>
  </client-only>
</template>
<script>
import Rules from '~/assets/configurations/Rules'
import AdditionalReply from '~/components/danh-sach-kien-nghi/chi-tiet/AdditionalReply.vue'
import InputReason from '~/components/danh-sach-kien-nghi/chi-tiet/InputReason.vue'
import UpdateReplyContent from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateReplyContent.vue'
import UpdateClarify from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateClarify.vue'
import moment from 'moment'
import Clarify from '~/components/danh-sach-kien-nghi/chi-tiet/Clarify.vue'
import jsCookie from 'js-cookie'
import RepRequest from '~/components/danh-sach-kien-nghi/chi-tiet/RepRequest.vue'
import ConfirmRequest from '~/components/danh-sach-kien-nghi/chi-tiet/ConfirmRequest.vue'
// import InputReasonUnit from '~/components/van-de-nong/chi-tiet/InputReasonUnit.vue'

import CardGlobal from '~/components/CardGlobal.vue'
import RequestCoordination from '~/components/danh-sach-kien-nghi/chi-tiet/RequestCoordination.vue'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    Clarify,
    RepRequest,
    UpdateReplyContent,
    UpdateClarify,
    ConfirmRequest,
    InputReason,
    // InputReasonUnit,
    CardGlobal,
    RequestCoordination,
    AdditionalReply,
  },
  data() {
    return {
      aditionalList: [],
      openAdditionalReply: false,
      openDialogRequestCoordination: false,
      showHistory: false,
      totalAnswer: null,
      loaddingConfirm: false,
      fistAnsewer: null,
      openDialogInputReasonUnit: false,
      openDialogInputReason: false,
      Rules,
      openConfirm: false,
      openUpdateClarify: false,
      dataItem: null,
      openUpdateReplyContent: false,
      openChange: false,
      openClarify: false,
      actionReply: false,
      actionClarify: false,
      content: null,
      listReplycontent: [],
      replyContent: null,
      clarifyContent: null,
      idItemReply: null,
      idContent: null,
      requestSuccess: false,
      isReply: false,
      userID: null,
      replyNumberDetail: null,
      replyNumber: null,
      openReply: false,
      openDeleteReply: false,
      requestObjectType: null,
      itemReply: null,
      openDialogDeleteClarify: false,
      itemClarify: null,
      clarifyContentError: [],
      contentShow: [],
      arrData: [],
      loaddingClarify: false,
      requestObjectTypeId: null,
      acceptReplyStatus: null,
      answer: null,
      comingTime: null,
      leader: null,
      fileAttach: [],
      requestContent: null,
      requestLogs: [],
      title: null,
      problemGroups: null,
      unitName: null,
      field_name: null,
      fieldThemeName: null,
      period: null,
      session: null,
      groupID: null,
      listFileImage: null,
      reality: null,
      internationalExp: null,
      note: null,
    }
  },
  head() {
    return {
      title: this.title,

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.title,
        },
        {
          hid: 'title',
          name: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'url',
          name: 'og:url',
          property: 'og:url',
          content: this.urlShare,
        },
        {
          hid: 'image',
          name: 'og:image',
          property: 'og:image',
          content: '',
        },
        {
          name: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: '',
        },
      ],
    }
  },
  mounted() {
    let groupId = this.$route.params.id
    groupId = groupId.split('-')
    groupId = groupId[groupId.length - 1]
    if (groupId.slice(0, 1) === 'n') {
      let url = this.$route.params.id
      let arrTitle = url.split('-')
      this.groupID = arrTitle[arrTitle.length - 1]
        .replace('n', '')
        .replace('.html', '')
      this.urlShare = window.location.href
    }
    this.detailItem()
  },
  computed: {
    breakpoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'mobile'
        case 'md':
          return 'mobile'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
      }
    },
    listData: {
      get() {
        this.arrData.sort((a, b) => {
          return (
            parseFloat(moment(a.createTime, 'DD/MM/YYYY HH:mm:ss').valueOf()) -
            parseFloat(moment(b.createTime, 'DD/MM/YYYY HH:mm:ss').valueOf())
          )
        })
        return this.arrData
      },
      set(value) {},
    },
    dataSuccess: {
      get() {
        let arr = []
        let newsList = []
        let pageCount = Math.ceil(this.listData.length / 2)
        for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
          let arr1 = []
          for (let newsIdx = 0; newsIdx < 2; newsIdx++) {
            let idx = pageIndex * 2 + newsIdx
            arr1.push(this.listData[idx])
          }
          if (arr1.length) {
            newsList.push(arr1)
          }
        }
        arr = newsList
        return arr
      },
      set(value) {},
    },
  },
  methods: {
    backHis() {
      // this.$store.commit('utilitiesState/setContentFillter', null)
      window.history.back()
    },
    detailItem() {
      this.$store
        .dispatch('request/requestHotIssueDetail', {
          id: this.groupID,
        })
        .then((res) => {
          if (!res.error) {
            if ((res.data.data.images || []).length !== 0) {
              this.listFileImage = res.data.data.images
            }
            this.acceptReplyStatus = res.data.data.acceptReplyStatus

            this.comingTime = res.data.data.comingTime
            this.content = res.data.data.requestContent
            // this.leader = res.data.data.leader.name
            this.fileAttach = res.data.data.fileAttachs

            this.note = res.data.data.note
            this.reality = res.data.data.reality
            this.internationalExp = res.data.data.internationalExp

            if (!this.$isNullOrEmpty(res.data.data.unitReplyRequests[0])) {
              if (
                !this.$isNullOrEmpty(res.data.data.unitReplyRequests[0].unit)
              ) {
                if (
                  !this.$isNullOrEmpty(
                    res.data.data.unitReplyRequests[0].unit.name
                  )
                ) {
                  this.unitName = res.data.data.unitReplyRequests[0].unit.name
                }
              }
            }
            if (!this.$isNullOrEmpty(res.data.data.field)) {
              if (!this.$isNullOrEmpty(res.data.data.field.name)) {
                this.field_name = res.data.data.field.name
              }
            }

            this.title = res.data.data.rawRequestName
            if (!this.$isNullOrEmpty(res.data.data.fieldTheme)) {
              if (!this.$isNullOrEmpty(res.data.data.fieldTheme.name)) {
                this.fieldThemeName = res.data.data.fieldTheme.name
              }
            }

            if (!this.$isNullOrEmpty(res.data.data.problemGroups[0])) {
              if (!this.$isNullOrEmpty(res.data.data.problemGroups[0].name)) {
                this.problemGroups = res.data.data.problemGroups[0].name
              }
            }
            if (!this.$isNullOrEmpty(res.data.data.period)) {
              if (!this.$isNullOrEmpty(res.data.data.period.name)) {
                this.period = res.data.data.period.name
              }
            }
            if (!this.$isNullOrEmpty(res.data.data.session)) {
              if (!this.$isNullOrEmpty(res.data.data.session.name)) {
                this.session = res.data.data.session.name
              }
            }
            this.requestLogs = res.data.data.requestLogs
            let departmentId = jsCookie.get('departmentId')
            for (let i = 0; i < res.data.data.unitReplyRequests.length; i++) {
              let item = res.data.data.unitReplyRequests[i]
              if (item.unit.id == departmentId) {
                this.isReply = true
              }
            }
            this.userID = jsCookie.get('userId')

            this.requestAnswer()
          }
        })
    },
    updateClarify(item, content) {
      console.log(content)
      let obj = null
      if (this.$isNullOrEmpty(content.answerContent)) {
        obj = Object.assign(
          { questionContent: content.questionContent, idCla: content.id },
          item[1]
        )
      } else {
        obj = Object.assign(
          { questionContent: content.answerContent, idCla: content.id },
          item[1]
        )
      }
      this.itemClarify = obj
      this.openUpdateClarify = true
    },
    // updateAnswer(item) {
    //   this.dataItem = item
    //   this.openUpdateReplyContent = true
    // },
    async successAdditional() {
      await this.additionalList()
    },
    async additionalList() {
      await this.$store
        .dispatch('request/additionalList', {
          requestId: this.$route.query.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.aditionalList = res.data.data
          }
        })
    },

    // async requestAnswerClarify(id, data, index) {
    //   let arr = []
    //   let dataSuccess = null
    //   this.listReplycontent = []
    //   await this.$store
    //     .dispatch('request/requestAnswerClarify', {
    //       requestAnswerId: id,
    //     })
    //     .then((res) => {
    //       if (res.data.data.length > 0) {
    //         this.arrData.push(res.data.data[0])
    //       }
    //     })
    //   this.contentShow = [{ ...this.listReplycontent[0] }]
    // },
    // requestSeen() {
    //   let data = {
    //     id: this.$route.query.id,
    //     replyStatus: 'SEEN',
    //   }
    //   this.$store.dispatch('request/requestSeen', data).then((res) => {})
    // },

    async deleteClarify() {
      // this.arrData = []
      // let data = {
      //   requestAnswerId: this.itemClarify.id,
      // }
      // await this.$store.dispatch('request/clarifyDelete', data).then((res) => {
      //   if (res.data.error.code === 0) {
      //     this.$showSuccess(this, 'Xóa nội dung cần làm rõ thành công')
      //     this.listReplycontent = []
      //     this.detail()
      //   }
      // })
    },

    deleteReply(item) {
      this.itemReply = item
      this.openDeleteReply = true
    },
    deleteReplyOk() {
      // let data = {
      //   answerContent: this.itemReply.answerContent,
      //   replyNumber: this.$store.state.request.dataDetailRequest.replyNumber,
      //   requestAnswerId: this.itemReply.id,
      //   requestId: this.$store.state.request.dataDetailRequest.id,
      // }
      // this.$store.dispatch('request/answerDelete', data).then((res) => {
      //   if (res.data.error.code === 0) {
      //     this.$showSuccess(this, 'Xóa câu trả lời thành công')
      //     this.listReplycontent = []
      //     this.requestAnswer()
      //   }
      // })
    },
    Success() {
      this.arrData = []
      this.openReply = false

      this.detail()
    },

    confirmReplyCOntent(item) {
      this.openChange = true
      this.idContent = item.id
    },
    // async requestAnswerClarifyPost() {
    //   this.loaddingClarify = true

    //   let isError = false
    //   if (this.$isNullOrEmpty(this.clarifyContent)) {
    //     isError = true
    //     this.clarifyContentError = ['Vui lòng nhập nội dung cần làm rõ']
    //     this.loaddingClarify = false
    //   } else {
    //     let data = {
    //       questionContent: this.clarifyContent,
    //       requestAnswerId: this.idItemReply,
    //     }
    //     await this.$store
    //       .dispatch('request/requestAnswerClarifyPost', data)
    //       .then(async (res) => {
    //         if (res.data.error.code === 0) {
    //           this.$showSuccess(this, 'Yêu cầu làm rõ câu trả lời thành công.')
    //           this.listReplycontent = []

    //           if (
    //             this.totalAnswer == 2 &&
    //             this.$store.state.request.dataDetailRequest.unitReplyRequests[0]
    //               .unit.id !== 1
    //           ) {
    //             let data = {
    //               reason: 'Đơn vị đã trả lời hai lần',
    //               isAuto: true,
    //               id: this.$store.state.request.dataDetailRequest.id,
    //             }
    //             await this.$store
    //               .dispatch('request/transferUnitAnswerVP', data)
    //               .then((res) => {
    //                 if (res.data.error.code === 0) {
    //                 }
    //               })
    //           }
    //           this.detail()
    //           this.idItemReply = null
    //           this.loaddingClarify = false
    //         }
    //       })
    //   }
    // },
    funcOpenClarify(item) {
      this.idItemReply = item.id
    },

    seenRequest(id) {
      this.$store
        .dispatch('request/answerSeenReplyStatus', {
          replyStatus: 'SEEN',
          requestAnswerId: id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.detail()
          }
        })
    },
    // confirm() {
    //   this.$store
    //     .dispatch('request/requestVerifiedAnswer', {
    //       replyStatus: 'ARGEE',
    //       requestAnswerId: this.idContent,
    //     })
    //     .then((res) => {
    //       if (res.data.error.code === 0) {
    //         this.$showSuccess(this, 'Đồng ý với câu trả lời thành công')

    //         this.detail()

    //         this.loaddingConfirm = false
    //       }
    //     })
    // },
    back() {
      this.$router.push('/quan-tri/danh-sach-van-de-nong')
    },
    clarify() {
      this.openClarify = true
    },
    close() {
      this.$store.commit('request/setDataDetailRequest', null)
      this.$router.push('/quan-tri/danh-sach-van-de-nong')
    },
  },
}
</script>
<style lang="scss">
// .actions-coordinates-1 {
//   position: fixed;
//   z-index: 3;
//   right: 0;
//   top: 75px;
//   background-color: #f5f7fe;
// }
// .actions-coordinates-2 {
//   position: fixed;
//   padding-bottom: 20px;
//   padding-top: 10px;
//   z-index: 4;
//   right: 0;
//   bottom: 0;
//   background-color: #f5f7fe;
// }

.style-title-input {
  font-size: 0.9rem;
  font-weight: 500;
}
.answerDone {
  color: #009cf7 !important;
}
.answerClarify {
  color: #ef7004 !important;
}
.answerNotFeedback {
  color: purple !important;
}
// Chưa trả lời
//replyStatus = UNREPLLIED
.UnReply {
  color: red !important;
}

// Đã trả lời
//đã trả lời nhưng chưa xem
//replyStatus = REPLLIED && acceptReplyStatus = NOTSEEN
.RepliedAndNotSeen {
  color: purple !important;
}

//đã trả lời và đã xem
//replyStatus = REPLLIED && acceptReplyStatus = SEEN
.RepliedAndSeen {
  color: purple !important;
}

//đã trả lời và đã đồng ý
//replyStatus = REPLLIED && acceptReplyStatus = AGREE
.RepliedAndAgree {
  // div {
  color: #009cf7 !important;
  // }
}
//đã trả lời và cần làm rõ
//replyStatus = REPLLIED && acceptReplyStatus = CLARIFY
.requestReplyNotSuccess {
  // div {
  color: #ef7004 !important;
}

// .header-full {
//   div {
//     table {
//       width: 160% !important;
//       border-spacing: 0;
//     }
//   }
// }
.scroll {
  max-height: 21rem;
}
</style>
