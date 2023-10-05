<template>
  <client-only>
    <div
      v-if="
        $checkRole(
          Rules.System.list_problem.actions.VIEW,
          Rules.System.list_problem.id
        )
      "
    >
      <!-- <div class="d-none" @click="resetFillter" id="resetFillter"></div> -->
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

            <headeShowRexperience
              ref="resetHeader"
              @searchFilter="searchFilter"
              v-else
            ></headeShowRexperience>
          </template>
          <template v-slot:top>
            <!-- <v-row class="ma-0" align="center">
              <v-col class="col-auto py-1">
                <div style="font-size: 16px" class="font-weight-bold">
                  Tổng số:
                  <span class="red--text">
                    {{ $formatMoney({ amount: totalReqest }) }}
                    <span class="black--text">vấn đề</span></span
                  >
                </div>
              </v-col>
              <v-spacer></v-spacer>
            </v-row> -->
          </template>

          <template
            v-if="listItem.length > 0 && loadingHeader == false"
            v-slot:item="data"
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
              <td>
                <v-row align="center">
                  <v-col cols="12" class="px-0">
                    <nuxt-link
                      class="textDeco black--text"
                      :to="
                        '/chi-tiet-van-de/' +
                        replaceNhay(
                          $nonAccentVietnamese(data.item.rawRequestName).slice(
                            0,
                            36
                          ) +
                            '-n' +
                            data.item.transId +
                            '.html'
                        )
                      "
                    >
                      <div class="d-flex">
                        <!-- <span
                          v-if="Number(data.item.cntRequestNameStr) > 0"
                          class="orange--text mr-1"
                          >({{ data.item.cntRequestNameStr }})</span
                        > -->
                        <span v-html="data.item.requestName"> </span>
                      </div>
                    </nuxt-link>
                    <!-- <template v-slot:activator="{ on, attrs }">
                      <nuxt-link
                        class="textDeco black--text"
                        :to="
                          '/chi-tiet-van-de/' +
                          $nonAccentVietnamese(data.item.rawRequestName) +
                          '-n' +
                          data.item.transId +
                          '.html'
                        "
                      >
                        <div class="d-flex">
                          <span
                            v-if="Number(data.item.cntRequestNameStr) > 0"
                            class="orange--text mr-1"
                            >({{ data.item.cntRequestNameStr }})</span
                          >
                          <span
                            class="hide-text"
                            v-bind="attrs"
                            v-on="on"
                            v-html="data.item.requestName"
                          >
                          </span>
                        </div>
                      </nuxt-link>
                    </template> -->
                  </v-col>
                </v-row>
              </td>

              <!-- thực trạng -->
              <td>
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
                            '/chi-tiet-van-de/' +
                            replaceNhay(
                              $nonAccentVietnamese(
                                data.item.rawRequestName
                              ).slice(0, 36) +
                                '-n' +
                                data.item.transId +
                                '.html'
                            )
                          "
                        >
                          <div class="d-flex">
                            <span
                              v-if="Number(data.item.cntRequestRealityStr) > 0"
                              class="orange--text"
                              >({{ data.item.cntRequestRealityStr }})</span
                            >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.reality)"
                            ></div>
                          </div>
                        </nuxt-link>
                      </template>
                      <div
                        class="fw-500"
                        v-html="replaceTextP(data.item.reality)"
                      ></div>
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
                      :open-delay="800"
                      color="#f7a534"
                      >resetFillter
                      <template v-slot:activator="{ on, attrs }">
                        <nuxt-link
                          class="textDeco black--text"
                          :to="
                            '/chi-tiet-van-de/' +
                            replaceNhay(
                              $nonAccentVietnamese(
                                data.item.rawRequestName
                              ).slice(0, 36) +
                                '-n' +
                                data.item.transId +
                                '.html'
                            )
                          "
                        >
                          <div class="d-flex">
                            <span
                              v-if="Number(data.item.cntRequestSolutionStr) > 0"
                              class="orange--text"
                              >({{ data.item.cntRequestSolutionStr }})</span
                            >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.requestContent)"
                            ></div>
                          </div>
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
              <td class="px-0 text-center">
                <div>
                  <div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="copy_text(`copy-text-${data.item.transId}`)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon size="33" color="primary"
                            >mdi-content-duplicate</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Sao chép đường đẫn</span>
                    </v-tooltip>
                  </div>

                  <div :id="`copy-text-${data.item.transId}`" class="d-none">
                    {{
                      `
                  ${APIs.domain}${$nonAccentVietnamese(
                        data.item.rawRequestName
                      ).slice(0, 36)}-n${data.item.transId}.html`
                    }}
                  </div>
                </div>
              </td>
              <!-- kinh nghiệm cuốc tế -->
              <!-- <td>
                <v-row align="center">
                  <v-col cols="12">
                    <v-tooltip bottom max-width="900" :open-delay="800">
                      <template v-slot:activator="{ on, attrs }">
                        <nuxt-link
                          class="textDeco black--text"
                          :to="
                            '/chi-tiet-van-de/' +
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
              <!-- đơn vị chuẩn bị -->
              <!-- <td>
                <div v-if="!$isNullOrEmpty(data.item.units)">
                  {{ data.item.units }}
                </div>
              </td> -->
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

              <td>
                <v-row align="center">
                  <v-col cols="12" class="px-0">
                    <nuxt-link
                      class="textDeco black--text"
                      :to="
                        '/chi-tiet-van-de/' +
                        $nonAccentVietnamese(data.item.rawRequestName).slice(
                          0,
                          36
                        ) +
                        '-n' +
                        data.item.transId +
                        '.html'
                      "
                    >
                      <div class="d-flex">
                        <!-- <span
                          v-if="Number(data.item.cntRequestNameStr) > 0"
                          class="orange--text mr-1"
                          >({{ data.item.cntRequestNameStr }})</span
                        > -->
                        <span class="hide-text" v-html="data.item.requestName">
                        </span>
                      </div>
                    </nuxt-link>
                  </v-col>
                </v-row>
              </td>

              <!-- thực trạng -->
              <td class="px-2">
                <!--                <v-row align="center">-->
                <!--                  <v-col cols="12">-->
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
                        '/chi-tiet-van-de/' +
                        $nonAccentVietnamese(data.item.rawRequestName).slice(
                          0,
                          36
                        ) +
                        '-n' +
                        data.item.transId +
                        '.html'
                      "
                    >
                      <div class="d-flex">
                        <span
                          v-if="Number(data.item.cntRequestRealityStr) > 0"
                          class="orange--text"
                          >({{ data.item.cntRequestRealityStr }})</span
                        >
                        <div
                          class="hide-text"
                          v-bind="attrs"
                          v-on="on"
                          v-html="replaceTextP(data.item.reality)"
                        ></div>
                      </div>
                    </nuxt-link>
                  </template>
                  <div v-html="replaceTextP(data.item.reality)"></div>
                </v-tooltip>
                <!--                  </v-col>-->
                <!--                  <v-spacer></v-spacer>-->
                <!--                </v-row>-->
              </td>
              <!-- giải pháp -->
              <td style="cursor: pointer">
                <v-row align="center">
                  <v-col cols="12" class="px-0">
                    <v-tooltip
                      v-if="!$isNullOrEmpty(data.item.requestContent)"
                      bottom
                      max-width="900"
                      :open-delay="800"
                      color="#f7a534"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <nuxt-link
                          class="textDeco black--text"
                          :to="
                            '/chi-tiet-van-de/' +
                            $nonAccentVietnamese(
                              data.item.rawRequestName
                            ).slice(0, 36) +
                            '-n' +
                            data.item.transId +
                            '.html'
                          "
                        >
                          <div class="d-flex">
                            <span
                              v-if="Number(data.item.cntRequestSolutionStr) > 0"
                              class="orange--text"
                              >({{ data.item.cntRequestSolutionStr }})</span
                            >
                            <div
                              class="hide-text"
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.requestContent)"
                            ></div>
                          </div>
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
              <!-- kinh nghiệm cuốc tế -->
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
                            replaceNhay(
                              '/chi-tiet-van-de/' +
                                $nonAccentVietnamese(data.item.rawRequestName) +
                                '-n' +
                                data.item.transId +
                                '.html'
                            )
                          "
                        >
                          <div class="d-flex">
                            <span
                              v-if="
                                Number(data.item.cntRequestInternationalStr) > 0
                              "
                              class="orange--text"
                              >({{
                                data.item.cntRequestInternationalStr
                              }})</span
                            >
                            <div
                              v-bind="attrs"
                              v-on="on"
                              v-html="replaceTextP(data.item.internationalExp)"
                            ></div>
                          </div>
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
              <td class="px-0 text-center">
                <div>
                  <div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="copy_text(`copy-text-${data.item.transId}`)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon size="33" color="primary"
                            >mdi-content-duplicate</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Sao chép đường đẫn</span>
                    </v-tooltip>
                  </div>

                  <div :id="`copy-text-${data.item.transId}`" class="d-none">
                    {{
                      replaceNhay(
                        `
                  ${APIs.domain}${$nonAccentVietnamese(
                          data.item.rawRequestName
                        ).slice(0, 36)}-n${data.item.transId}.html`
                      )
                    }}
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <template
            slot="body"
            v-if="listItem.length == 0 && loadingHeader == false"
          >
            <tbody>
              <tr class="v-data-table__empty-wrapper">
                <td colspan="6">
                  <div style="color: rgba(0, 0, 0, 0.38)">Không có dữ liệu</div>
                </td>
              </tr>
            </tbody>
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
          </template>
        </v-data-table>
        <CardGlobal class="mt-2">
          <v-row class="ma-0" no-gutters align="center">
            <v-col class="col-auto py-1">
              <div style="font-size: 16px" class="font-weight-bold">
                Tổng số vấn đề:
                <span class="red--text">
                  {{ $formatMoney({ amount: totalReqest }) }}</span
                >
              </div>
            </v-col>
            <v-col class="pr-0 pl-2 col-auto">
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
              <!--              <v-tooltip bottom>-->
              <!--                <template v-slot:activator="{ on, attrs }">-->
              <!--                  <v-btn @click="resetFillter" icon v-bind="attrs" v-on="on">-->
              <!--                    <v-icon size="30" color="primary">mdi-reload</v-icon>-->
              <!--                  </v-btn>-->
              <!--                </template>-->
              <!--                <span>Reset bộ lọc</span>-->
              <!--              </v-tooltip>-->
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
        <!-- <v-btn
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
        </v-btn> -->
      </CardGlobal>

      <!-- <v-col class="pr-0 col-auto">
            <div class="d-flex align-center">
              Xem: <span class="ml-2">rút gọn</span>
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
          </v-col> -->

      <!-- <div class="w-100">
        <CardGlobal class="d-flex actions-coordinates-1 py-2">
          <div style="font-size: 16px" class="font-weight-bold mr-2">
            Tổng số:
            <span class="red--text">
              {{ $formatMoney({ amount: totalReqest }) }}
              <span class="black--text">vấn đề</span></span
            >
          </div>
          <div class="col-2 ml-4">
            <DatePickerIcon
              :label="['Từ ngày', 'Đến ngày']"
              :date="date"
              @setDate="setDate"
              ref="refDate"
            ></DatePickerIcon>
          </div>

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
              >Lọc</v-btn
            >
          </v-col>

          <div class="d-flex w-100 actions-coordinates-2">
            <div class="flex-grow-1"></div>

            <pagination
              ref="pagination"
              :pageCount="pageCount"
              :page="pageIndex"
              :pageSize="itemsPerPage"
              @changePage="changePage"
              @changePageSize="changePageSize"
              depressed="true"
            ></pagination>
          </div>
        </CardGlobal>
      </div> -->

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
</template>
<script>
import searchMore from '~/components/danh-sach-kien-nghi/searchMore.vue'
// import dataConfig from '~/plugins/dataConfig'
import DatePickerIcon from '~/components/DatePickerInput.vue'
import haerderDefault from '~/components/van-de-nong/header/HeaderDefault.vue'
import headeShowRexperience from '~/components/van-de-nong/header/HeadeShowRexperience.vue'
// import HeaderFull from '~/components/van-de-nong/header/HeaderFull.vue'
import Rules from '~/assets/configurations/Rules'
// import request from '~/store/request'
import URL from '~/assets/configurations/urlConfig'
import APIs from '~/assets/configurations/API_Config'
import moment from 'moment'
import jsCookie, { set } from 'js-cookie'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    searchMore,
    haerderDefault,
    // HeaderFull,
    headeShowRexperience,
    DatePickerIcon,
  },
  data() {
    return {
      APIs,
      date: [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      open_search: false,
      loaddingExport: false,
      objectRequestIds: [],
      loadingHeader: true,
      acceptReplyStatus: null,
      unitName: null,
      openApproval: false,
      openMove: false,
      Rules,
      headers: [],
      title: null,
      listTypeShow: [
        {
          text: 'Ẩn',
          value: 1,
        },
        {
          text: 'Hiển thị',
          value: 2,
        },
      ],
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
      numberProblemName: null,
      numberRequestReality: null,
      numberRequestSolution: null,
      departmentId: null,
      departmentName: null,
      doiTuongQuanLy: jsCookie.get('requestObjectTypeId'),
      // typeShowDonVi: true,
    }
  },

  head() {
    return {
      title: 'Danh sách vấn đề nóng',

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Danh sách vấn đề nóng',
        },
        {
          hid: 'title',
          name: 'og:title',
          property: 'og:title',
          content: 'Danh sách vấn đề nóng',
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

  mounted() {
    this.departmentId = jsCookie.get('departmentId')
    this.$store.state.commonController.stateCommon.listUnit.map((item) => {
      if (item.value == this.departmentId) {
        this.departmentName = item.text
      }
    })

    this.date = JSON.parse(
      JSON.stringify(
        // [this.$route.query.startDate, this.$route.query.endDate]
        this.$store.state.dataConfig.dateSelect
      )
    )

    this.$store.commit(
      'dataConfig/setDate',
      JSON.parse(JSON.stringify(this.date))
    )
    this.path = this.$route.fullPath

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

    if (this.$isNullOrEmpty(this.$store.state.utilitiesState.saveTextContent)) {
      this.$store.commit('utilitiesState/setContentFillter', '')
      this.$store.commit('utilitiesState/setSaveTextContent', '')
    }
    // this.resetFillter()

    // this.requestStatistic()
    this.getListRequest()
  },

  methods: {
    replaceNhay(value) {
      let str1 = value.replaceAll('---', '-')

      let str = str1.replaceAll('--', '-')

      return str
      // console.log(str, 'str2')
    },
    // changeTypeShow() {
    //   if (this.typeShow === 2) {
    //     this.headers = this.$store.state.dataConfig.HeadersFull
    //   } else {
    //     this.headers = this.$store.state.dataConfig.HeadersDefault
    //   }
    // },
    replaceTextP(value) {
      return value.replaceAll('<p', '<p class="ma-0"')
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
    // profileDetail(item) {
    //   let id = item.id
    //   this.$router.push({
    //     path: `/chi-tiet-van-de/${this.$removeAccents(item.requestName).replace(
    //       / /g,
    //       '-'
    //     )}.html`,
    //     query: { id },
    //   })
    // },

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
      this.$store.commit(
        'dataConfig/setDate',
        JSON.parse(JSON.stringify(this.date))
      )
    },
    // async exportFile() {
    //   this.loaddingExport = true
    //   let data = {
    //     objectRequestIds: this.$store.state.dataConfig.objectRequestIds.join(),
    //     NumberOfAnswers: this.NumberOfAnswers,
    //     fromTime:
    //       moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
    //     toTime:
    //       moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',
    //     hotProblems: this.hotProblem,
    //     policyProblems: this.policyProblem,
    //     onlyMe: !this.typeShowDonVi ? true : false,
    //     approvalStatus: this.approvalStatus,
    //     changeStatus: this.changeStatus,
    //     replyStatus: this.replyStatus,
    //     problemGroups: this.$isNullOrEmpty(this.problemGroup)
    //       ? null
    //       : this.problemGroup.join(),
    //     content: this.$isNullOrEmpty(
    //       this.$store.state.utilitiesState.contentFillter
    //     )
    //       ? this.$store.state.utilitiesState.saveTextContent
    //       : this.$store.state.utilitiesState.contentFillter,
    //     deadline: this.selectDeadline,
    //     fieldId: this.$isNullOrEmpty(this.$store.state.dataConfig.field)
    //       ? this.field.join()
    //       : this.$store.state.dataConfig.field.join(),
    //     leaderId: this.leader,
    //     requestTypeId: this.$store.state.dataConfig.requestType.join(),
    //     symbols: this.synbol,
    //     unitId: this.$store.state.dataConfig.unit.join(),
    //     pageIndex: this.pageIndex,
    //     pageSize: this.itemsPerPage,
    //     objectTypeId: this.$isNullOrEmpty(
    //       this.$store.state.dataConfig.objectTypeId
    //     )
    //       ? this.objectTypeId.join()
    //       : this.$store.state.dataConfig.objectTypeId.join(),
    //     // problemGroups:this.problemGroup
    //     acceptReplyStatus: this.acceptReplyStatus,
    //   }
    //   await this.$store
    //     .dispatch('exportFile/exportListRequest', data)
    //     .then((res) => {
    //       if (res.data.error.code === 0) {
    //         window.location.href = res.data.data.url
    //       }
    //       this.loaddingExport = false
    //     })
    //   this.loaddingExport = false
    // },
    backHis() {
      // this.$store.commit('utilitiesState/setContentFillter', null)
      window.history.back()
    },
    confirm(item) {
      // console.log(item)
      this.idRequest = item.id
      this.openApproval = true
    },
    // requestApproval() {
    //   this.$store
    //     .dispatch('request/requestApproval', {
    //       id: this.idRequest,
    //     })
    //     .then((res) => {
    //       if (res.data.error.code === 0) {
    //         this.$showSuccess(this, 'Duyệt kiến nghị thành công')
    //         this.getListRequest()
    //       }
    //     })
    // },
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
      this.totalReqest = null
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
      this.content = ''
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
      this.$store.commit('utilitiesState/setProblemNameFillter', '')
      this.$store.commit('utilitiesState/setRequestSolution', '')
      this.$store.commit('utilitiesState/setRequestReality', '')
      this.date = [
        moment().startOf('year').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]
      setTimeout(() => {
        this.$refs.resetHeader.reset()
      }, 700)
      this.getListRequest()
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
    // detail(item) {
    //   if (
    //     this.$checkRole(
    //       Rules.System.ListRequest.actions.chitiet,
    //       Rules.System.ListRequest.id
    //     )
    //   ) {
    //     this.$store
    //       .dispatch('request/detailRequest', { id: item.id })
    //       .then((res) => {
    //         if (res.data.error.code === 0) {
    //           this.$store.commit('request/setDataDetailRequest', res.data.data)
    //           this.$router.push('')
    //         }
    //       })
    //   }
    //   // console.log(item)
    // },
    update(item) {
      // console.log(item)
      this.$store.commit('dataConfig/setUrlUpdateRequest', this.$route.fullPath)
      this.$store
        .dispatch('request/detailRequest', { id: item.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$store.commit('request/setDataDetailRequest', res.data.data)
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
        fromTime:
          moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 00:00:00',
        toTime:
          moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY') + ' 23:59:59',

        // content: this.$store.state.utilitiesState.contentFillter,
        requestInternational: this.$store.state.utilitiesState.international,
        content: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.contentFillter
        )
          ? this.$store.state.utilitiesState.saveTextContent
          : this.$store.state.utilitiesState.contentFillter,

        fieldId: this.$isNullOrEmpty(this.$store.state.dataConfig.field)
          ? this.field.join()
          : this.$store.state.dataConfig.field.join(),

        requestTypeId: this.$store.state.dataConfig.requestType.join(),

        pageIndex: this.pageIndex,
        pageSize: this.itemsPerPage,
        objectTypeId: this.$isNullOrEmpty(
          this.$store.state.dataConfig.objectTypeId
        )
          ? this.objectTypeId.join()
          : this.$store.state.dataConfig.objectTypeId.join(),
        // problemGroups:this.problemGroup

        requestName: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.problemNameFillter
        )
          ? ''
          : this.$store.state.utilitiesState.problemNameFillter,

        requestSolution: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.requestSolution
        )
          ? ''
          : this.$store.state.utilitiesState.requestSolution,

        requestReality: this.$isNullOrEmpty(
          this.$store.state.utilitiesState.requestReality
        )
          ? ''
          : this.$store.state.utilitiesState.requestReality,
      }
      this.$store.dispatch('request/requestHotIssueList', data).then((res) => {
        if (res.data.error.code === 0) {
          this.listItem = res.data.data.data
          this.pageCount = res.data.data.totalPages
          this.totalReqest = res.data.data.totalRecords

          // số lần tìm kiếm vấn đề
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
          // this.$store.commit('request/setContentRequest', null)
        }
      })
      // this.$store.dispatch('request/requestStatistic', data).then((res) => {
      //   if (res.data.error.code === 0) {
      //     this.totalReqest = res.data.data.totalRequest
      //     this.totalApprovedRequest = res.data.data.totalApprovedRequest
      //     this.totalNonReplyRequest = res.data.data.totalNonReplyRequest
      //     this.totalPendingRequest = res.data.data.totalPendingRequest
      //     this.totalRepliedRequest = res.data.data.totalRepliedRequest
      //   }
      // })
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
  watch: {
    '$store.state.utilitiesState.contentFillter'(value) {
      this.getListRequest()
    },
    '$store.state.utilitiesState.problemNameFillter'(value) {
      this.getListRequest()
    },
  },
}
</script>
<style lang="scss">
/*.hide-text p {*/
/*  display: none;*/
/*}*/
/*.hide-text p:first-child {*/
/*  display: block;*/
/*  */
/*}*/

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
// .styleHtml {
//   p {
//     margin-bottom: 0 !important;
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
</style>
