<template>
  <div>
    <client-only>
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="py-0 px-0">
            <div>
              <v-card>
                <div class="py-1 mx-4">
                  <v-card-title class="py-1 px-0 d-block" id="box_title">
                    <v-row class="ma-0">
                      <!-- <v-col class="col-2 pr-0">

                  </v-col> -->
                      <!-- <v-col cols="8" class="pr-0">
                    <div
                      class="fs-18 blue--text font-weight-bold"
                      v-html="title"
                    ></div>
                  </v-col> -->
                      <!-- <v-col class="col-auto px-0">


                    <div :id="`copy-text-${groupID}`" class="d-none">
                      {{ urlText(linhkUrl) }}
                    </div>
                  </v-col> -->
                      <!-- <v-col class="px-0 col-auto">
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="copy_text(`copy-text-${groupID}`)"
                            icon
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon color="red">mdi-content-duplicate</v-icon>
                          </v-btn>
                        </template>
                        <span>Sao chép đường đẫn</span>
                      </v-tooltip>
                    </div></v-col
                  > -->
                      <v-col
                        cols="9"
                        md="11"
                        class="pl-0"
                        style="padding-top: 0; padding-bottom: 0 !important"
                      >
                        <div class="d-flex" style="align-items: center">
                          <v-btn
                            v-if="!$isNullOrEmpty(NoCookies)"
                            @click="backHis"
                            icon
                            class="mr-3 btnBack"
                          >
                            <v-icon size="40" color="primary"
                              >mdi-arrow-left-circle</v-icon
                            >
                          </v-btn>
                          <div>
                            <img style="width: 8rem" :src="field_logo" />
                          </div>
                          <div
                            class="font-weight-bold col-12 pt-0"
                            :class="
                              breakpoint === 'desktop' ? 'fs-18 ' : 'fs-16'
                            "
                            style="max-width: 95%; padding-bottom: 0 !important"
                          >
                            Vấn đề:
                            <span
                              class="primary--text"
                              style="word-break: break-word"
                              v-html="title"
                            ></span>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" class="pt-0 borderBtDt">
                        <v-row>
                          <v-col cols="6" class="pb-2 tab-tagA">
                            <div id="lst_tab">
                              <ul
                                class="listTab"
                                style="padding-left: 0 !important"
                              >
                                Tag:
                                <li v-if="!$isNullOrEmpty(reality)">
                                  <a
                                    id="a_tab_one"
                                    class="btn-tab textDeco"
                                    style="color: #444"
                                    @click.prevent="goSection('tab-one')"
                                    >Thực trạng</a
                                  >
                                </li>
                                <li v-if="!$isNullOrEmpty(content)">
                                  <a
                                    id="a_tab_two"
                                    class="btn-tab textDeco"
                                    style="color: #444"
                                    @click="goSection('tab-two')"
                                  >
                                    Giải pháp</a
                                  >
                                </li>
                                <li v-if="!$isNullOrEmpty(internationalExp)">
                                  <a
                                    id="a_tab_three"
                                    class="btn-tab textDeco"
                                    style="color: #444"
                                    @click="goSection('tab-three')"
                                  >
                                    K.Nghiệm Q.Tế</a
                                  >
                                </li>
                                <li v-if="!$isNullOrEmpty(note)">
                                  <a
                                    id="a_tab_four"
                                    class="btn-tab"
                                    style="color: #444"
                                    @click="goSection('tab-four')"
                                  >
                                    Ghi chú</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </v-col>
                          <v-col cols="6" class="pb-2 pt-5">
                            <v-row>
                              <v-col class="6"></v-col>

                              <a
                                class="textDeco"
                                :href="`${urlText(linhkUrl)}`"
                                target="_blank"
                              >
                                <v-btn
                                  v-if="breakpoint === 'desktop'"
                                  color="#f7a534"
                                  class="white--text mr-2"
                                  depressed
                                  >xem trước</v-btn
                                >

                                <v-btn
                                  v-else
                                  small
                                  class="white--text mr-2"
                                  color="#f7a534"
                                  depressed
                                  >xem trước</v-btn
                                >
                              </a>

                              <a>
                                <v-btn
                                  v-if="breakpoint === 'desktop'"
                                  @click="copy_text(`copy-text-${groupID}`)"
                                  v-bind="attrs"
                                  v-on="on"
                                  color="primary"
                                  class="white--text textDeco"
                                  depressed
                                >
                                  Copy link
                                  <div
                                    :id="`copy-text-${groupID}`"
                                    class="d-none"
                                  >
                                    {{ urlText(linhkUrl) }}
                                  </div>
                                </v-btn>
                                <v-btn
                                  v-else
                                  @click="copy_text(`copy-text-${groupID}`)"
                                  v-bind="attrs"
                                  v-on="on"
                                  color="primary"
                                  class="white--text textDeco"
                                  depressed
                                  small
                                >
                                  Copy link

                                  <div
                                    :id="`copy-text-${groupID}`"
                                    class="d-none"
                                  >
                                    {{ urlText(linhkUrl) }}
                                  </div>
                                </v-btn>
                              </a>

                              <div class="pl-2">
                                <v-btn
                                  class="btnSize"
                                  color="primary"
                                  depressed
                                  href="#"
                                  @click="setSize('1')"
                                >
                                  <v-icon style="font-size: 26px !important">
                                    mdi-refresh-auto
                                  </v-icon>
                                </v-btn>
                                <v-btn
                                  class="btnSize"
                                  color="primary"
                                  depressed
                                  href="#"
                                  @click="setSize('3')"
                                >
                                  <v-icon> mdi-format-annotation-minus </v-icon>
                                </v-btn>
                                <v-btn
                                  class="btnSize"
                                  color="primary"
                                  depressed
                                  href="#"
                                  @click="setSize('2')"
                                >
                                  <v-icon> mdi-format-annotation-plus </v-icon>
                                </v-btn>
                              </div>
                              <!-- </template> -->
                              <!-- <span>Sao chép đường đẫn</span> -->
                              <!-- </v-tooltip> -->
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <!-- <div class="d-flex">
                      <div class="" v-html="title"></div>
                    </div> -->
                  </v-card-title>
                  <v-divider class="primary"></v-divider>
                  <v-card-text
                    id="content"
                    class="content"
                    :style="
                      breakpoint === 'desktop'
                        ? 'max-height: calc(100vh - 16rem); overflow-x: hidden'
                        : `max-height: calc(100vh - 24rem); overflow-x: hidden'`
                    "
                  >
                    <div
                      v-if="!$isNullOrEmpty(reality)"
                      class="fw-500 pb-1 primary--text"
                      id="content_title"
                    >
                      Thực trạng:
                    </div>
                    <div
                      class="ctTabs"
                      v-if="!$isNullOrEmpty(reality)"
                      v-html="reality"
                      id="tab-one"
                    >
                      <div
                        class="pl-3"
                        v-if="!$isNullOrEmpty(reality)"
                        v-html="reality"
                      ></div>
                    </div>
                    <v-divider
                      v-if="!$isNullOrEmpty(reality)"
                      class="my-3"
                    ></v-divider>
                    <!--                    <v-divider-->
                    <!--                      v-if="$isNullOrEmpty(content)"-->
                    <!--                      class="my-3"-->
                    <!--                    ></v-divider>-->

                    <div
                      v-if="!$isNullOrEmpty(content)"
                      class="fw-500 pb-3 primary--text"
                      id="content_title1"
                    >
                      Giải pháp:
                    </div>
                    <div
                      class="ctTabs"
                      v-if="!$isNullOrEmpty(content)"
                      v-html="content"
                      id="tab-two"
                    >
                      <div
                        class="pl-3"
                        v-if="!$isNullOrEmpty(content)"
                        v-html="content"
                      ></div>
                    </div>
                    <v-divider v-if="!$isNullOrEmpty(content)" class="my-3" />
                    <!--                    <v-divider-->
                    <!--                      v-if="$isNullOrEmpty(internationalExp)"-->
                    <!--                      class="my-3"-->
                    <!--                    ></v-divider>-->

                    <div
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="fw-500 pb-1 primary--text"
                      id="content_title2"
                    >
                      Kinh nghiệm quốc tế:
                    </div>
                    <div
                      class="ctTabs"
                      v-if="!$isNullOrEmpty(internationalExp)"
                      v-html="internationalExp"
                      id="tab-three"
                    >
                      <div
                        class="pl-3"
                        v-if="!$isNullOrEmpty(internationalExp)"
                        v-html="internationalExp"
                      ></div>
                    </div>
                    <v-divider
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="my-3"
                    ></v-divider>

                    <div
                      v-if="!$isNullOrEmpty(note)"
                      class="fw-500 pb-1 primary--text"
                      id="content_title3"
                    >
                      Ghi chú:
                    </div>
                    <div
                      class="ctTabs"
                      v-if="!$isNullOrEmpty(note)"
                      v-html="note"
                      id="tab-four"
                    >
                      <div
                        class="pl-3 mb-5"
                        v-if="!$isNullOrEmpty(note)"
                        v-html="note"
                      ></div>
                    </div>

                    <v-divider
                      v-if="!$isNullOrEmpty(note)"
                      class="my-3"
                    ></v-divider>

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
                    <!--                    <v-divider class="py-3"></v-divider>-->
                    <!-- <div
                      v-if="fileAttach != null && breakpoint !== 'desktop'"
                      class="pb-3"
                    >
                      <span class="ml-3">
                        (
                        <a
                          icon
                          :href="fileAttach.url"
                          style="font-style: italic"
                        >
                          File đính kèm
                        </a>
                        <span>
                          <v-icon color="primary">mdi-attachment</v-icon>
                        </span>
                        )</span
                      >
                    </div> -->
                    <v-divider
                      v-if="(listFileImage || []).length !== 0"
                      class="mb-2 mt-4"
                    ></v-divider>
                    <div
                      class="ml-2 mt-4"
                      v-if="(fileAttach || []).length !== 0"
                    >
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
                    <!-- <div class="ml-2" v-if="(fileAttach || []).length !== 0">
                      <div v-for="i in fileAttach" :key="i.id">
                        <a
                          icon
                          target="_blank"
                          class="fs-14 textDeco"
                          style="font-style: italic"
                          :href="i.url"
                        >
                          <span>{{ i.fileName }}</span>
                          <v-icon v-if="i.type === 'docx'"> </v-icon>
                          <v-icon v-else-if="i.type === 'pdf'">
                            mdi-file-pdf-box
                          </v-icon>
                          <v-icon v-else-if="i.type === 'xlxs'"> </v-icon>
                          <v-icon v-else-if="i.type === 'png'"> </v-icon>
                          <v-icon v-else-if="i.type === 'jpeg'"> </v-icon>
                          <v-icon v-else-if="i.type === 'jpg'"> </v-icon>
                        </a>
                      </div>
                    </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </div>
          </v-col>
          <!--          <v-col-->
          <!--            v-if="acceptReplyStatus !== 'ARGEE' || showHistory"-->
          <!--            class="pa-0 col-12 col-md-12 pr-2"-->
          <!--          >-->
          <!--            <CardGlobal class="mt-2" id="his_problem_hot">-->
          <!--              <v-row class="ma-0 pb-2">-->
          <!--                <v-col-->
          <!--                  class="col-auto pb-1"-->
          <!--                  style="font-size: 14pt; font-weight: 500"-->
          <!--                  >Quá trình xử lý vấn đề nóng</v-col-->
          <!--                >-->
          <!--              </v-row>-->
          <!--              <PerfectScrollbar :options="{ swipeEasing: true }" class="scroll">-->
          <!--                <v-row class="ma-0" no-gutters>-->
          <!--                  <v-col-->
          <!--                    class="px-5"-->
          <!--                    cols="12"-->
          <!--                    v-for="(itemLog, indexLog) in requestLogs"-->
          <!--                    :key="`log-&#45;&#45;${indexLog}`"-->
          <!--                  >-->
          <!--                    <v-divider v-if="indexLog == 0"></v-divider>-->
          <!--                    <div class="py-1">-->
          <!--                      {{ itemLog.createTime }}: {{ itemLog.fullName }}-->
          <!--                      {{ itemLog.content }}-->
          <!--                    </div>-->
          <!--                    <v-divider></v-divider>-->
          <!--                  </v-col>-->
          <!--                </v-row>-->
          <!--              </PerfectScrollbar>-->
          <!--            </CardGlobal>-->
          <!--          </v-col>-->
        </v-row>

        <v-row class="ma-0">
          <v-spacer></v-spacer>

          <!-- <v-col
        v-if="
          $checkRole(
            Rules.System.list_problem.actions.LEADING_IDEAS,
            Rules.System.list_problem.id
          )
        "
        class="col-auto pr-0"
      >
        <v-btn depressed class="primary text-none" @click="openClarify = true">
          Ý kiến chỉ đạo</v-btn
        >
      </v-col> -->

          <!-- <v-col class="col-auto pr-0">
            <v-btn
              v-if="!$isNullOrEmpty(NoCookies)"
              depressed
              class="primary text-none"
              @click="close"
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
          @Success="detailItem"
        ></Clarify>

        <InputReasonUnit
          :open="openDialogInputReasonUnit"
          @toggle="openDialogInputReasonUnit = !openDialogInputReasonUnit"
          @Success="detailItem"
        ></InputReasonUnit>
      </div>
    </client-only>
  </div>
