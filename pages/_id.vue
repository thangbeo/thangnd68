<template>
  <!-- <v-app :style="`margin-top: ${heightAppBar + heightHeader}px`">
    <v-app-bar
      id="appp-bar"
      fixed
      flat
      style="margin-top: 75px !important; background: white"
      height="115"
    >
      <div
        class="py-0"
        :class="
          breakpoint === 'desktop'
            ? 'container'
            : breakpoint === 'tablet'
            ? 'px-3'
            : ''
        "
      >
        <v-row class="ma-0">
          <v-col cols="12" class="pl-0 py-0 mx-2">
            <table v-if="breakpoint !== 'mobile'">
              <tr>
                <td>
                  <v-img
                    :max-width="breakpoint === 'desktop' ? '150' : '100'"
                    :src="field_logo"
                  ></v-img>
                </td>
                <td>
                  <div
                    class="font-weight-bold col-auto"
                    :class="breakpoint === 'desktop' ? 'fs-18 mt-5' : 'fs-16'"
                  >
                    Vấn đề: <span class="primary--text" v-html="title"></span>
                  </div>
                </td>
              </tr>
              <tr v-if="fileAttach">
                <td></td>
                <td>
                  <span class="ml-3">
                    \ (
                    <a
                      icon
                      class="black--text fs-14 textDeco"
                      :href="fileAttach && fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <v-icon color="primary">mdi-attachment</v-icon>
                    <span> </span>
                    )</span
                  >
                </td>
                <td></td>
              </tr>
            </table>
            <table v-else>
              <tr>
                <td>
                  <v-img max-width="120" :src="field_logo"></v-img>
                </td>
              </tr>
              <tr>
                <td style="max-width: 1200px">
                  <div
                    class="fs-18 font-weight-bold col-auto"
                    :style="
                      breakpoint === 'mobile'
                        ? 'height: 10rem'
                        : 'margin-top: 20px'
                    "
                  >
                    Vấn đề: <span class="primary--text" v-html="title"></span>
                  </div>
                </td>
              </tr>
              <tr v-if="fileAttach">
                <td>
                  <span class="">
                    (
                    <a
                      icon
                      class="black--text fs-14 textDeco"
                      :href="fileAttach && fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <v-icon color="primary">mdi-attachment</v-icon>
                    <span> </span>
                    )</span
                  >
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </div>
    </v-app-bar>

    <div
      class="py-0"
      :class="
        breakpoint === 'desktop'
          ? 'container'
          : breakpoint === 'tablet'
          ? 'px-3'
          : ''
      "
      v-if="heightAppBar"
      :style="`max-height: calc(100vh - ${heightAppBar + heightHeader}px);`"
      style="overflow-x: hidden"
    >
      <v-row class="ma-0">
        <v-col cols="12">
          <div>
            <v-card flat>
              <div class="py-1">
                <v-card-text class="pa-0">
                  <v-divider class="pb-3"></v-divider>
                  <div class="mx-3">
                    <div
                      v-if="!$isNullOrEmpty(reality)"
                      class="fw-500 fs-18 pb-1 primary--text"
                      id="thuc-trang"
                    >
                      Thực trạng:
                    </div>

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

                  <div class="mx-3">
                    <div
                      v-if="!$isNullOrEmpty(content)"
                      class="fw-500 fs-18 pb-3 primary--text"
                      id="giai-phap"
                    >
                      Giải pháp:
                    </div>
                    <div
                      class="pl-3"
                      v-if="!$isNullOrEmpty(content)"
                      v-html="content"
                    ></div>
                  </div>
                  <div class="mx-3">
                    <v-divider
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="my-3"
                    ></v-divider>
                    <div
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="fw-500 fs-18 pb-1 primary--text"
                      id="kinh-nghiem"
                    >
                      Kinh nghiệm quốc tế:
                    </div>
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
                  <div class="mx-3">
                    <div
                      v-if="!$isNullOrEmpty(note)"
                      class="fw-500 fs-18 pb-1 primary--text"
                      id="ghi-chu"
                    >
                      Ghi chú:
                    </div>
                    <div
                      class="pl-3 mb-5"
                      v-if="!$isNullOrEmpty(note)"
                      v-html="note"
                    ></div>
                  </div>

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
                </v-card-text>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-spacer></v-spacer>


      </v-row>
    </div>
  </v-app> -->

  <div>
    <client-only>
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="pa-0">
            <div>
              <v-card>
                <div class="py-1">
                  <v-card-title class="pt-1 pb-0 px-0 d-block" id="box_title">
                    <v-row class="ma-0 pl-4">
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
                      <v-col cols="9" md="12" class="pl-0" style="padding: 0">
                        <div class="d-flex">
                          <div>
                            <img style="width: 9rem" :src="field_logo" />
                          </div>
                          <div
                            class="font-weight-bold col-11 pl-3 aaaa"
                            :class="
                              breakpoint === 'desktop' ? 'fs-18 ' : 'fs-16'
                            "
                            style="
                              padding: 0;
                              max-width: 85%;
                              padding-bottom: 0 !important;
                            "
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
                    </v-row>
                    <div style="position: relative; background-color: #e5f0fe">
                      <div id="lst_tab">
                        <ul class="listTab">
                          Tag:
                          <li v-if="!$isNullOrEmpty(reality)">
                            <a
                              id="a_tab_one"
                              class="btn-tab pl-4 textDeco"
                              href="#"
                              style="color: #444; font-size: 18px"
                              @click.prevent="goSection('tab-one')"
                              >Thực trạng
                            </a>
                          </li>
                          <li v-if="!$isNullOrEmpty(content)">
                            <a
                              id="a_tab_two"
                              class="btn-tab textDeco"
                              style="color: #444; font-size: 18px"
                              href="#"
                              @click="goSection('tab-two')"
                            >
                              Giải pháp
                            </a>
                          </li>
                          <li v-if="!$isNullOrEmpty(internationalExp)">
                            <a
                              id="a_tab_three"
                              class="btn-tab textDeco"
                              href="#"
                              style="color: #444; font-size: 18px"
                              @click="goSection('tab-three')"
                            >
                              K.Nghiệm Q.Tế
                            </a>
                          </li>
                          <li v-if="!$isNullOrEmpty(note)">
                            <a
                              id="a_tab_four"
                              class="btn-tab textDeco"
                              href="#"
                              style="color: #444; font-size: 18px"
                              @click="goSection('tab-four')"
                            >
                              Ghi chú</a
                            >
                          </li>
                        </ul>
                      </div>
                      <div style="position: absolute; top: -1px; right: 10px">
                        <v-btn
                          class="btnSize"
                          color="primary"
                          depressed
                          href="#"
                          @click="setSize('1')"
                        >
                          <v-icon style="font-size: 26px !important"
                            >mdi-refresh-auto
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
                    </div>
                  </v-card-title>
                  <v-divider class="primary"></v-divider>
                  <v-card-text
                    id="content"
                    class="pl-5"
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
                      style="font-size: 18px"
                    >
                      Thực trạng:
                    </div>

                    <div
                      id="tab-one"
                      class="pl-3"
                      v-if="!$isNullOrEmpty(reality)"
                      v-html="reality"
                    ></div>

                    <v-divider
                      v-if="!$isNullOrEmpty(reality)"
                      class="my-3"
                    ></v-divider>

                    <div
                      v-if="!$isNullOrEmpty(content)"
                      class="fw-500 pb-3 primary--text"
                      id="content_title1"
                      style="font-size: 18px"
                    >
                      Giải pháp:
                    </div>
                    <div
                      id="tab-two"
                      class="pl-3"
                      v-if="!$isNullOrEmpty(content)"
                      v-html="content"
                    ></div>
                    <v-divider v-if="!$isNullOrEmpty(content)" class="my-3" />

                    <div
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="fw-500 pb-1 primary--text"
                      id="content_title2"
                      style="font-size: 18px"
                    >
                      Kinh nghiệm quốc tế:
                    </div>
                    <div
                      id="tab-three"
                      class="pl-3"
                      v-if="!$isNullOrEmpty(internationalExp)"
                      v-html="internationalExp"
                    ></div>

                    <v-divider
                      v-if="!$isNullOrEmpty(internationalExp)"
                      class="my-3"
                    ></v-divider>

                    <div
                      v-if="!$isNullOrEmpty(note)"
                      class="fw-500 pb-1 primary--text"
                      id="content_title3"
                      style="font-size: 18px"
                    >
                      Ghi chú:
                    </div>
                    <div
                      id="tab-four"
                      class="pl-3 mb-5"
                      v-if="!$isNullOrEmpty(note)"
                      v-html="note"
                    ></div>

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
      </div>
    </client-only>
  </div>
