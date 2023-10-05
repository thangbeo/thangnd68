<template>
  <client-only>
    <div>
      <CardGlobal class="mt-1">
        <v-row class="ml-0 my-0 mr-5">
          <v-col class="col-auto pa-0">
            <v-btn @click="back" icon>
              <v-icon size="40" color="primary">mdi-arrow-left-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col class="col-auto pa-0 ml-2" style="align-self: center">
            <div
              style="font-size: 1.3rem; font-weight: 500"
              class="primary--text text-none"
            >
              Cập nhật vấn đề nóng
            </div>
          </v-col>

          <v-spacer></v-spacer>

          <v-col class="col-auto pa-0">
            <v-btn
              depressed
              class="primary text-none"
              :loading="loaddingSend"
              @click="checkInsert"
            >
              Cập nhật vấn đề nóng</v-btn
            >
          </v-col>
        </v-row>
        <CardGlobal
          class="mt-2"
          style="max-height: calc(100vh - 8.8rem); overflow-x: hidden"
        >
          <v-row class="ma-0">
            <v-col cols="2" class="pb-0 pr-0">
              <div class="style-title-input pb-1">
                Lĩnh vực <span class="red--text">*</span>:
              </div>
              <v-select
                outlined
                :error-messages="fieldError"
                @input="fieldError = []"
                :items="$store.state.commonController.stateCommon.listField"
                clearable
                dense
                @change="changeField(field)"
                no-data-text="Không có dữ liệu"
                v-model="field"
              ></v-select>
            </v-col>
            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">
                Đơn vị chuẩn bị<samp class="red--text">*</samp>:
              </div>
              <v-autocomplete
                outlined
                :items="listUnit"
                v-model="unit"
                :error-messages="unitError"
                @input="unitError = []"
                dense
                no-data-text="Không có dữ liệu"
              ></v-autocomplete>
            </v-col>

            <v-col cols="2" class="pb-0 pr-0">
              <div class="style-title-input pb-1">Người chỉ đạo:</div>
              <v-select
                outlined
                clearable
                :items="$store.state.commonController.stateCommon.listLeader"
                v-model="leader"
                dense
                no-data-text="Không có dữ liệu"
              ></v-select>
            </v-col>
            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">Nhóm vấn đề nóng:</div>
              <v-select
                outlined
                clearable
                dense
                v-model="hotProblems"
                multiple
                :items="
                  $store.state.commonController.stateCommon.listHotProblem
                "
                no-data-text="Không có dữ liệu"
              ></v-select>
            </v-col>

            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">Ngày vấn đề:</div>
              <v-menu
                v-model="menuVB"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    v-on="on"
                    outlined
                    v-model="selectDateVB"
                    readonly
                    prepend-inner-icon="mdi-calendar-clock-outline"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="vi"
                  @change="menuVB = false"
                  v-model="dateVB"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">Ngày tạo vấn đề:</div>
              <v-menu
                v-model="menuTVD"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    v-on="on"
                    outlined
                    v-model="selectDateTVD"
                    readonly
                    disabled
                    prepend-inner-icon="mdi-calendar-clock-outline"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="vi"
                  @change="menuTVD = false"
                  v-model="dateTVD"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="5" class="pr-0">
              <div class="style-title-input pb-1">
                Vấn đề <span class="red--text"> *</span>:
              </div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfig2"
                v-model="requestName"
                @input="requestNameError = []"
              >
              </ckeditor>
              <div
                v-if="$isNullOrEmpty(requestName)"
                class="fs-12 red--text ml-3"
              >
                {{ requestNameError[0] }}
              </div>
            </v-col>
            <v-col cols="7">
              <div class="style-title-input pb-1">Thực trạng:</div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfig2"
                v-model="reality"
              >
              </ckeditor>
            </v-col>
            <v-col cols="5" class="pr-0">
              <div class="style-title-input pb-1">Kinh nghiệm quốc tế:</div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfigheight700"
                v-model="internationalExp"
              >
              </ckeditor>
            </v-col>
            <v-col cols="7">
              <div class="style-title-input pb-1">
                Giải pháp <span class="red--text"> *</span>:
              </div>

              <ckeditor
                :spellcheck="false"
                @input="contentRequestError = []"
                :config="$store.state.dataConfig.editorConfigheight700"
                v-model="contentRequest"
              >
              </ckeditor>
              <div
                v-if="$isNullOrEmpty(contentRequest)"
                class="fs-12 red--text ml-3"
              >
                {{ contentRequestError[0] }}
              </div>
            </v-col>

            <!-- <v-col cols="2" class="pb-0">
          <div class="style-title-input pb-1">Chủ đề trong lĩnh vực:</div>
          <v-select
            clearable
            outlined
            dense
            :items="listFieldTheme"
            v-model="fieldTheme"
            no-data-text="Không có dữ liệu"
          ></v-select>
        </v-col> -->

            <!-- <v-col cols="2" class="pb-0">
          <div class="style-title-input pb-1">Kí hiệu văn bản:</div>
          <v-text-field outlined dense v-model="symbol"></v-text-field>
        </v-col> -->
            <!-- <v-col cols="2" class="pb-0">
          <div class="style-title-input pb-1">Nhóm vấn đề:</div>
          <v-select
            :items="$store.state.commonController.stateCommon.listProblemGroup"
            clearable
            outlined
            dense
            no-data-text="Không có dữ liệu"
            v-model="problemGroup"
          ></v-select>
        </v-col> -->

            <!-- <v-col cols="2" class="py-0">
          <div class="style-title-input pb-1">Quốc hội khóa:</div>
          <v-select
            outlined
            :items="listSession"
            @change="changeSession(session)"
            v-model="session"
            clearable
            dense
            no-data-text="Không có dữ liệu"
          ></v-select>
        </v-col> -->
            <!-- <v-col cols="2" class="py-0">
          <div class="style-title-input pb-1">Kỳ họp:</div>
          <v-select
            outlined
            clearable
            :items="listPeriod"
            v-model="period"
            dense
            no-data-text="Không có dữ liệu"
          ></v-select>
        </v-col> -->

            <!-- <v-col cols="2" class="py-0">
          <div class="style-title-input pb-1">Hạn hoàn thành:</div>
          <v-menu
            v-model="menuDeadline"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                dense
                v-on="on"
                outlined
                v-model="selectDeadline"
                readonly
                prepend-inner-icon="mdi-calendar-clock-outline"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="vi"
              @change="menuDeadline = false"
              v-model="Deadline"
            ></v-date-picker>
          </v-menu>
        </v-col> -->
            <!-- <v-col cols="2" class="py-0">
          <div class="style-title-input pb-1">Ngày phát hành VB:</div>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                dense
                v-on="on"
                outlined
                v-model="selectDatePhatHanhVB"
                readonly
                prepend-inner-icon="mdi-calendar-clock-outline"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="vi"
              @change="menu = false"
              v-model="datePhatHanhVB"
            ></v-date-picker>
          </v-menu>
        </v-col> -->
          </v-row>
          <v-row class="ma-0">
            <v-col cols="5" class="py-0 pr-0">
              <div class="style-title-input pb-1">Ghi chú:</div>
              <v-textarea
                :spellcheck="false"
                outlined
                dense
                v-model="note"
                hide-details=""
                rows="4"
                no-data-text="Không có dữ liệu"
              ></v-textarea>
            </v-col>

            <v-col cols="7">
              <v-card
                outlined
                height="140"
                style="
                  overflow-y: auto;
                  background-color: #f5f7fe;
                  border: none;
                "
                class="d-flex align-center"
              >
                <div
                  v-if="images.length < maxrequied"
                  class="d-flex justify-center"
                  style="margin-top: 6px"
                >
                  <div
                    class="ml-2"
                    style="cursor: pointer"
                    @click="select_file_image"
                  >
                    <IconSelectFile />
                  </div>
                </div>
                <slot></slot>
                <draggable :list="listFileImage" class="d-flex justify-center">
                  <template v-for="(image, idx) in listFileImage">
                    <div :key="`${idx}+${image}`">
                      <v-img
                        :src="
                          $isNullOrEmpty(image.base64)
                            ? image.name
                            : image.base64
                        "
                        style="cursor: move"
                        class="ml-2"
                        height="120"
                        width="120"
                      >
                      </v-img>
                      <v-icon
                        style="
                          cursor: pointer;
                          position: absolute;
                          top: 10px;
                          margin-left: 108px;
                        "
                        size="20"
                        color="error"
                        @click="delete_img_slider(idx)"
                      >
                        mdi-close-circle
                      </v-icon>
                    </div>
                  </template>
                </draggable>
              </v-card>
              <div
                v-if="
                  (listFileImage || []).length !== 0 && listFileImage.length > 5
                "
                class="v-messages theme--light error--text mt-1 ml-2"
                role="alert"
              >
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">Tối đa 5 hình</div>
                </div>
              </div>
              <div v-else class="mt-1 ml-2"></div>
              <v-file-input
                id="input_file_image"
                ref="input_file_image"
                :value="reset_file"
                multiple
                accept="image/png, image/jpeg, image/bmp"
                class="d-none"
                @change="inputFileImage"
              ></v-file-input>
            </v-col>
            <!-- <v-col cols="6" class="py-0">
            <div class="style-title-input pb-1">Ý kiến chỉ đạo:</div>
            <v-textarea
              :spellcheck="false"
              outlined
              dense
              v-model="leadingIdeas"
              hide-details=""
              rows="2"
              no-data-text="Không có dữ liệu"
            ></v-textarea>
          </v-col> -->
          </v-row>
          <v-row style="width: 100%" class="ma-0 pt-3">
            <v-col cols="12" md="6" class="pt-0">
              <div class="mb-1 d-flex">
                <v-img
                  src="/background/Word.png"
                  class="mr-2"
                  max-width="20"
                ></v-img>
                <span class="black--text" style="font-weight: 500"
                  >Tài liệu đính kèm</span
                >
              </div>
              <div
                class="mt-2"
                style="
                  border: 2px dashed rgb(152, 157, 255);
                  border-radius: 10px;
                "
              >
                <v-row
                  class="ma-0"
                  justify="center"
                  align="center"
                  style="height: 115px"
                >
                  <v-col cols="12" class="d-flex justify-center pb-0">
                    <v-btn icon @click="selectFileOpen">
                      <v-icon size="65" color="primary">
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center py-0">
                    <v-btn text class="primary--text" @click="selectFileOpen">
                      TẢI FILE LÊN
                    </v-btn>
                    <v-file-input
                      :value="reset_file_all"
                      @change="inputFile"
                      id="input_file_update"
                      class="d-none"
                      multiple
                      accept=".xlsx,.xls,.doc, .docx, .pdf, image/*"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pt-0 pt-md-3">
              <div class="mb-1"></div>
              <div class="mt-md-3">
                <v-row
                  class="ma-0"
                  style="max-height: 115px; overflow: auto"
                  v-if="(listFile || []).length !== 0"
                >
                  <v-col cols="12" class="pb-1 pt-0 pt-md-3">
                    File đã tải lên ({{ listFile.length }})
                  </v-col>
                  <v-col
                    v-for="(i, idx) in listFile"
                    :key="`${i}${idx}`"
                    cols="12"
                    class="py-0 d-flex align-center"
                  >
                    <span
                      class="black--text"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 1;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                      "
                    >
                      {{ $isNullOrEmpty(i.name) ? i.fileName : i.name }}
                    </span>
                    <span class="ml-1"
                      ><v-btn icon small @click="deteFile(idx)">
                        <v-icon size="20" color="red">mdi-delete</v-icon></v-btn
                      ></span
                    >
                  </v-col>
                </v-row>
                <v-row class="ma-0" style="max-height: 115px" v-else>
                  <v-col cols="12" class="pb-1"> File đã tải lên </v-col>

                  <v-col
                    cols="12"
                    class="py-0 d-flex align-center"
                    style="font-style: italic"
                  >
                    Chưa có file nào tải lên
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </CardGlobal>
      </CardGlobal>

      <yes-no-alert
        :open="openDeleteFile"
        alert-msg="Bạn có muốn xóa file này không?"
        @toggle="openDeleteFile = !openDeleteFile"
        @OK="deleteFile"
      >
      </yes-no-alert>
    </div>
  </client-only>
