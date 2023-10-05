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
              Thêm mới vấn đề nóng
            </div>
          </v-col>

          <v-spacer></v-spacer>

          <v-col class="col-auto pa-0">
            <v-btn
              depressed
              class="primary text-none"
              :loading="loaddingSend"
              @click="checkInsert"
              >Thêm vấn đề nóng</v-btn
            >
          </v-col>
        </v-row>
        <CardGlobal
          class="mt-2"
          style="max-height: calc(100vh - 8.8rem); overflow-x: hidden"
        >
          <v-row class="ma-0">
            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">
                Lĩnh vực <span class="red--text"> *</span>:
              </div>
              <v-select
                outlined
                :items="$store.state.commonController.stateCommon.listField"
                clearable
                dense
                :error-messages="fieldError"
                @input="fieldError = []"
                @change="changeField(field)"
                no-data-text="Không có dữ liệu"
                v-model="field"
              ></v-select>
            </v-col>
            <v-col cols="2" class="pb-0">
              <div class="style-title-input pb-1">
                Đơn vị chuẩn bị <span class="red--text"> *</span>:
              </div>
              <v-autocomplete
                outlined
                :items="listUnit"
                :error-messages="unitError"
                @input="unitError = []"
                v-model="unit"
                dense
                no-data-text="Không có dữ liệu"
              ></v-autocomplete>
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
              <div class="style-title-input pb-1">Người chỉ đạo:</div>
              <v-select
                outlined
                :items="$store.state.commonController.stateCommon.listLeader"
                clearable
                v-model="leader"
                dense
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

            <v-col cols="5" class="pr-0 pt-0">
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
            <v-col cols="7" class="pt-0 pr-0">
              <div class="style-title-input pb-1">Thực trạng:</div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfig2"
                v-model="reality"
              >
              </ckeditor>
            </v-col>
            <v-col cols="5" class="pt-2 pr-0">
              <div class="style-title-input pb-1">Kinh nghiệm quốc tế:</div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfigheight700"
                v-model="internationalExp"
              >
              </ckeditor>
            </v-col>
            <v-col cols="7" class="pr-0 pt-2">
              <div class="style-title-input pb-1">
                Giải pháp <span class="red--text"> *</span>:
              </div>

              <ckeditor
                :spellcheck="false"
                :config="$store.state.dataConfig.editorConfigheight700"
                v-model="contentRequest"
                @input="contentRequestError = []"
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
              :items="
                $store.state.commonController.stateCommon.listProblemGroup
              "
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
                hide-details=""
                v-model="note"
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
                        :src="image.base64"
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
              outlined
              dense
              hide-details=""
              v-model="leadingIdeas"
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
                      @change="inputFile"
                      :value="reset_file_all"
                      id="input_file_add"
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
                    File đã tải lên
                  </v-col>
                  <v-col
                    v-for="(i, idx) in listFile"
                    :key="i.id"
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
                      >{{ i.name }}</span
                    >
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
    </div>
  </client-only>
</template>
<script>
import moment from 'moment'
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
      menuTVD: false,

      dateTVD: moment().format('YYYY-MM-DD'),
      contentReply: null,
      otherRequestUnit: false,
      loaddingSend: false,
      objectNameError: [],
      requestTypeError: [],
      fieldError: [],
      unitSendRequestError: [],
      unitSendRequest: null,
      unitError: [],
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
      objectName: null,
      unit: [],
      leader: null,
      policyProblems: [],
      listFieldTheme: [],
      note: null,
      leadingIdeas: null,
      contentRequest: null,
      contenrtReply: null,
      menu: false,
      menuDeadline: false,
      menuVB: false,
      dateVB: moment().format('YYYY-MM-DD'),
      Deadline: moment().format('YYYY-MM-DD'),
      datePhatHanhVB: moment().format('YYYY-MM-DD'),
      contentRequestError: [],
      listRequestUnit: [],
      file: [],
      reset_file: null,
      reset_file_all: null,
      listFile: [],
      openDeleteFile: false,
      objectTypeError: [],
      requestNameError: [],
      requestName: null,
      maxrequied: 6,
      images: [],
      listFileImage: [],

      reality: null,
      realityError: [],
      internationalExp: null,
    }
  },
  mounted() {
    this.listFileImage = []
    this.reset_file = []
    this.reset_file_all = []
    this.listFile = []
    this.commonSession()
    this.getListRequestUnit()
    this.geListCommonUnit()
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
            name: e[i].name,
            type: e[i].type,
            base64: data,
          })
        })
      }
    },
    changeObjectType() {
      this.otherRequestUnit = false
      this.objectName = null
      this.getListRequestUnit()
    },

    deteFile(value) {
      this.listFile.splice(value, 1)
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
      return window.document.getElementById('input_file_add').click()
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
      window.history.back()
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
      this.$store.commit('request/setDataDetailRequest', null)
      this.back()
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
          data: this.listFile[i].base64,
          fileName: this.listFile[i].name,
          url: null,
        })
      }

      let data = {
        objectRequestName: null,
        comingTime: this.selectDateVB + ' 00:00:00', // ngày văn bản đến
        deadline: null, // hạn hoàn thành
        fieldId: this.field, // lĩnh vục
        fieldThemeId: this.fieldTheme, // chủ đề trong lĩnh vực
        hotProblems: this.hotProblems, // vấn đề nóng
        requestUnit: null,
        requestName: this.$isNullOrEmpty(this.requestName)
          ? null
          : this.requestName.replace(/<[^>]+>/g, ''),
        leaderId: this.leader, // người chỉ đạo
        leadingIdeas: this.leadingIdeas, // ý kiến chỉ đạo
        note: this.note, // ghi chú
        // file: this.attachFileUrl, // file đính kèm
        files, // nhiều file đính kèm
        periodId: this.period, // kỳ họp
        policyProblems: null,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? []
          : [this.problemGroup], // nhóm vấn đề
        relatedUnitIds: null,
        releaseTime: null, // ngày phát hành
        replyContent: null,
        replyNumber: '',
        requestContent: this.contentRequest,
        // nội dung vấn đề
        requestTypeId: null,
        sessionId: this.session, // quốc hội khóa
        symbols: this.symbol, // ký hiện văn bản
        unitIds: [this.unit], // đơn vị đề xuất
        requestObjectTypeId: null,
        anwer: null, // nội dung trả lời,
        images,
        reality: this.reality,
        internationalExp: this.internationalExp,
      }
      // console.log(this.unitSendRequest)
      this.$store.dispatch('request/requestHotIssueAdd', data).then((res) => {
        if (res.data.error.code === 0) {
          this.$showSuccess(this, 'Thêm mới vấn đề nóng thành công')
          this.$router.push('/quan-tri/danh-sach-van-de-nong')
          this.$store.commit('request/setDataDetailRequest', null)
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
    selectDeadline() {
      return moment(this.Deadline).format('DD/MM/YYYY')
    },
    selectDateTVD() {
      return moment(this.dateTVB).format('DD/MM/YYYY')
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
.ql-snow {
  .ql-picker {
    &.ql-size {
      .ql-picker-label,
      .ql-picker-item {
        &::before {
          content: attr(data-value) !important;
        }
      }
    }
  }
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  max-height: 200px;
  overflow-x: auto;
}
#responsibilityAdd .ql-editor {
  min-height: 700px;
}
</style>