</template>
<script>
import Rules from '~/assets/configurations/Rules'

import Cookies from 'js-cookie'
export default {
  layout: 'defaultNoToken',
  transition: 'slide-x-reverse-transition',
  components: {},
  data() {
    return {
      Rules,
      title: null,
      listFileImage: [],
      note: null,
      internationalExp: null,
      content: null,
      reality: null,
      fileAttach: [],
      field_logo: null,
      heightAppBar: null,
      heightHeader: null,
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
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
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
  },
  mounted() {
    this.urlShare = window.location.href

    // setTimeout(() => {
    //   this.heightAppBar = document.getElementById('appp-bar').offsetHeight
    //   this.heightHeader = document.getElementById('header').offsetHeight
    // }, 500)
    this.$nextTick(function () {
      setTimeout(function () {
        let screenHeight = window.innerHeight
        console.log(screenHeight)
        let header = document.getElementById('header').offsetHeight
        let box_title = document.getElementById('box_title').offsetHeight
        let height = screenHeight - header - box_title - 15
        console.log(header)
        console.log(box_title)
        document.getElementById('content').style.maxHeight = height + 'px'
        document.getElementById('content').style.overflowX = 'hidden'

        // let li = document.querySelectorAll('.listTab li').length;
        // if(li==1) document.querySelectorAll('.listTab li')[0].style.display = 'none';
        // console.log(li)
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
          return 'tablet'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
      }
    },
  },
  methods: {
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
      document.getElementById('content_title') != undefined
        ? (document.getElementById('content_title').style.fontSize =
            this.sizeTitleCurrent + 'px')
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
          document.getElementById('tab-one') != undefined
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
    },
    urlText(value) {
      return ` http://103.147.34.20:10033/chi-tiet-van-de/${value}`
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

            this.comingTime = res.data.data.comingTime
            this.content = res.data.data.requestContent

            this.reality = res.data.data.reality
            this.internationalExp = res.data.data.internationalExp
            this.note = res.data.data.note

            this.fileAttach = res.data.data.fileAttachs

            this.requestLogs = res.data.data.requestLogs
            let departmentId = Cookies.get('departmentId')
            for (let i = 0; i < res.data.data.unitReplyRequests.length; i++) {
              let item = res.data.data.unitReplyRequests[i]
              if (item.unit.id == departmentId) {
                this.isReply = true
              }
            }
            this.userID = Cookies.get('userId')

            // this.requestAnswer()
          }
        })
    },

    back() {
      this.$router.push('/dashboard/danh-sach-van-de-nong')
    },

    close() {
      this.$store.commit('request/setDataDetailRequest', null)
      this.$router.push('/dashboard/danh-sach-van-de-nong')
    },
  },
}
</script>
<style lang="scss">
.btnSize {
  margin-right: 5px;
}
.blue-text {
  color: #347ada;
}
.fixed-header-desktop {
  position: fixed;
  top: 12vh;
  z-index: 2;
  background: white;
}
.fixed-header-tablet {
  position: fixed;
  top: 9.5vh;
  z-index: 2;
  background: white;
}
.fixed-header-mobile {
  position: fixed;
  top: 12vh;
  z-index: 2;
  background: white;
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
.v-toolbar__content {
  height: 115px !important;
}
.btnSize {
  height: 32px !important;
  width: 35px !important;
  min-width: 39px !important;
}
.btnSize i {
  font-size: 22px !important;
}
#box_title {
  padding-bottom: 0 !important;
}
</style>