</template>
<script>
import Rules from '~/assets/configurations/Rules'
import AdditionalReply from '~/components/danh-sach-kien-nghi/chi-tiet/AdditionalReply.vue'
import InputReason from '~/components/danh-sach-kien-nghi/chi-tiet/InputReason.vue'
import UpdateReplyContent from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateReplyContent.vue'
import UpdateClarify from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateClarify.vue'
import moment from 'moment'
import Clarify from '~/components/van-de-nong/chi-tiet/Clarify.vue'
import jsCookie from 'js-cookie'
import RepRequest from '~/components/danh-sach-kien-nghi/chi-tiet/RepRequest.vue'
import ConfirmRequest from '~/components/danh-sach-kien-nghi/chi-tiet/ConfirmRequest.vue'
import InputReasonUnit from '~/components/van-de-nong/chi-tiet/InputReasonUnit.vue'
import APIs from '~/assets/configurations/API_Config'
import CardGlobal from '~/components/CardGlobal.vue'
import RequestCoordination from '~/components/danh-sach-kien-nghi/chi-tiet/RequestCoordination.vue'
import Cookies from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    Clarify,
    RepRequest,
    UpdateReplyContent,
    UpdateClarify,
    ConfirmRequest,
    InputReason,
    InputReasonUnit,
    CardGlobal,
    RequestCoordination,
    AdditionalReply,
  },
  data() {
    return {
      APIs,
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
      field_logo: null,
      fieldThemeName: null,
      period: null,
      session: null,
      groupID: null,
      Rules,
      listFileImage: [],
      reality: null,
      internationalExp: null,
      note: null,
      linhkUrl: null,
      NoCookies: null,
      sizeDefault: 14,
      sizeCurrent: 14,
      lineHeightDefault: 22,
      lineHeightCurrent: 22,
      sizeTitleDefault: 18,
      sizeTitleCurrent: 18,
      tagTitle: 18,
      tagTitleDefault: 18,
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
  created() {
    this.NoCookies = Cookies.get('token')
    this.linhkUrl = this.$route.params.id
    let groupId = this.$route.params.id

    groupId = groupId.split('-')
    groupId = groupId[groupId.length - 1]
    if (groupId.slice(0, 1) === 'n') {
      let url = this.$route.params.id
      let arrTitle = url.split('-')
      this.groupID = arrTitle[arrTitle.length - 1]
        .replace('n', '')
        .replace('.html', '')
    }
    this.detailItem()
    this.setColorSearch()
  },
  mounted() {
    this.urlShare = window.location.href
    this.$nextTick(function () {
      setTimeout(function () {
        let screenHeight = window.innerHeight
        console.log(screenHeight)
        // let his_problem_hot = document.getElementById('his_problem_hot').offsetHeight
        let header = document.getElementById('header').offsetHeight
        let box_title = document.getElementById('box_title').offsetHeight
        // let box_all = document.getElementById('box_content').offsetHeight
        // let box_all = document.getElementById('box_content').offsetHeight
        let height = screenHeight - header - box_title - 30
        console.log(screenHeight)
        console.log(header)
        console.log(box_title)
        console.log(height)
        document.getElementById('content').style.maxHeight = height + 'px'
        document.getElementById('content').style.overflowX = 'hidden'
      }, 1000)
    })
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
  },
  methods: {
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
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
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
    setColorSearch() {
      console.log('search: ' + this.$store.state.request.contentRequest)

      let text = this.$store.state.request.contentRequest
      text = this.$isNullOrEmpty(text) ? '' : text.trim()
      if (text == '') return

      setTimeout(() => {
        let elementToBeSearched = document.querySelector('.content')
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

    setSize(operation) {
      if (operation == 2) {
        this.sizeCurrent += 1
        this.lineHeightCurrent += 1
        this.sizeTitleCurrent += 1
        this.tagTitle += 1
      } else if (operation == 3) {
        this.sizeCurrent -= 1
        this.lineHeightCurrent -= 1
        this.sizeTitleCurrent -= 1
        this.tagTitle -= 1
      } else {
        this.sizeCurrent = this.sizeDefault
        this.lineHeightCurrent = this.lineHeightDefault
        this.sizeTitleCurrent = this.sizeTitleDefault
        this.tagTitle = this.tagTitleDefault
      }
      document.getElementById('content') != undefined
        ? (document.getElementById('content').style.fontSize =
            this.sizeCurrent + 'px')
        : ''
      document.getElementById('content') != undefined
        ? (document.getElementById('content').style.lineHeight =
            this.lineHeightCurrent + 'px')
        : ''
      document.getElementById('a_tab_one') != undefined
        ? (document.getElementById('a_tab_one').style.fontSize =
            this.tagTitle + 'px ')
        : ''
      document.getElementById('a_tab_two') != undefined
        ? (document.getElementById('a_tab_two').style.fontSize =
            this.tagTitle + 'px')
        : ''
      document.getElementById('a_tab_three') != undefined
        ? (document.getElementById('a_tab_three').style.fontSize =
            this.tagTitle + 'px')
        : ''
      document.getElementById('a_tab_four') != undefined
        ? (document.getElementById('a_tab_four').style.fontSize =
            this.tagTitle + 'px')
        : ''
      console.log('111')
      document.getElementById('content_title') != undefined
        ? (document.getElementById('content_title').style.fontSize =
            this.sizeTitleCurrent + 'px !important')
        : ''
      document.getElementById('content_title1') != undefined
        ? (document.getElementById('content_title1').style.fontSize =
            this.sizeTitleCurrent + 'px')
        : ''
      document.getElementById('content_title2') != undefined
        ? (document.getElementById('content_title2').style.fontSize =
            this.sizeTitleCurrent + 'px')
        : ''
      document.getElementById('content_title3') != undefined
        ? (document.getElementById('content_title3').style.fontSize =
            this.sizeTitleCurrent + 'px')
        : ''
    },

    goSection(value) {
      let top = 0
      let color = '#2196f3'
      let colorDefault = '#000'
      document.getElementById('a_tab_one') != undefined
        ? (document.getElementById('a_tab_one').style.color = colorDefault)
        : ''
      document.getElementById('a_tab_two') != undefined
        ? (document.getElementById('a_tab_two').style.color = colorDefault)
        : ''
      document.getElementById('a_tab_three') != undefined
        ? (document.getElementById('a_tab_three').style.color = colorDefault)
        : ''
      document.getElementById('a_tab_four') != undefined
        ? (document.getElementById('a_tab_four').style.color = colorDefault)
        : ''
      if (value == 'tab-one') {
        top = 0
        document.getElementById('a_tab_one').style.color = color
      } else if (value == 'tab-two') {
        top =
          document.getElementById('a_tab_one') != undefined
            ? document.getElementById('tab-one').offsetHeight + 55
            : 0
        document.getElementById('a_tab_two').style.color = color
      } else if (value == 'tab-three') {
        top =
          document.getElementById('tab-one').offsetHeight +
          document.getElementById('tab-two').offsetHeight +
          130
        document.getElementById('a_tab_three').style.color = color
      } else if (value == 'tab-four') {
        top =
          document.getElementById('tab-one').offsetHeight +
          document.getElementById('tab-two').offsetHeight +
          document.getElementById('tab-three').offsetHeight +
          150
        document.getElementById('a_tab_four').style.color = color
      }
      console.log(top)
      document.getElementById('content').scrollTo({
        top: top,
        left: 0,
        behavior: 'smooth',
      })
      // document.getElementById('content').scrollTo({
      //   top: top,
      //   left: 0,
      //   behavior: 'smooth'
      // });
    },

    backHis() {
      // this.$store.commit('utilitiesState/setContentFillter', null)
      window.history.back()
      this.$store.commit(
        'utilitiesState/setProblemNameFillter',
        this.$store.state.utilitiesState.problemNameFillter
      )
      this.$store.commit(
        'utilitiesState/setRequestSolution',
        this.$store.state.utilitiesState.requestSolution
      )
      this.$store.commit(
        'utilitiesState/setRequestReality',
        this.$store.state.utilitiesState.requestReality
      )
    },
    urlText(value) {
      // return `https://csdlvandenong.mic.xtel.vn/${value}`
      // return `http://172.19.32.1:10031/${value}`
      // return `http://172.16.6.169:10031/${value}`
      return `${APIs.domain}${value}`
    },
    copy_text(elementId) {
      const aux = document.createElement('input')

      // Assign it the value of the specified element
      const str = document.getElementById(elementId).innerHTML
      aux.setAttribute('value', (str || '').trim())

      // Append it to the body
      document.body.appendChild(aux)

      // Highlight its content
      aux.select()

      // Copy the highlighted text
      document.execCommand('copy')

      // Remove it from the body
      document.body.removeChild(aux)

      this.$showSuccess(this, 'Sao chép đường đẫn thành công')
    },
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.list_problem.id,
        actionId
      )
      return isAllowed
    },
    detailItem() {
      this.$store
        .dispatch('request/requestHotIssueDetailByTransId', {
          transId: this.groupID,
        })
        .then((res) => {
          if (!res.error) {
            if ((res.data.data.images || []).length !== 0) {
              this.listFileImage = res.data.data.images
            }
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
              if (!this.$isNullOrEmpty(res.data.data.field.logoNgang)) {
                this.field_logo = res.data.data.field.logoNgang
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

            // this.acceptReplyStatus = res.data.data.acceptReplyStatus

            this.comingTime = res.data.data.comingTime
            this.content = res.data.data.requestContent

            this.reality = res.data.data.reality
            this.internationalExp = res.data.data.internationalExp
            this.note = res.data.data.note

            this.fileAttach = res.data.data.fileAttachs

            this.requestLogs = res.data.data.requestLogs
            let departmentId = jsCookie.get('departmentId')
            for (let i = 0; i < res.data.data.unitReplyRequests.length; i++) {
              let item = res.data.data.unitReplyRequests[i]
              if (item.unit.id == departmentId) {
                this.isReply = true
              }
            }
            this.userID = jsCookie.get('userId')

            // this.requestAnswer()
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
      this.$router.push('/dashboard/danh-sach-van-de-nong')
    },
    clarify() {
      this.openClarify = true
    },
    close() {
      this.$store.commit('request/setDataDetailRequest', null)
      this.$router.push('/dashboard/danh-sach-van-de-nong')
    },
  },
}
</script>
<style lang="scss">
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

/*.tab-tagA{*/
/*  position: relative;*/
/*}*/
/*  .tab-tagA a::after{*/
/*    content: "|";*/
/*    position: absolute;*/
/*    top: 0;*/
/*    left: 0;*/
/*  }*/

.btnBack {
  padding-bottom: 11px;
}

.ctTabs {
  position: relative;
}
// .ctTabs::after {
//   content: '';
//   position: absolute;
//   left: 0;
//   bottom: -5px;
//   width: 100%;
//   height: 1px;
//   background-color: #ccc;
// }
.borderBtDt {
  padding-bottom: 2px !important;
}
</style>