</template>
<script>
import moment from 'moment'
import Cookies from 'js-cookie'
import Draggable from 'vuedraggable'
import IconSelectFile from '~/components/van-de-nong/icon/SelectFile.vue'
export default {
  transition: 'slide-x-reverse-transition',
  components: {
    IconSelectFile,
    Draggable,
  },

  data() {
    return {
      loaddingSend: false,
      objectName: null,
      contentReply: null,
      objectNameError: [],
      file: [],

      openDeleteFile: false,
      unitError: [],
      unitSendRequest: {},
      unitSendRequestError: [],
      objectTypeError: [],
      fieldError: [],
      requestTypeError: [],
      objectType: null,
      fieldTheme: null,
      session: null,
      period: null,
      listSession: [],
      listPeriod: [],
      listUnit: [],
      unitLienQuan: [],
      hotProblems: [],
      problemGroups: [],
      requestType: null,
      problemGroup: null,
      symbol: null,
      field: null,
      unit: [],
      leader: null,
      policyProblems: [],
      listFieldTheme: [],
      note: null,
      leadingIdeas: null,
      contentRequest: null,
      contenrtReply: null,
      menuTVD: false,

      dateTVD: moment().format('YYYY-MM-DD'),
      menu: false,
      menuDeadline: false,
      menuVB: false,
      dateVB: moment().format('YYYY-MM-DD'),
      Deadline: moment().format('YYYY-MM-DD'),
      datePhatHanhVB: moment().format('YYYY-MM-DD'),
      contentRequestError: [],
      listRequestUnit: [],
      otherRequestUnit: false,
      unitSendRequestName: null,
      detailData: {},
      requestNameError: [],
      requestName: null,
      maxrequied: 6,
      images: [],
      listFileImage: [],
      file: [],
      reset_file: null,
      reset_file_all: null,
      listFile: [],
      reality: null,
      realityError: [],
      internationalExp: null,
      indexFile: null,
    }
  },

  mounted() {
    setTimeout(() => {
      this.set_again()
    }, 300)
  },
  methods: {
    select_file_image() {
      return window.document.getElementById('input_file_image').click()
    },
    delete_img_slider(value) {
      this.listFileImage.splice(value, 1)
      this.reset_file = []
    },
    inputFileImage(e) {
      for (let i = 0; i < e.length; i++) {
        this.getBase64(e[i]).then((data) => {
          this.listFileImage.push({
            name: null,
            type: e[i].type,
            base64: data,
          })
        })
      }
    },
    set_again() {
      this.$store
        .dispatch('request/requestHotIssueDetail', {
          id: this.$route.params.id,
        })
        .then((res) => {
          if (!res.error) {
            if ((res.data.data.images || []).length !== 0) {
              res.data.data.images.map((item) => {
                this.listFileImage.push({
                  name: item.url,
                  type: null,
                  base64: null,
                })
              })
            }

            if (!this.$isNullOrEmpty(res.data.data.requestType)) {
              this.requestType = res.data.data.requestType.id
            }

            this.symbol = res.data.data.symbols
            this.field = this.$isNullOrEmpty(res.data.data.field)
              ? ''
              : res.data.data.field.id
            if (!this.$isNullOrEmpty(this.field)) {
              this.geListCommonUnit()
              this.changeField(this.field)
              this.fieldTheme =
                res.data.data.fieldTheme != null
                  ? res.data.data.fieldTheme.id
                  : null
            }

            res.data.data.unitReplyRequests.map((item) => {
              this.unit = item.unit.id
            })

            if (!this.$isNullOrEmpty(res.data.data.session)) {
              this.session = res.data.data.session.id
              if (!this.$isNullOrEmpty(this.session)) {
                this.changeSession(this.session)
              }
            }
            if (!this.$isNullOrEmpty(res.data.data.period)) {
              this.period = res.data.data.period.id
            }

            this.objectName = res.data.data.objectRequestName
            this.contentReply = res.data.data.anwer

            this.requestName = res.data.data.requestName

            this.reality = res.data.data.reality

            this.internationalExp = res.data.data.internationalExp

            if (
              this.$isNullOrEmpty(res.data.data.requestUnit) ||
              res.data.data.requestUnit.fullName !=
                res.data.data.objectRequestName
            ) {
              this.otherRequestUnit = true
            }
            if (!this.$isNullOrEmpty(res.data.data.requestObjectType)) {
              this.objectType = res.data.data.requestObjectType.id
            }

            if (res.data.data.fileAttach != null) {
              this.attachFileUrl = res.data.data.fileAttach

              this.listFile = res.data.data.fileAttachs
            }

            this.leader =
              res.data.data.leader === null ? '' : res.data.data.leader.id
            this.note = res.data.data.note
            this.leadingIdeas = res.data.data.leadingIdeas
            this.contentRequest = res.data.data.requestContent

            res.data.data.relatedUnits.map((item) => {
              this.unitLienQuan.push(item.id)
            })

            this.unitSendRequest = !this.$isNullOrEmpty(
              res.data.data.requestUnit
            )
              ? res.data.data.requestUnit.id
              : null
            this.unitSendRequestName = !this.$isNullOrEmpty(
              res.data.data.requestUnit
            )
              ? res.data.data.requestUnit.fullName
              : null

            if (!this.$isNullOrEmpty(res.data.data.problemGroups)) {
              res.data.data.problemGroups.map((item) => {
                this.problemGroup = Number(item.id)
              })
            }
            if (!this.$isNullOrEmpty(res.data.data.hotProblems)) {
              res.data.data.hotProblems.map((item) => {
                this.hotProblems.push(item.id)
              })
            }
            if (!this.$isNullOrEmpty(res.data.data.policyProblems)) {
              res.data.data.policyProblems.map((item) => {
                this.policyProblems.push(item.id)
              })
            }

            this.selectDateTVD = moment(
              res.data.data.createTime,
              'DD/MM/YYYY HH:mm:ss'
            ).format('YYYY-MM-DD')

            if (!this.$isNullOrEmpty(res.data.data.comingTime)) {
              this.dateVB = moment(
                res.data.data.comingTime,
                'DD/MM/YYYY HH:mm:ss'
              ).format('YYYY-MM-DD')
            }

            if (!this.$isNullOrEmpty(res.data.data.deadline)) {
              this.Deadline = moment(
                res.data.data.deadline,
                'DD/MM/YYYY HH:mm:ss'
              ).format('YYYY-MM-DD')
            }
            if (!this.$isNullOrEmpty(res.data.data.releaseTime)) {
              this.datePhatHanhVB = moment(
                res.data.data.releaseTime,
                'DD/MM/YYYY HH:mm:ss'
              ).format('YYYY-MM-DD')
            }
          }
        })

      this.commonSession()

      this.getListRequestUnit()
    },
    changeObjectType() {
      this.otherRequestUnit = false
      this.unitSendRequest = null
      if (this.objectType == 1) {
        this.objectName = null
      } else {
        this.objectName =
          this.$store.state.request.dataDetailRequest.objectRequestName
      }
      this.getListRequestUnit()
    },
    deteFile(index) {
      this.reset_file_all = []
      this.openDeleteFile = true
      this.indexFile = index
    },
    deleteFile() {
      this.listFile.splice(this.indexFile, 1)
      this.reset_file_all = []
    },
    inputFile(e) {
      for (let i = 0; i < e.length; i++) {
        this.getBase64(e[i]).then((data) => {
          this.listFile.push({
            name: e[i].name,
            type: e[i].type,
            base64: data,
          })
        })
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    selectFileOpen() {
      return window.document.getElementById('input_file_update').click()
    },
    getListRequestUnit() {
      let data = {
        requestObjectTypeId: this.objectType == 4 ? this.objectType : null,
      }
      this.listRequestUnit = []
      this.$store
        .dispatch('commonController/commonRequestUnit', data)
        .then((res) => {
          // console.log(res)
          res.data.data.map((item) => {
            this.listRequestUnit.push({
              text: item.fullName,
              value: item.id,
            })
          })
        })
    },
    back() {
      this.$router.push('/quan-tri/danh-sach-van-de-nong')
    },
    commonSession() {
      this.$store.dispatch('commonController/commonSession').then((res) => {
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            this.listSession.push({
              value: item.id,
              text: item.name,
            })
          })
        }
      })
    },
    changeSession(session) {
      if (!this.$isNullOrEmpty(session)) {
        let data = {
          sessionId: session,
        }
        this.$store
          .dispatch('commonController/commonPeriod', data)
          .then((res) => {
            if (res.data.error.code === 0) {
              res.data.data.map((item) => {
                this.listPeriod.push({
                  value: item.id,
                  text: item.name,
                })
              })
            }
          })
      } else {
        this.listPeriod = []
      }
    },
    geListCommonUnit() {
      this.listUnit = []

      this.$store.dispatch('commonController/commonUnitAll').then((res) => {
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            this.listUnit.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },
    changeField(field) {
      if (!this.$isNullOrEmpty(field)) {
        this.listFieldTheme = []
        let data = {
          fieldId: field,
        }
        this.$store
          .dispatch('commonController/commonFieldTheme', data)
          .then((res) => {
            if (res.data.error.code === 0) {
              res.data.data.map((item) => {
                this.listFieldTheme.push({
                  value: item.id,
                  text: item.name,
                })
              })
            }
          })
      } else {
        this.listFieldTheme = []
        this.field = null
      }
    },
    close() {
      this.$router.push('/quan-tri/danh-sach-van-de-nong')
    },
    checkInsert() {
      let isError = false

      if (this.$isNullOrEmpty(this.requestName)) {
        isError = true
        this.requestNameError = ['Vui lòng nhập vấn đề']
      }

      if (this.$isNullOrEmpty(this.contentRequest)) {
        isError = true
        this.contentRequestError = ['Vui lòng nhập giải pháp']
      }
      if (this.$isNullOrEmpty(this.unit)) {
        isError = true
        this.unitError = ['Vui lòng chọn đơn vị']
      }

      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui lòng chọn lĩnh vực']
      }

      if (!isError) {
        this.insertRequest()
      }
    },

    insertRequest() {
      this.loaddingSend = true
      const images = []
      for (let i = 0; i < this.listFileImage.length; i++) {
        images.push({
          url: this.listFileImage[i].name,
          data: this.listFileImage[i].base64,
        })
      }

      const files = []
      for (let i = 0; i < this.listFile.length; i++) {
        files.push({
          data: this.$isNullOrEmpty(this.listFile[i].data)
            ? this.$isNullOrEmpty(this.listFile[i].base64)
              ? null
              : this.listFile[i].base64
            : this.listFile[i].data,
          fileName: this.$isNullOrEmpty(this.listFile[i].name)
            ? this.listFile[i].fileName
            : this.listFile[i].name,
          url: this.$isNullOrEmpty(this.listFile[i].data)
            ? this.$isNullOrEmpty(this.listFile[i].url)
              ? null
              : this.listFile[i].url
            : null,
        })
      }

      let str = null
      if (this.objectType == 1) {
        str = this.objectName
      } else if (this.objectType == 2 || this.objectType == 3) {
        str = this.unitSendRequest.text
      } else if (this.objectType == 4) {
        if (this.otherRequestUnit) {
          str = this.objectName
        } else {
          str = !this.$isNullOrEmpty(this.unitSendRequestName)
            ? this.unitSendRequestName
            : this.unitSendRequest.text
        }
      }
      let data = {
        objectRequestName: null,
        requestName: this.requestName,
        comingTime: this.selectDateVB + ' 00:00:00',
        deadline: null,
        fieldId: this.field,
        fieldThemeId: this.fieldTheme,
        hotProblems: this.hotProblems,
        id: this.$route.params.id,
        leaderId: this.leader,
        leadingIdeas: this.leadingIdeas,
        requestUnit: null,
        note: this.note,
        // file: this.attachFileUrl,
        files,
        periodId: this.period,
        policyProblems: this.policyProblems,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? []
          : [this.problemGroup],
        relatedUnitIds: null,
        releaseTime: null,
        replyContent: null,
        replyNumber: '',
        requestContent: this.contentRequest,
        requestTypeId: null,
        sessionId: this.session,
        symbols: this.symbol,
        unitIds: [this.unit],
        requestObjectTypeId: null,
        anwer: null,
        images,
        reality: this.reality,
        internationalExp: this.internationalExp,
      }

      this.$store
        .dispatch('request/requestHotIssueUpdate', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Cập nhật vấn đề nóng thành công')
            this.$router.push('/quan-tri/danh-sach-van-de-nong')
            this.loaddingSend = false
          } else this.loaddingSend = false
        })
    },
  },
  computed: {
    selectDatePhatHanhVB() {
      return moment(this.datePhatHanhVB).format('DD/MM/YYYY')
    },
    selectDateVB() {
      return moment(this.dateVB).format('DD/MM/YYYY')
    },
    selectDateTVD() {
      return moment(this.dateTVD).format('DD/MM/YYYY')
    },
    selectDeadline() {
      return moment(this.Deadline).format('DD/MM/YYYY')
    },
  },
}
</script>
<style lang="scss">
.style-title-input {
  font-size: 0.9rem;
  font-weight: 500;
}
.v-input__append-outer {
  margin-top: 2px !important;
}
#responsibilityEdit .ql-editor {
  min-height: 700px;
}
</style>
