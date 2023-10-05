<template>
  <client-only>
    <div>
      <CardGlobal>
        <div
          style="font-size: 1.3rem; font-weight: 500"
          class="pa-1 primary--text"
        >
          <!-- history.back() -->

          <v-btn @click="back" icon>
            <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
          </v-btn>

          Thêm mới kiến nghị
        </div>
      </CardGlobal>
      <CardGlobal class="mt-3">
        <v-row class="ma-0">
          <v-col cols="4" class="pb-0">
            <div class="style-title-input pb-1">
              Loại kiến nghị <span class="red--text"> *</span>:
            </div>
            <v-select
              outlined
              :items="$store.state.commonController.stateCommon.listRequestType"
              clearable
              dense
              :error-messages="requestTypeError"
              @input="requestTypeError = []"
              no-data-text="Không có dữ liệu"
              v-model="requestType"
            ></v-select>
          </v-col>
          <v-col cols="4" class="pb-0">
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
          <v-col cols="4" class="pb-0">
            <div class="style-title-input pb-1">Chủ đề trong lĩnh vực:</div>
            <v-select
              clearable
              outlined
              dense
              :items="listFieldTheme"
              v-model="fieldTheme"
              no-data-text="Không có dữ liệu"
            ></v-select>
          </v-col>

          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">
              Đối tượng kiến nghị <span class="red--text"> *</span>:
            </div>
            <v-select
              clearable
              outlined
              :error-messages="objectTypeError"
              @input="objectTypeError = []"
              dense
              v-model="objectType"
              @change="changeObjectType"
              :items="$store.state.commonController.stateCommon.itemObjectType"
              no-data-text="Không có dữ liệu"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            class="py-0"
            v-if="objectType === 1 || (objectType === 4 && otherRequestUnit)"
          >
            <div class="style-title-input pb-1">
              <span v-if="objectType === 1">Tên đại biểu quốc hội</span>
              <span v-else>Tên đối tượng quản lý</span>
              <span class="red--text">*</span>:
            </div>
            <v-text-field
              clearable
              outlined
              dense
              v-model="objectName"
              :error-messages="objectNameError"
              @input="objectNameError = []"
              no-data-text="Không có dữ liệu"
            >
              <template v-slot:append-outer v-if="objectType !== 1">
                <v-tooltip bottom class="mt-0">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-0"
                      @click="otherRequestUnit = false"
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="success" class="mt-0"
                        >mdi-plus-circle</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Chọn đối tượng kiến nghị</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="4" class="py-0" v-if="!otherRequestUnit">
            <div class="style-title-input pb-1">
              Đơn vị kiến nghị <span class="red--text"> *</span>:
            </div>
            <v-autocomplete
              clearable
              outlined
              dense
              :items="listRequestUnit"
              :error-messages="unitSendRequestError"
              @input="unitSendRequestError = []"
              v-model="unitSendRequest"
              return-object
              no-data-text="Không có dữ liệu"
            >
              <template v-slot:prepend-item v-if="objectType === 4">
                <v-list-item ripple @click="otherRequestUnit = true">
                  <v-list-item-content>
                    <v-list-item-title>Đơn vị khác</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">Kí hiệu văn bản:</div>
            <v-text-field outlined dense v-model="symbol"></v-text-field>
          </v-col>
          <v-col cols="4" class="py-0">
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
          </v-col>
          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">
              Đơn vị chủ trì <span class="red--text"> *</span>:
            </div>
            <v-autocomplete
              chips
              small-chips
              deletable-chips
              outlined
              :items="listUnit"
              :error-messages="unitError"
              @input="unitError = []"
              v-model="unit"
              dense
              no-data-text="Không có dữ liệu"
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">Đơn vị liên quan:</div>
            <v-select
              multiple
              chips
              small-chips
              deletable-chips
              outlined
              :items="$store.state.commonController.stateCommon.listUnit"
              v-model="unitLienQuan"
              dense
              no-data-text="Không có dữ liệu"
            ></v-select>
          </v-col> -->
          <v-col cols="4" class="py-0">
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
          <v-col cols="4" class="py-0">
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
          </v-col>
          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">Kỳ họp:</div>
            <v-select
              outlined
              clearable
              :items="listPeriod"
              v-model="period"
              dense
              no-data-text="Không có dữ liệu"
            ></v-select>
          </v-col>
          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">Ngày VB đến:</div>
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

          <v-col cols="4" class="py-0">
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
          </v-col>
          <v-col cols="4" class="py-0">
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
          </v-col>
          <v-col cols="4" class="py-0">
            <div class="style-title-input pb-1">Vấn đề nóng:</div>
            <v-select
              outlined
              clearable
              dense
              v-model="hotProblems"
              multiple
              :items="$store.state.commonController.stateCommon.listHotProblem"
              no-data-text="Không có dữ liệu"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="6" class="py-0">
            <div class="style-title-input pb-1">Ghi chú:</div>
            <v-textarea
              outlined
              dense
              v-model="note"
              rows="2"
              no-data-text="Không có dữ liệu"
            ></v-textarea>
          </v-col>
          <v-col cols="6" class="py-0">
            <div class="style-title-input pb-1">Ý kiến chỉ đạo:</div>
            <v-textarea
              outlined
              dense
              v-model="leadingIdeas"
              rows="2"
              no-data-text="Không có dữ liệu"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="style-title-input pb-1">
              Nội dung kiến nghị <span class="red--text"> *</span>:
            </div>

            <ckeditor
              :spellcheck="false"
              @input="contentRequestError = []"
              :config="$store.state.dataConfig.editorConfig"
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
              style="border: 2px dashed rgb(152, 157, 255); border-radius: 10px"
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
                    :value="file"
                    @change="inputFile($event)"
                    id="input_file"
                    class="d-none"
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
                v-if="listFile != null"
              >
                <v-col cols="12" class="pb-1 pt-0 pt-md-3">
                  File đã tải lên
                </v-col>
                <v-col cols="12" class="py-0 d-flex align-center">
                  <span
                    class="black--text"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 1;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                    "
                    >{{ listFile.name }}</span
                  >
                  <span class="ml-1"
                    ><v-btn icon small @click="deteFile">
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
      <v-row class="ma-0">
        <v-spacer></v-spacer>
        <v-col class="col-auto">
          <v-btn depressed class="secondary text-none" @click="close"
            >Đóng</v-btn
          >
        </v-col>

        <v-col class="col-auto px-0">
          <v-btn
            depressed
            class="primary text-none"
            :loading="loaddingSend"
            @click="checkInsert"
            >Gửi kiến nghị</v-btn
          >
        </v-col>
      </v-row>
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
export default {
  transition: 'slide-x-reverse-transition',
  components: {},
  data() {
    return {
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
      listFile: null,
      openDeleteFile: false,
      objectTypeError: [],
    }
  },
  mounted() {
    this.commonSession()
    this.getListRequestUnit()
    this.geListCommonUnit()
  },
  methods: {
    changeObjectType() {
      this.otherRequestUnit = false
      this.objectName = null
      this.getListRequestUnit()
    },
    deteFile() {
      this.file = null
      this.openDeleteFile = true
    },
    deleteFile() {
      this.listFile = null
      this.file = null
      this.attachFileUrl = null
    },
    inputFile(e) {
      this.file = null
      this.listFile = {
        name: e.name,
        type: e.type,
      }
      this.getBase64(e).then((data) => {
        this.attachFileUrl = {
          url: null,
          data: data,
          fileName: e.name,
        }
      })
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
      return window.document.getElementById('input_file').click()
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

      if (
        this.objectType == 1 ||
        (this.objectType == 4 && this.otherRequestUnit)
      ) {
        if (this.$isNullOrEmpty(this.objectName)) {
          this.unitSendRequestError = []
          isError = true
          this.objectNameError = [
            this.objectType == 1
              ? 'Vui lòng nhập tên đại biểu quốc hội'
              : 'Vui lòng nhập tên đối tượng quản lý',
          ]
        }
      } else {
        if (this.$isNullOrEmpty(this.unitSendRequest)) {
          this.objectNameError = []
          isError = true
          this.unitSendRequestError = ['Vui lòng chọn đơn vị gửi kiến nghị']
        }
      }
      if (this.$isNullOrEmpty(this.objectType)) {
        isError = true
        this.objectTypeError = ['Vui lòng chọn đối tượng kiến nghị']
      }
      if (this.$isNullOrEmpty(this.contentRequest)) {
        isError = true
        this.contentRequestError = ['Vui lòng nhập nội dung kiến nghị']
      }
      if (this.$isNullOrEmpty(this.unit)) {
        isError = true
        this.unitError = ['Vui lòng chọn đơn vị']
      }

      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui lòng chọn lĩnh vực']
      }
      if (this.$isNullOrEmpty(this.requestType)) {
        isError = true
        this.requestTypeError = ['Vui lòng chọn loại kiến nghị']
      }
      if (!isError) {
        this.insertRequest()
      }
    },
    requestReply() {
      this.$store
        .dispatch('request/requestReply', {
          id: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Trả lời kiến nghị thành công')
            this.$router.push('/kien-nghi/danh-sach-kien-nghi')
          }
        })
    },
    requestUnApproval() {
      this.$store
        .dispatch('request/requestUnApproval', {
          id: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Hủy duyệt kiến nghị thành công')
            this.$router.push('/kien-nghi/danh-sach-kien-nghi')
          }
        })
    },
    requestApproval() {
      this.$store
        .dispatch('request/requestApproval', {
          id: this.$store.state.request.dataDetailRequest.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Duyệt kiến nghị thành công')
            this.$router.push('/kien-nghi/danh-sach-kien-nghi')
          }
        })
    },
    insertRequest() {
      this.loaddingSend = true
      let data = {
        objectRequestName:
          this.objectType == 1 ||
          (this.objectType == 4 && this.otherRequestUnit)
            ? this.objectName
            : this.unitSendRequest.text,
        comingTime: this.selectDateVB + ' 00:00:00',
        deadline: this.selectDeadline + ' 00:00:00',
        fieldId: this.field,
        fieldThemeId: this.fieldTheme,
        hotProblems: this.hotProblems,
        requestUnit:
          this.objectType == 4 && this.otherRequestUnit
            ? null
            : this.unitSendRequest.value,

        leaderId: this.leader,
        leadingIdeas: this.leadingIdeas,
        note: this.note,
        file: this.attachFileUrl,
        periodId: this.period,
        policyProblems: this.policyProblems,
        problemGroups: this.$isNullOrEmpty(this.problemGroup)
          ? []
          : [this.problemGroup],
        relatedUnitIds: this.unitLienQuan,
        releaseTime: this.selectDatePhatHanhVB + ' 00:00:00',
        replyContent: this.contenrtReply,
        replyNumber: '',
        requestContent: this.contentRequest,
        requestTypeId: this.requestType,
        sessionId: this.session,
        symbols: this.symbol,
        unitIds: [this.unit],
        requestObjectTypeId: this.objectType,
      }
      // console.log(this.unitSendRequest)
      this.$store.dispatch('request/requestSystemAdd', data).then((res) => {
        if (res.data.error.code === 0) {
          this.$showSuccess(this, 'Thêm mới kiến nghị thành công')
          this.$router.push('/quan-tri/danh-sach-kien-nghi')
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
</style>
