<template>
  <div v-if="!$isNullOrEmpty($store.state.request.dataDetailRequest)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text d-flex align-center"
      >
        <v-btn @click="back" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Thông tin kiến nghị
        <v-spacer></v-spacer>

        <v-switch
          v-if="
            $store.state.request.dataDetailRequest.acceptReplyStatus ==
              'ARGEE' &&
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
          label="Hiển thị quá trình xử lý kiến nghị"
        ></v-switch>
      </div>
    </CardGlobal>

    <v-row class="ma-0">
      <v-col
        :cols="
          $store.state.request.dataDetailRequest.acceptReplyStatus !==
            'ARGEE' || showHistory
            ? breakpoint == 'desktop'
              ? 8
              : 12
            : 12
        "
        class="py-0 pl-0"
        :class="{
          'pr-0':
            $store.state.request.dataDetailRequest.acceptReplyStatus == 'ARGEE',
          'pr-2':
            $store.state.request.dataDetailRequest.acceptReplyStatus !==
              'ARGEE' || showHistory,
        }"
      >
        <div v-for="(item, index) in dataSuccess" :key="`key-item-${index}`">
          <CardGlobal class="mt-2" v-if="index == 0">
            <div
              style="font-weight: 500"
              class="fs-18 pb-2"
              v-if="breakpoint !== 'desktop'"
            >
              Lần {{ index + 1 }}:
            </div>
            <div class="py-1 mx-4">
              <div class="pb-0 pb-lg-3 d-flex">
                <span style="font-size: 1rem">
                  <span style="font-weight: 500"> NỘI DUNG KIẾN NGHỊ</span> -
                  <span
                    style="color: #c30404"
                    v-if="!$isNullOrEmpty(item[0].requestObjectType)"
                  >
                    <span v-if="$dtqlNotShow()">
                      {{ item[0].requestObjectType.name }}</span
                    >
                  </span>
                  <span style="color: #c30404">
                    {{ item[0].objectRequestName }}
                  </span>
                  <span
                    style="color: black; font-style: italic; font-size: 0.9rem"
                  >
                    gửi kiến nghị
                  </span>
                  <span class="mx-1"> -</span>
                  <span class="fs-12"
                    >{{
                      moment(item[0].comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                        'DD/MM/YYYY HH:mm'
                      )
                    }},</span
                  >
                  <span
                    style="color: #c30404"
                    v-if="
                      item[0].unitReplyRequests && item[0].unitReplyRequests[0]
                    "
                  >
                    {{ item[0].unitReplyRequests[0].unit.name }}
                  </span>
                  <span
                    style="color: black; font-style: italic; font-size: 0.9rem"
                    >chủ trì
                  </span>
                </span>

                <span
                  class="ml-3"
                  v-if="item[0].fileAttach != null && breakpoint === 'desktop'"
                >
                  (
                  <a
                    icon
                    :href="item[0].fileAttach.url"
                    style="font-style: italic"
                  >
                    File đính kèm
                  </a>
                  <span>
                    <v-icon color="primary">mdi-attachment</v-icon>
                  </span>
                  )</span
                >
                <v-spacer></v-spacer>

                <span
                  v-if="dataSuccess.length >= 2 && breakpoint == 'desktop'"
                  style="font-weight: 500"
                  class="fs-18"
                  >Lần {{ index + 1 }}</span
                >
              </div>
              <div
                v-if="item[0].fileAttach != null && breakpoint !== 'desktop'"
                class="pb-3"
              >
                <span class="ml-3">
                  (
                  <a
                    icon
                    :href="item[0].fileAttach.url"
                    style="font-style: italic"
                  >
                    File đính kèm
                  </a>
                  <span>
                    <v-icon color="primary">mdi-attachment</v-icon>
                  </span>
                  )</span
                >
              </div>

              <v-divider></v-divider>
              <div class="pt-3" v-if="item[0].requestContent != null">
                <span class="fs-14 black--text" style="font-weight: 700">
                  Nội dung
                  <span v-if="!$isNullOrEmpty(item[0].requestObjectType)">
                    (

                    <span v-if="$dtqlNotShow()">
                      {{ item[0].requestObjectType.name }}</span
                    >
                    {{ item[0].objectRequestName }}
                    <!-- {{ item[0] }} -->

                    <span
                      v-if="
                        item[0].requestObjectType.name == 'Đại biểu Quốc hội' &&
                        item[0].requestUnit != null
                      "
                    >
                      - Đoàn ĐBQH {{ item[0].requestUnit.fullName }}
                    </span>
                  </span>
                  <span class="mx-1" v-if="item[0].comingTime != null"> -</span>
                  <span v-if="item[0].comingTime != null">{{
                    moment(item[0].comingTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm'
                    )
                  }}</span
                  >):
                </span>
                <div
                  class="pb-3 px-3"
                  style="font-size: 11pt; color: #000000eb"
                  v-html="
                    breakpoint == 'desktop'
                      ? item[0].requestContent.replaceAll(
                          `<p`,
                          `<p class='ma-0'`
                        )
                      : item[0].requestContent
                  "
                ></div>
              </div>
              <v-divider class="pb-3"></v-divider>

              <div v-if="!$isNullOrEmpty(item[1])">
                <span
                  class="fs-14 black--text"
                  style="font-weight: 700"
                  :class="{
                    answerDone: item[0].replyStatus == 'ARGEE',
                    answerClarify: item[0].replyStatus == 'CLARIFY',
                    answerNotFeedback:
                      item[0].replyStatus !== 'CLARIFY' &&
                      item[0].replyStatus !== 'ARGEE',
                  }"
                >
                  Trả lời
                  <span v-if="item[1].answerPositionName">
                    ({{ item[1].answerPositionName }}
                    {{ item[1].answerUnitName }}
                  </span>
                  <span v-else> ({{ item[1].answerUnitName }} </span>
                  <span class="mx-1" v-if="item[1].createTime != null"> -</span>
                  <span v-if="item[1].createTime != null">{{
                    moment(item[1].createTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm'
                    )
                  }}</span
                  >):
                </span>
                <span
                  class="ml-3"
                  v-if="item[1].fileAttach != null && breakpoint == 'desktop'"
                >
                  (
                  <a
                    icon
                    :href="item[1].fileAttach.url"
                    style="font-style: italic"
                  >
                    File đính kèm
                  </a>
                  <span>
                    <v-icon color="primary">mdi-attachment</v-icon>
                  </span>
                  )</span
                >
                <div
                  v-if="item[1].fileAttach != null && breakpoint !== 'desktop'"
                  class="pb-3"
                >
                  <span class="ml-3">
                    (
                    <a
                      icon
                      :href="item[1].fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <span>
                      <v-icon color="primary">mdi-attachment</v-icon>
                    </span>
                    )</span
                  >
                </div>
                <div
                  v-if="!$isNullOrEmpty(item[1].answerContent)"
                  class="pb-3 px-3"
                  style="font-size: 11pt; color: #000000eb"
                  v-html="
                    breakpoint == 'desktop'
                      ? item[1].answerContent.replaceAll(
                          `<p`,
                          `<p class='ma-0'`
                        )
                      : item[1].answerContent
                  "
                ></div>
              </div>
              <!--  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[1] &&
                  $store.state.request.dataDetailRequest.requestAccountId ==
                    userID &&
                  dataSuccess.length == 1 &&
                  index == 0 -->
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[1] &&
                  ($store.state.request.dataDetailRequest.allowAgreeOnRequest ||
                    $store.state.request.dataDetailRequest
                      .allowClarifyOnRequest) &&
                  dataSuccess.length == 1 &&
                  index == 0
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :loading="loaddingConfirm"
                  :ripple="false"
                  @click="confirmReplyCOntent(item[1])"
                  >Đồng ý</v-btn
                >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="funcOpenClarify(item[1])"
                  >Cần làm rõ</v-btn
                >
              </div>
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[0] &&
                  !item[1] &&
                  dataSuccess.length == 1 &&
                  (($store.state.request.dataDetailRequest.answer &&
                    $store.state.request.dataDetailRequest.replyStatus ===
                      'UN_REPLY') ||
                    ($store.state.request.dataDetailRequest.answer &&
                      $store.state.request.dataDetailRequest
                        .acceptReplyStatus === 'CLARIFY'))
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="openReply = true"
                  >Trả lời</v-btn
                >
              </div>
              <v-divider
                v-if="aditionalList.length > 0 && dataSuccess.length == 1"
                class="mb-3"
              ></v-divider>
              <div v-if="dataSuccess.length == 1">
                <div
                  class="mx-4"
                  v-for="(item, indexDau) in aditionalList"
                  :key="`index--${indexDau}--key`"
                >
                  <span class="fs-14 black--text" style="font-weight: 700">
                    Trả lời bổ sung
                    <span v-if="item.answerPositionName">
                      ({{ item.answerPositionName }}
                      {{ item.answerUnitName }}
                    </span>
                    <span v-else> ({{ item.answerUnitName }} </span>
                    <span class="mx-1" v-if="item.createTime != null"> -</span>
                    <span v-if="item.createTime != null">{{
                      moment(item.createTime, 'DD/MM/YYYY HH:mm:ss').format(
                        'DD/MM/YYYY HH:mm'
                      )
                    }}</span
                    >):
                  </span>
                  <span
                    class="ml-3"
                    v-if="
                      !$isNullOrEmpty(item.fileAttach) &&
                      breakpoint == 'desktop'
                    "
                  >
                    (
                    <a
                      icon
                      :href="item.fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <span>
                      <v-icon color="primary">mdi-attachment</v-icon>
                    </span>
                    )</span
                  >
                  <div
                    v-if="
                      !$isNullOrEmpty(item.fileAttach) &&
                      breakpoint !== 'desktop'
                    "
                    class="pb-3"
                  >
                    <span class="ml-3">
                      (
                      <a
                        icon
                        :href="item.fileAttach.url"
                        style="font-style: italic"
                      >
                        File đính kèm
                      </a>
                      <span>
                        <v-icon color="primary">mdi-attachment</v-icon>
                      </span>
                      )</span
                    >
                  </div>

                  <div
                    v-if="!$isNullOrEmpty(item.answerContent)"
                    class="pb-3 px-3"
                    style="font-size: 11pt; color: #000000eb"
                    v-html="
                      breakpoint == 'desktop'
                        ? item.answerContent.replaceAll(`<p`, `<p class='ma-0'`)
                        : item.answerContent
                    "
                  ></div>
                  <div
                    class="mt-2 primary--text"
                    v-if="
                      indexDau == aditionalList.length - 1 &&
                      $store.state.request.dataDetailRequest.answer
                    "
                  >
                    <v-btn
                      depressed
                      small
                      class="primary"
                      :ripple="false"
                      @click="openAdditionalReply = true"
                      >Cập nhật trả lời kiến nghị</v-btn
                    >
                  </div>
                </div>
              </div>
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus ===
                    'ARGEE' &&
                  item[1] &&
                  $store.state.request.dataDetailRequest.answer &&
                  index == dataSuccess.length - 1 &&
                  aditionalList.length == 0
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="openAdditionalReply = true"
                  >Cập nhật trả lời kiến nghị</v-btn
                >
              </div>
              <v-row
                class="ma-0 px-3 py-2"
                no-gutters
                v-if="item[1] && idItemReply === item[1].id"
              >
                <v-col class="pa-0" cols="12">
                  <vue-editor
                    v-model="clarifyContent"
                    @input="clarifyContentError = []"
                  >
                  </vue-editor>
                  <div
                    class="fs-12 red--text mx-3"
                    v-if="!$isNullOrEmpty(clarifyContentError)"
                  >
                    {{ clarifyContentError[0] }}
                  </div>
                </v-col>

                <v-col class="pa-0 d-flex justify-end" cols="12">
                  <v-btn
                    small
                    class="secondary mt-2 text-none mr-2"
                    @click="idItemReply = null"
                  >
                    Hủy bỏ
                  </v-btn>
                  <v-btn
                    small
                    :loading="loaddingClarify"
                    class="primary mt-2 text-none"
                    @click="requestAnswerClarifyPost"
                  >
                    Gửi nội dung cần làm rõ
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </CardGlobal>

          <CardGlobal
            class="mt-2"
            v-if="dataSuccess.length > 1 && index !== 0 && index <= 2"
          >
            <div
              style="font-weight: 500"
              class="fs-18 pb-2"
              v-if="breakpoint !== 'desktop'"
            >
              Lần {{ index + 1 }}:
            </div>
            <div class="py-1 mx-4">
              <div class="pb-3 d-flex">
                <span style="font-size: 1rem">
                  <span style="font-weight: 500"> Đề nghị làm rõ</span> -

                  <span style="color: #c30404">
                    {{ item[0].questionerName }}
                  </span>
                  <span
                    style="color: black; font-style: italic; font-size: 0.9rem"
                  >
                    đề nghị làm rõ
                  </span>
                  <span class="mx-1"> -</span>
                  <span class="fs-12"
                    >{{
                      moment(item[0].createTime, 'DD/MM/YYYY HH:mm:ss').format(
                        'DD/MM/YYYY HH:mm'
                      )
                    }},</span
                  >
                </span>
                <v-spacer></v-spacer>
                <span
                  style="font-weight: 500"
                  class="fs-18"
                  v-if="breakpoint === 'desktop'"
                  >Lần {{ index + 1 }}</span
                >
              </div>
              <v-divider></v-divider>
              <div class="pt-3" v-if="item[0].questionContent != null">
                <span class="fs-14 black--text" style="font-weight: 700">
                  Nội dung
                  <span v-if="!$isNullOrEmpty(item[0].questionerName)">
                    ({{ item[0].questionerName }}
                  </span>
                  <span class="mx-1" v-if="item[0].createTime != null"> -</span>
                  <span v-if="item[0].createTime != null">{{
                    moment(item[0].createTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm'
                    )
                  }}</span
                  >):
                </span>
                <div
                  v-if="$isNullOrEmpty(item[0].answerContent)"
                  class="pb-3 px-3"
                  style="font-size: 11pt; color: #000000eb"
                  v-html="
                    breakpoint == 'desktop'
                      ? item[0].questionContent.replaceAll(
                          `<p`,
                          `<p class='ma-0'`
                        )
                      : item[0].questionContent
                  "
                ></div>
                <div
                  v-else
                  class="pb-3 px-3"
                  style="font-size: 11pt; color: #000000eb"
                  v-html="
                    breakpoint == 'desktop'
                      ? item[0].answerContent.replaceAll(
                          `<p`,
                          `<p class='ma-0'`
                        )
                      : item[0].answerContent
                  "
                ></div>
              </div>
              <v-divider class="pb-3"></v-divider>

              <div v-if="!$isNullOrEmpty(item[1])">
                <span
                  class="fs-14 black--text"
                  style="font-weight: 700"
                  :class="{
                    answerDone: item[0].replyStatus == 'ARGEE',
                    answerClarify: item[0].replyStatus == 'CLARIFY',
                    answerNotFeedback:
                      item[0].replyStatus !== 'CLARIFY' &&
                      item[0].replyStatus !== 'ARGEE',
                  }"
                >
                  Trả lời
                  <span v-if="item[1].answerPositionName">
                    ({{ item[1].answerPositionName }}
                    {{ item[1].answerUnitName }}
                  </span>
                  <span v-else> ({{ item[1].answerUnitName }} </span>
                  <span class="mx-1" v-if="item[1].createTime != null"> -</span>
                  <span v-if="item[1].createTime != null">{{
                    moment(item[1].createTime, 'DD/MM/YYYY HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm'
                    )
                  }}</span
                  >):
                </span>
                <span
                  class="ml-3"
                  v-if="item[1].fileAttach != null && breakpoint == 'desktop'"
                >
                  (
                  <a
                    icon
                    :href="item[1].fileAttach.url"
                    style="font-style: italic"
                  >
                    File đính kèm
                  </a>
                  <span>
                    <v-icon color="primary">mdi-attachment</v-icon>
                  </span>
                  )</span
                >
                <div
                  v-if="item[1].fileAttach != null && breakpoint !== 'desktop'"
                  class="pb-3"
                >
                  <span class="ml-3">
                    (
                    <a
                      icon
                      :href="item[1].fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <span>
                      <v-icon color="primary">mdi-attachment</v-icon>
                    </span>
                    )</span
                  >
                </div>
                <div
                  v-if="!$isNullOrEmpty(item[1].answerContent)"
                  class="pb-3 px-3"
                  style="font-size: 11pt; color: #000000eb"
                  v-html="
                    breakpoint == 'desktop'
                      ? item[1].answerContent.replaceAll(
                          `<p`,
                          `<p class='ma-0'`
                        )
                      : item[1].answerContent
                  "
                ></div>
              </div>
              <v-divider
                v-if="dataSuccess.length > 1 && aditionalList.length > 0"
                class="mb-3"
              ></v-divider>
              <div
                v-if="dataSuccess.length > 1 && index == dataSuccess.length - 1"
              >
                <div
                  class="mx-4"
                  v-for="(item, indexItemCUoi) in aditionalList"
                  :key="`index--${indexItemCUoi}--key`"
                >
                  <span class="fs-14 black--text" style="font-weight: 700">
                    Trả lời bổ sung
                    <span v-if="item.answerPositionName">
                      ({{ item.answerPositionName }}
                      {{ item.answerUnitName }}
                    </span>
                    <span v-else> ({{ item.answerUnitName }} </span>
                    <span class="mx-1" v-if="item.createTime != null"> -</span>
                    <span v-if="item.createTime != null">{{
                      moment(item.createTime, 'DD/MM/YYYY HH:mm:ss').format(
                        'DD/MM/YYYY HH:mm'
                      )
                    }}</span
                    >):
                  </span>
                  <span
                    class="ml-3"
                    v-if="
                      !$isNullOrEmpty(item.fileAttach) &&
                      breakpoint == 'desktop'
                    "
                  >
                    (
                    <a
                      icon
                      :href="item.fileAttach.url"
                      style="font-style: italic"
                    >
                      File đính kèm
                    </a>
                    <span>
                      <v-icon color="primary">mdi-attachment</v-icon>
                    </span>
                    )</span
                  >
                  <div
                    v-if="
                      !$isNullOrEmpty(item.fileAttach) &&
                      breakpoint !== 'desktop'
                    "
                    class="pb-3"
                  >
                    <span class="ml-3">
                      (
                      <a
                        icon
                        :href="item.fileAttach.url"
                        style="font-style: italic"
                      >
                        File đính kèm
                      </a>
                      <span>
                        <v-icon color="primary">mdi-attachment</v-icon>
                      </span>
                      )</span
                    >
                  </div>

                  <div
                    v-if="!$isNullOrEmpty(item.answerContent)"
                    class="pb-3 px-3"
                    style="font-size: 11pt; color: #000000eb"
                    v-html="
                      breakpoint == 'desktop'
                        ? item.answerContent.replaceAll(`<p`, `<p class='ma-0'`)
                        : item.answerContent
                    "
                  ></div>
                  <div
                    class="mt-2 primary--text"
                    v-if="
                      indexItemCUoi == aditionalList.length - 1 &&
                      $store.state.request.dataDetailRequest.answer
                    "
                  >
                    <v-btn
                      depressed
                      small
                      class="primary"
                      :ripple="false"
                      @click="openAdditionalReply = true"
                      >Cập nhật trả lời kiến nghị</v-btn
                    >
                  </div>
                </div>
              </div>
              <!--  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[1] &&
                  $store.state.request.dataDetailRequest.requestAccountId ==
                    userID &&
                  dataSuccess.length > 1 &&
                  index == dataSuccess.length - 1 -->
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[1] &&
                  ($store.state.request.dataDetailRequest.allowAgreeOnRequest ||
                    $store.state.request.dataDetailRequest
                      .allowClarifyOnRequest) &&
                  dataSuccess.length > 1 &&
                  index == dataSuccess.length - 1
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  :loading="loaddingConfirm"
                  @click="confirmReplyCOntent(item[1])"
                  >Đồng ý</v-btn
                >
                <v-btn
                  v-if="dataSuccess.length < 3"
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="funcOpenClarify(item[1])"
                  >Cần làm rõ</v-btn
                >
              </div>
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus ===
                    'ARGEE' &&
                  item[1] &&
                  $store.state.request.dataDetailRequest.answer &&
                  index == dataSuccess.length - 1 &&
                  aditionalList.length == 0
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="openAdditionalReply = true"
                  >Cập nhật trả lời kiến nghị</v-btn
                >
              </div>
              <div
                class="mt-2 primary--text"
                v-if="
                  $store.state.request.dataDetailRequest.acceptReplyStatus !==
                    'ARGEE' &&
                  item[0] &&
                  !item[1] &&
                  index == dataSuccess.length - 1 &&
                  (($store.state.request.dataDetailRequest.answer &&
                    $store.state.request.dataDetailRequest.replyStatus ===
                      'UN_REPLY') ||
                    ($store.state.request.dataDetailRequest.answer &&
                      $store.state.request.dataDetailRequest
                        .acceptReplyStatus === 'CLARIFY'))
                "
              >
                <v-btn
                  depressed
                  small
                  class="primary"
                  :ripple="false"
                  @click="openReply = true"
                  >Trả lời</v-btn
                >
              </div>
              <v-row
                class="ma-0 px-3 py-2"
                no-gutters
                v-if="item[1] && idItemReply === item[1].id"
              >
                <v-col class="pa-0" cols="12">
                  <vue-editor
                    v-model="clarifyContent"
                    @input="clarifyContentError = []"
                  >
                  </vue-editor>
                  <div
                    class="fs-12 red--text mx-3"
                    v-if="!$isNullOrEmpty(clarifyContentError)"
                  >
                    {{ clarifyContentError[0] }}
                  </div>
                </v-col>

                <v-col class="pa-0 d-flex justify-end" cols="12">
                  <v-btn
                    small
                    class="secondary mt-2 text-none mr-2"
                    @click="idItemReply = null"
                  >
                    Hủy bỏ
                  </v-btn>
                  <v-btn
                    small
                    class="primary mt-2 text-none"
                    :loading="loaddingClarify"
                    @click="requestAnswerClarifyPost"
                  >
                    Gửi nội dung cần làm rõ
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </CardGlobal>
        </div>
      </v-col>
      <v-col
        v-if="
          $store.state.request.dataDetailRequest.acceptReplyStatus !==
            'ARGEE' || showHistory
        "
        class="pa-0 col-12 col-md-4"
      >
        <CardGlobal class="mt-2">
          <v-row class="ma-0 pb-2">
            <v-col class="col-auto" style="font-size: 14pt; font-weight: 500"
              >Quá trình xử lý kiến nghị</v-col
            >
          </v-row>
          <PerfectScrollbar :options="{ swipeEasing: true }" class="scroll">
            <v-row class="ma-0" no-gutters>
              <v-col
                class="px-5"
                cols="12"
                v-for="(itemLog, indexLog) in this.$store.state.request
                  .dataDetailRequest.requestLogs"
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

      <v-col
        class="col-auto pr-0"
        v-if="
          this.$store.state.request.dataDetailRequest.answer &&
          $store.state.request.dataDetailRequest.acceptReplyStatus !==
            'ARGEE' &&
          $store.state.request.dataDetailRequest.unitReplyRequests[0] &&
          $store.state.request.dataDetailRequest.unitReplyRequests[0].unit.id ==
            1 &&
          dataSuccess[dataSuccess.length - 1] &&
          !dataSuccess[dataSuccess.length - 1][1] &&
          dataSuccess.length < 3
        "
      >
        <v-btn
          depressed
          class="primary text-none"
          @click="openDialogInputReasonUnit = true"
          >Chuyển đơn vị</v-btn
        >
      </v-col>

      <v-col
        class="col-auto pr-0"
        v-if="
          this.$store.state.request.dataDetailRequest.answer &&
          $store.state.request.dataDetailRequest.acceptReplyStatus !==
            'ARGEE' &&
          $store.state.request.dataDetailRequest.unitReplyRequests[0] &&
          $store.state.request.dataDetailRequest.unitReplyRequests[0].unit.id !=
            1 &&
          dataSuccess[dataSuccess.length - 1] &&
          !dataSuccess[dataSuccess.length - 1][1] &&
          dataSuccess.length < 3
        "
      >
        <v-btn
          depressed
          class="primary text-none"
          @click="openDialogInputReason = true"
          >Chuyển Văn phòng
        </v-btn>
      </v-col>

      <v-col class="col-auto pr-0">
        <v-btn depressed class="secondary text-none" @click="close"
          >Trở lại</v-btn
        >
      </v-col>
    </v-row>
    <RepRequest
      :requestObjectType="requestObjectType"
      :open="openReply"
      :replyNumberDetail="replyNumberDetail"
      @toggle="openReply = !openReply"
      @Success="Success"
    ></RepRequest>
    <yes-no-alert
      :open="openChange"
      alert-msg="Bạn có chắc chắn đồng ý với câu trả lời này"
      @toggle="openChange = !openChange"
      @OK="confirm"
    >
    </yes-no-alert>
    <Clarify :open="openClarify" @toggle="openClarify = !openClarify"></Clarify>
    <yes-no-alert
      :open="openDeleteReply"
      alert-msg="Bạn có muốn xóa nội dung trả lời này này không?"
      @toggle="openDeleteReply = !openDeleteReply"
      @OK="deleteReplyOk"
    >
    </yes-no-alert>
    <yes-no-alert
      :open="openDialogDeleteClarify"
      alert-msg="Bạn có muốn xóa nội dung trả yêu cầu làm rõ này này không?"
      @toggle="openDialogDeleteClarify = !openDialogDeleteClarify"
      @OK="deleteClarify"
    >
    </yes-no-alert>
    <UpdateReplyContent
      :open="openUpdateReplyContent"
      @toggle="openUpdateReplyContent = !openUpdateReplyContent"
      :data="dataItem"
      @Success="requestAnswer"
      :replyNumberDetail="replyNumberDetail"
    ></UpdateReplyContent>
    <UpdateClarify
      :open="openUpdateClarify"
      @toggle="openUpdateClarify = !openUpdateClarify"
      :itemClarify="itemClarify"
      @Success="requestAnswer"
    ></UpdateClarify>
    <ConfirmRequest
      :open="openConfirm"
      @toggle="openConfirm = !openConfirm"
    ></ConfirmRequest>
    <InputReason
      @Success="SuccessMove"
      :open="openDialogInputReason"
      @toggle="openDialogInputReason = !openDialogInputReason"
    ></InputReason>
    <InputReasonUnit
      @Success="SuccessMove"
      :open="openDialogInputReasonUnit"
      @toggle="openDialogInputReasonUnit = !openDialogInputReasonUnit"
    ></InputReasonUnit>
    <RequestCoordination
      :open="openDialogRequestCoordination"
      @toggle="openDialogRequestCoordination = !openDialogRequestCoordination"
    ></RequestCoordination>
    <AdditionalReply
      :requestObjectType="requestObjectType"
      :open="openAdditionalReply"
      :replyNumberDetail="replyNumberDetail"
      @toggle="openAdditionalReply = !openAdditionalReply"
      @Success="successAdditional"
    ></AdditionalReply>
  </div>
</template>
<script>
import AdditionalReply from '~/components/danh-sach-kien-nghi/chi-tiet/AdditionalReply.vue'
import InputReason from '~/components/danh-sach-kien-nghi/chi-tiet/InputReason.vue'
import UpdateReplyContent from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateReplyContent.vue'
import UpdateClarify from '~/components/danh-sach-kien-nghi/chi-tiet/UpdateClarify.vue'
import moment from 'moment'
import Clarify from '~/components/danh-sach-kien-nghi/chi-tiet/Clarify.vue'
import jsCookie from 'js-cookie'
import RepRequest from '~/components/danh-sach-kien-nghi/chi-tiet/RepRequest.vue'
import ConfirmRequest from '~/components/danh-sach-kien-nghi/chi-tiet/ConfirmRequest.vue'
import InputReasonUnit from '~/components/danh-sach-kien-nghi/chi-tiet/InputReasonUnit.vue'
import Rules from '~/assets/configurations/Rules'
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
    InputReasonUnit,
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
      requestObjectTypeId: jsCookie.get('requestObjectTypeId'),
    }
  },
  created() {
    this.requestObjectTypeId = jsCookie.get('requestObjectTypeId')
  },
  mounted() {
    if (this.$isNullOrEmpty(this.$store.state.request.dataDetailRequest)) {
      window.history.back()
    }
    if (
      this.$store.state.request.dataDetailRequest.answer &&
      this.$store.state.request.dataDetailRequest.acceptReplyStatus ===
        'NOTSEEN'
    ) {
      this.requestSeen()
    }
    this.content = this.$store.state.request.dataDetailRequest.requestContent

    let departmentId = jsCookie.get('departmentId')
    for (
      let i = 0;
      i < this.$store.state.request.dataDetailRequest.unitReplyRequests.length;
      i++
    ) {
      let item =
        this.$store.state.request.dataDetailRequest.unitReplyRequests[i]
      if (item.unit.id == departmentId) {
        this.isReply = true
      }
    }
    this.userID = jsCookie.get('userId')

    if (
      this.$store.state.request.dataDetailRequest.acceptReplyStatus == 'ARGEE'
    ) {
      this.additionalList()
    }
    this.requestAnswer()
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
    async successAdditional() {
      await this.detail()
      await this.additionalList()
    },
    async additionalList() {
      await this.$store
        .dispatch('request/additionalList', {
          requestId: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.aditionalList = res.data.data
          }
        })
    },
    SuccessMove() {
      this.detail()
    },
    async detail(item) {
      await this.$store
        .dispatch('request/detailRequest', {
          id: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$store.commit('request/setDataDetailRequest', res.data.data)
            setTimeout(() => {
              this.arrData = []

              this.requestAnswer()
            }, 200)
          }
        })
    },
    async requestAnswer() {
      // console.log(this.$store.state.request.dataDetailRequest)
      if (this.$store.state.request.dataDetailRequest !== null) {
        this.arrData.push({
          createTime: this.$store.state.request.dataDetailRequest.comingTime,
          ...this.$store.state.request.dataDetailRequest,
        })
      }
      await this.$store
        .dispatch('request/requestAnswer', {
          requestId: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          let arr = []
          this.totalAnswer = res.data.data.length

          for (let i = 0; i < res.data.data.length; i++) {
            if (this.requestObjectType == null) {
              if (res.data.data[i].requestType != null) {
                this.requestObjectType = res.data.data[i].requestType
              }
            }
            if (this.replyNumberDetail == null) {
              this.replyNumberDetail = res.data.data[i].replyNumber
            }
            if (res.data.data[i].replyStatus === 'REPLIED') {
              this.requestSuccess = true
            }
            if (
              res.data.data[i].replyStatus === 'NOTSEEN' &&
              this.$store.state.request.dataDetailRequest.requestAccountId ==
                this.userID
            ) {
              this.seenRequest(res.data.data[i].id)
            }
            this.arrData.push(res.data.data[i])
            this.requestAnswerClarify(res.data.data[i].id, res.data.data[i], i)
          }
        })
    },
    async requestAnswerClarify(id, data, index) {
      let arr = []
      let dataSuccess = null
      this.listReplycontent = []
      await this.$store
        .dispatch('request/requestAnswerClarify', {
          requestAnswerId: id,
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            this.arrData.push(res.data.data[0])
          }
        })
      this.contentShow = [{ ...this.listReplycontent[0] }]
    },
    requestSeen() {
      let data = {
        id: this.$store.state.request.dataDetailRequest.id,
        replyStatus: 'SEEN',
      }
      this.$store.dispatch('request/requestSeen', data).then((res) => {})
    },

    async deleteClarify() {
      this.arrData = []
      let data = {
        requestAnswerId: this.itemClarify.id,
      }
      await this.$store.dispatch('request/clarifyDelete', data).then((res) => {
        if (res.data.error.code === 0) {
          this.$showSuccess(this, 'Xóa nội dung cần làm rõ thành công')
          this.listReplycontent = []

          this.detail()
        }
      })
    },

    deleteReply(item) {
      this.itemReply = item
      this.openDeleteReply = true
    },
    deleteReplyOk() {
      let data = {
        answerContent: this.itemReply.answerContent,
        replyNumber: this.$store.state.request.dataDetailRequest.replyNumber,
        requestAnswerId: this.itemReply.id,
        requestId: this.$store.state.request.dataDetailRequest.id,
      }
      this.$store.dispatch('request/answerDelete', data).then((res) => {
        if (res.data.error.code === 0) {
          this.$showSuccess(this, 'Xóa câu trả lời thành công')
          this.listReplycontent = []
          this.requestAnswer()
        }
      })
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
    async requestAnswerClarifyPost() {
      this.loaddingClarify = true

      let isError = false
      if (this.$isNullOrEmpty(this.clarifyContent)) {
        isError = true
        this.clarifyContentError = ['Vui lòng nhập nội dung cần làm rõ']
        this.loaddingClarify = false
      } else {
        let data = {
          questionContent: this.clarifyContent,
          requestAnswerId: this.idItemReply,
        }
        await this.$store
          .dispatch('request/requestAnswerClarifyPost', data)
          .then(async (res) => {
            if (res.data.error.code === 0) {
              this.$showSuccess(this, 'Yêu cầu làm rõ câu trả lời thành công.')
              this.listReplycontent = []

              if (
                this.totalAnswer == 2 &&
                this.$store.state.request.dataDetailRequest.unitReplyRequests[0]
                  .unit.id !== 1
              ) {
                let data = {
                  reason: 'Đơn vị đã trả lời hai lần',
                  isAuto: true,
                  id: this.$store.state.request.dataDetailRequest.id,
                }
                await this.$store
                  .dispatch('request/transferUnitAnswerVP', data)
                  .then((res) => {
                    if (res.data.error.code === 0) {
                    }
                  })
              }
              this.detail()
              this.idItemReply = null
              this.loaddingClarify = false
            }
          })
      }
    },
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
    confirm() {
      this.$store
        .dispatch('request/requestVerifiedAnswer', {
          replyStatus: 'ARGEE',
          requestAnswerId: this.idContent,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Đồng ý với câu trả lời thành công')

            this.detail()

            this.loaddingConfirm = false
          }
        })
    },
    back() {
      window.history.back()
    },
    clarify() {
      this.openClarify = true
    },
    close() {
      this.$store.commit('request/setDataDetailRequest', null)
      window.history.back()
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
</style>
