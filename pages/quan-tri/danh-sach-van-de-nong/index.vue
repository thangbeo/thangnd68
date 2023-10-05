<template>
  <div
    class="main_body"
    v-if="
      $checkRole(
        Rules.System.admin_problem.actions.VIEW,
        Rules.System.admin_problem.id
      )
    "
  >
    <client-only>
      <div>
        <div class="d-none" @click="resetFillter" id="resetFillter"></div>
        <!-- <CardGlobal>
          <div
            style="font-size: 1.3rem; font-weight: 500"
            class="primary--text"
          >
            <v-btn to="/" icon>
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
        </CardGlobal> -->
        <CardGlobal>
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

            <template
              v-slot:item="data"
              v-if="listItem.length > 0 && loadingHeader == false"
            >
              <tr v-if="typeShow === 1">
                <td class="text-center">
                  <div>
                    {{ itemsPerPage * (pageIndex - 1) + data.index + 1 }}
                  </div>
                </td>
                <td class="px-1">
                  <div
                    v-if="!$isNullOrEmpty(data.item.field)"
                    style="text-align: center"
                  >
                    <img style="width: 70px" :src="data.item.field.logo" />
                  </div>
                </td>

                <!-- tên vấn đề -->
                <td>
                  <v-row align="center">
                    <v-col cols="12" class="px-0">
                      <nuxt-link
                        class="textDeco black--text"
                        :to="
                          '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                          $nonAccentVietnamese(data.item.rawRequestName) +
                          '-n' +
                          data.item.id +
                          '.html'
                        "
                      >
                        <div
                          class="hide-text"
                          v-html="data.item.requestName"
                        ></div>
                      </nuxt-link>
                    </v-col>
                  </v-row>
                </td>
                <!--  thực trạng -->
                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col
                      cols="12
                      "
                      class="px-0"
                    >
                      <v-tooltip
                        v-if="!$isNullOrEmpty(data.item.reality)"
                        color="#f7a534"
                        bottom
                        max-width="900"
                        :open-delay="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(data.item.rawRequestName) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.reality)"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div v-html="replaceTextP(data.item.reality)"></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td>
                <!-- giải pháp -->
                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col
                      cols="12
                      "
                      class="px-0"
                    >
                      <v-tooltip
                        v-if="!$isNullOrEmpty(data.item.requestContent)"
                        color="#f7a534"
                        bottom
                        max-width="900"
                        :open-delay="900"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(
                                data.item.rawRequestName
                              ).slice(0, 36) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.requestContent)"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div
                          v-html="replaceTextP(data.item.requestContent)"
                        ></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td>

                <!-- Kinh nghiệm quốc tế -->
                <!-- <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col
                      cols="12
                      "
                    >
                      <v-tooltip
                        color="#f7a534"
                        bottom
                        max-width="900"
                        :open-delay="800"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(data.item.rawRequestName) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="data.item.internationalExp"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div v-html="data.item.internationalExp"></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td> -->

                <!-- <td>
                  <div v-if="!$isNullOrEmpty(data.item.units)">
                    {{ data.item.units }}
                  </div>
                </td> -->
                <td>
                  <div class="d-flex justify-center">
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.admin_problem.actions.UPDATE,
                          Rules.System.admin_problem.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          :to="`/quan-tri/danh-sach-van-de-nong/cap-nhat-van-de/${data.item.id}`"
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
                          Rules.System.admin_problem.actions.DELETE,
                          Rules.System.admin_problem.id
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

                    <!-- <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="copy_text(`text-copy-${data.item.id}`)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="red">mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span>Copy</span>
                    </v-tooltip>

                    <div :id="`text-copy-${data.item.id}`" class="d-none">
                      {{
                        `${
                          APIs.domain
                        }/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/${$nonAccentVietnamese(
                          data.item.rawRequestName
                        )}-n${data.item.id}.html`
                      }}
                    </div> -->
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td class="text-center">
                  <div>
                    {{ itemsPerPage * (pageIndex - 1) + data.index + 1 }}
                  </div>
                </td>
                <td class="px-1">
                  <div
                    v-if="!$isNullOrEmpty(data.item.field)"
                    style="text-align: center"
                  >
                    <img style="width: 70px" :src="data.item.field.logo" />
                  </div>
                </td>

                <!-- tên vấn đề -->
                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col cols="12" class="px-0">
                      <nuxt-link
                        class="textDeco black--text"
                        :to="
                          '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                          $nonAccentVietnamese(data.item.rawRequestName) +
                          '-n' +
                          data.item.id +
                          '.html'
                        "
                      >
                        <div
                          class="hide-text"
                          v-html="data.item.requestName"
                        ></div>
                      </nuxt-link>
                    </v-col>
                  </v-row>
                </td>

                <!-- thực trạng -->
                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col cols="12" class="px-0">
                      <v-tooltip
                        v-if="!$isNullOrEmpty(data.item.reality)"
                        bottom
                        max-width="900"
                        :open-delay="800"
                        color="#f7a534"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(data.item.rawRequestName) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.reality)"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div v-html="replaceTextP(data.item.reality)"></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td>
                <!-- giải pháp -->
                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col cols="12" class="px-0">
                      <v-tooltip
                        v-if="!$isNullOrEmpty(data.item.requestContent)"
                        bottom
                        max-width="900"
                        :open-delay="900"
                        color="#f7a534"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(data.item.rawRequestName) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.requestContent)"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div
                          v-html="replaceTextP(data.item.requestContent)"
                        ></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td>
                <!-- kinh nghiệm quôc tế -->

                <td style="cursor: pointer">
                  <v-row align="center">
                    <v-col cols="12" class="px-0">
                      <v-tooltip
                        v-if="!$isNullOrEmpty(data.item.internationalExp)"
                        bottom
                        max-width="900"
                        :open-delay="800"
                        color="#f7a534"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <nuxt-link
                            class="textDeco black--text"
                            :to="
                              '/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/' +
                              $nonAccentVietnamese(data.item.rawRequestName) +
                              '-n' +
                              data.item.id +
                              '.html'
                            "
                          >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.internationalExp)"
                            ></div>
                          </nuxt-link>
                        </template>
                        <div
                          v-html="replaceTextP(data.item.internationalExp)"
                        ></div>
                      </v-tooltip>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </td>
                <td class="px-2">
                  <div v-if="!$isNullOrEmpty(data.item.units)">
                    {{ data.item.units }}
                  </div>
                </td>

                <!-- <td class="text-center">
                  <div
                    v-if="!$isNullOrEmpty(data.item.comingTime)"
                    style="min-width: 80px"
                  >
                    {{
                      moment(
                        data.item.comingTime,
                        'DD/MM/YYYY HH:mm:ss'
                      ).format('DD')
                    }}
                  </div>
                </td> -->
                <!-- <td class="text-center">
                  <div
                    v-if="!$isNullOrEmpty(data.item.comingTime)"
                    style="min-width: 80px"
                  >
                    {{
                      moment(
                        data.item.comingTime,
                        'DD/MM/YYYY HH:mm:ss'
                      ).format('MM')
                    }}
                  </div>
                </td> -->
                <!-- <td class="text-center">
                  <div
                    v-if="!$isNullOrEmpty(data.item.comingTime)"
                    style="min-width: 80px"
                  >
                    {{
                      moment(
                        data.item.comingTime,
                        'DD/MM/YYYY HH:mm:ss'
                      ).format('YYYY')
                    }}
                  </div>
                </td> -->
                <!-- <td class="text-center">
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
                </td> -->
                <!-- kỳ họp -->
                <!-- <td>
                  <div v-if="!$isNullOrEmpty(data.item.periodName)">
                    {{ data.item.periodName }}
                  </div>
                </td> -->

                <!-- khóa họp -->
                <!-- <td>
                  <div v-if="!$isNullOrEmpty(data.item.sessionName)">
                    {{ data.item.sessionName }}
                  </div>
                </td> -->

                <!-- <td>
                  <div style="min-width: 120px">
                    {{ data.item.fieldThemeName }}
                  </div>
                </td> -->
                <td class="px-2">
                  <div v-if="data.item.createBy !== 'anonymousUser'">
                    {{ data.item.createBy }}
                  </div>
                </td>
                <td class="text-center px-2">
                  <div>
                    {{
                      moment(
                        data.item.createTime,
                        'YYYY-MM-DD HH:mm:ss'
                      ).format('DD/MM/YYYY HH:mm:ss')
                    }}
                  </div>
                </td>

                <td>
                  <div class="d-flex justify-center">
                    <v-tooltip
                      bottom
                      v-if="
                        $checkRole(
                          Rules.System.admin_problem.actions.UPDATE,
                          Rules.System.admin_problem.id
                        )
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          :to="`/quan-tri/danh-sach-van-de-nong/cap-nhat-van-de/${data.item.id}`"
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
                          Rules.System.admin_problem.actions.DELETE,
                          Rules.System.admin_problem.id
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

                    <!-- <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="copy_text(`text-copy-${data.item.id}`)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="red">mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span>Copy</span>
                    </v-tooltip>

                    <div :id="`copy-text-${data.item.id}`" class="d-none">
                      {{
                        `${
                          APIs.domain
                        }/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/${$nonAccentVietnamese(
                          data.item.rawRequestName
                        )}-n${data.item.id}.html`
                      }}
                    </div> -->
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
                </td></tr></template
          ></v-data-table>
          <!-- <v-btn
            :loading="loaddingExport"
            @click="exportFile"
            depressed
            small
            class="success white--text mt-2"
          >
            Xuất file danh sách vấn đề
          </v-btn> -->
          <CardGlobal class="mt-2">
            <v-row class="ma-0" no-gutters align="center">
              <v-col class="col-auto py-1 mr-1">
                <div style="font-size: 16px" class="font-weight-bold">
                  Tổng số vấn đề:
                  <span class="red--text">
                    {{ $formatMoney({ amount: totalReqest }) }}</span
                  >
                </div>
              </v-col>
              <v-col class="pr-0 col-auto">
                <div class="d-flex align-center">
                  Xem đầy đủ:
                  <v-switch
                    @change="changeTypeShow"
                    v-model="typeShow"
                    :true-value="2"
                    :false-value="1"
                    class="ma-0 pl-2 pt-0"
                    hide-details=""
                    color="primary"
                  ></v-switch>
                </div>
              </v-col>
              <v-col class="col-auto ml-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      class="primary white--text"
                      v-bind="attrs"
                      v-on="on"
                      small
                      @click="open_search = true"
                    >
                      <v-icon>mdi-plus</v-icon></v-btn
                    >
                  </template>
                  <span>Tìm kiếm mở rộng</span>
                </v-tooltip>
              </v-col>

              <!--              <v-col class="col-auto">-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on, attrs }">-->
              <!--                    <v-btn @click="resetFillter" icon v-bind="attrs" v-on="on">-->
              <!--                      <v-icon size="30" color="primary">mdi-reload</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>Reset bộ lọc</span>-->
              <!--                </v-tooltip>-->
              <!--              </v-col>-->

              <v-col
                v-if="
                  $checkRole(
                    Rules.System.admin_problem.actions.ADD,
                    Rules.System.admin_problem.id
                  )
                "
                class="col-auto ml-2"
              >
                <v-btn
                  depressed
                  class="text-none white--text"
                  color="#f2973a"
                  to="/quan-tri/them-moi-van-de"
                  >Thêm vấn đề
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
        </CardGlobal>

        <yes-no-alert
          :open="openDeleteRequest"
          @toggle="openDeleteRequest = !openDeleteRequest"
          alertMsg="Bạn có chắc chắn muốn xóa vấn đề nóng này này?"
          @OK="confirmDelete"
        >
        </yes-no-alert>
        <searchMore
          :objectTypeId="objectTypeId"
          :fieldSearch="field"
          @search="search"
          :open="openDialogSearchMore"
          @toggle="openDialogSearchMore = !openDialogSearchMore"
        ></searchMore>

        <Dialog
          :open="open_search"
          dialog-name="Tìm kiếm"
          max_width="500"
          :CRUD="true"
          @toggle="open_search = !open_search"
          @actionsUser="getListRequest"
        >
          <v-card-text>
            <v-row class="pt-5">
              <DatePickerIcon
                :label="['Từ ngày', 'Đến ngày']"
                :date="date"
                @setDate="setDate"
                ref="refDate"
              ></DatePickerIcon>
            </v-row>
          </v-card-text>
        </Dialog>
      </div>
    </client-only>
  </div>
</template>
<script>
import searchMore from '~/components/danh-sach-kien-nghi/searchMore.vue'
// import dataConfig from '~/plugins/dataConfig'
import haerderDefault from '~/components/van-de-nong/header/HeaderDefaultAdmin.vue'
import HeaderFull from '~/components/van-de-nong/header/HeaderFull.vue'
import Rules from '~/assets/configurations/Rules'

import DatePickerIcon from '~/components/DatePickerInput.vue'
import moment from 'moment'
import APIs from '~/assets/configurations/API_Config'
import jsCookie, { set } from 'js-cookie'
import Cookies from 'js-cookie'

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
      APIs,
      date: [
        // moment().startOf('year').format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD'),
      ],
      open_search: false,
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
      dataDetail: {},
    }
  },

  head() {
    return {
      title: 'Quản trị vấn đề nóng',

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Quản trị vấn đề nóng',
        },
        {
          hid: 'title',
          name: 'og:title',
          property: 'og:title',
          content: 'Quản trị vấn đề nóng',
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
  created() {},
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

    this.getListRequest()
    // this.requestStatistic()
  },

  methods: {
    replaceTextP(value) {
      return value.replaceAll('<p', '<p class="ma-0"')
    },
    copy_text(elementId) {
      // Create a "hidden" input
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

      this.$showSuccess(this, 'Copy link thành công')
    },

    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.admin_problem.id,
        actionId
      )
      return isAllowed
    },
    profileDetail(item) {
      let id = item.id
      this.$router.push({
        path: `/quan-tri/danh-sach-van-de-nong/chi-tiet-van-de/${this.$removeAccents(
          item.requestName
        ).replace(/ /g, '-')}`,
        query: { id },
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
      this.loaddingExport = true
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
        fieldId: this.$isNullOrEmpty(this.$store.state.dataConfig.field)
          ? this.field.join()
          : this.$store.state.dataConfig.field.join(),
        leaderId: this.leader,
        requestTypeId: this.$store.state.dataConfig.requestType.join(),
        symbols: this.synbol,
        unitId: this.$store.state.dataConfig.unit.join(),
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        objectTypeId: this.$store.state.dataConfig.objectTypeId.join(),
        // problemGroups:this.problemGroup
      }
      await this.$store
        .dispatch('exportFile/exportListRequest', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            window.location.href = res.data.data.url
          }
          this.loaddingExport = false
        })
      this.loaddingExport = false
    },
    confirm(item) {
      // console.log(item)
      this.idRequest = item.id
      this.openApproval = true
    },
    requestApproval() {
      this.$store
        .dispatch('request/requestApproval', {
          id: this.idRequest,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Duyệt kiến nghị thành công')
            this.getListRequest()
          }
        })
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
      this.itemsPerPage = 20
      this.requestType = []
      this.problemGroup = []
      this.approvalStatus = null
      this.replyStatus = null
      this.changeStatus = null
      this.selectDeadline = ''
      this.unitAdmin = []
      this.leader = null
      this.fieldAdmin = []
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
      this.$store.commit('dataConfig/setFieldAdmin', [])
      this.$store.commit('dataConfig/setRoute', [])
      this.$store.commit('dataConfig/setUnitAdmin', [])
      this.$store.commit('dataConfig/setRequestType', [])
      this.$store.commit('utilitiesState/setContentFillterAdmin', '')
      this.$store.commit('utilitiesState/setProblemNameFillterAdmin', '')
      this.$store.commit('utilitiesState/setRequestRealityAdmin', '')
      this.$store.commit('utilitiesState/setRequestSolutionAdmin', '')
      this.$store.commit('utilitiesState/setInternationalAdmin', '')
      this.date = [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]

      setTimeout(() => {
        this.$refs.resetHeader.reset()
      }, 100)
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
      this.getListRequest()
    },
    deleteItem(item) {
      this.idRequest = item.id
      this.openDeleteRequest = true
    },
    confirmDelete() {
      this.$store
        .dispatch('request/requestHotIssueDelete', { id: this.idRequest })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Xóa vấn đề nóng thành công')
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
            this.$router.push('/quan-tri/chi-tiet-van-de')
          }
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
      // console.log(this.$store.state.utilitiesState)
      this.loadingHeader = true
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
        content: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.contentFillterAdmin
        )
          ? this.$store.state.utilitiesState.saveTextContentAdmin
          : this.$store.state.utilitiesState.contentFillterAdmin,
        requestInternational:
          this.$store.state.utilitiesState.internationalAdmin,
        deadline: this.selectDeadline,
        fieldId: this.$store.state.dataConfig.fieldAdmin.join(),
        leaderId: this.leader,
        requestTypeId: this.$store.state.dataConfig.requestType.join(),
        symbols: this.synbol,
        unitId: this.$store.state.dataConfig.unitAdmin.join(),
        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        objectTypeId: this.$store.state.dataConfig.objectTypeId.join(),
        requestName: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.ProblemNameFillterAdmin
        )
          ? ''
          : this.$store.state.utilitiesState.ProblemNameFillterAdmin,

        requestSolution: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.requestSolutionAdmin
        )
          ? ''
          : this.$store.state.utilitiesState.requestSolutionAdmin,

        requestReality: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.requestRealityAdmin
        )
          ? ''
          : this.$store.state.utilitiesState.requestRealityAdmin,

        // problemGroups:this.problemGroup
      }
      this.$store.dispatch('request/requestHotIssue', data).then((res) => {
        if (res.data.error.code === 0) {
          // console.log(res)
          this.listItem = res.data.data.data
          this.pageCount = res.data.data.totalPages
          this.totalReqest = res.data.data.totalRecords
          this.$store.commit(
            'utilitiesState/setNumberProblemName',
            res.data.data.cntRequestName
          )

          this.$store.commit(
            'utilitiesState/setNumberRequestReality',
            res.data.data.cntRequestReality
          )

          this.$store.commit(
            'utilitiesState/setNumberRequestSolution',
            res.data.data.cntRequestSolution
          )

          this.$store.commit(
            'utilitiesState/setNumberRequestInternational',
            res.data.data.cntRequestInternational
          )
          this.loadingHeader = false
        }
      })
    },
  },
  watch: {
    '$store.state.utilitiesState.contentFillterAdmin'(value) {
      this.getListRequest()
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
.v-tooltip__content {
  opacity: 2 !important;
}
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
<style lang="scss" >
.main_body {
  .v-data-table--fixed-header .v-data-table__wrapper {
    max-height: calc(100vh - 170px);
  }
}
</style>
