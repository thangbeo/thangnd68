<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        <v-btn @click="back" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Gửi kiến nghị
      </div>
    </CardGlobal>
    <CardGlobal class="mt-3">
      <v-row class="ma-0">
        <v-col cols="4" class="py-0">
          <div class="style-title-input pb-1">Lĩnh vực *:</div>
          <v-select
            outlined
            :items="$store.state.commonController.stateCommon.listField"
            clearable
            @change="changeField(field), geListCommonUnit(field)"
            dense
            :error-messages="fieldError"
            @input="fieldError = []"
            no-data-text="Không có dữ liệu"
            v-model="field"
          ></v-select>
        </v-col>
        <v-col cols="4" class="py-0">
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
          <div class="style-title-input pb-1">Kí hiệu văn bản:</div>
          <v-text-field outlined dense v-model="symbol"></v-text-field>
        </v-col>

        <v-col cols="4" class="py-0">
          <div class="style-title-input pb-1">Đơn vị chủ trì *:</div>
          <v-select
            chips
            small-chips
            deletable-chips
            outlined
            :items="listUnit"
            v-model="unit"
            :error-messages="unitError"
            @input="unitError = []"
            dense
            no-data-text="Không có dữ liệu"
          ></v-select>
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
              :max="moment().format('YYYY-MM-DD')"
              :min="moment().format('YYYY-MM-DD')"
              @change="menuVB = false"
              v-model="dateVB"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" class="py-0">
          <div class="style-title-input pb-1">Nội dung kiến nghị *:</div>
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
                  <v-icon size="65" color="primary"> mdi-cloud-upload </v-icon>
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
        <v-btn depressed class="secondary text-none" @click="close">Đóng</v-btn>
      </v-col>
      <v-col class="col-auto px-0">
        <v-btn
          depressed
          class="primary text-none"
          @click="checkInsert"
          :loading="loaddingButtom"
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
</template>
<script>
import moment from 'moment'
export default {
  transition: 'slide-x-reverse-transition',
  components: {},
  data() {
    return {
      file: [],
      fieldTheme: null,
      listFieldTheme: [],
      requestType: null,
      unitLienQuan: null,
      symbol: null,
      field: null,
      unit: null,
      fieldError: [],
      unitError: [],
      contentRequest: null,
      menuVB: false,
      attachFileUrl: null,
      // requestTypeError: [],
      dateVB: moment().format('YYYY-MM-DD'),
      listUnit: [],
      contentRequestError: [],
      listFile: null,
      openDeleteFile: false,
      loaddingButtom: false,
    }
  },
  mounted() {},
  methods: {
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
    deteFile(index) {
      this.file = null
      this.openDeleteFile = true
      this.indexFile = index
    },
    deleteFile() {
      this.listFile = null
      this.file = null
    },
    back() {
      window.history.back()
    },
    geListCommonUnit(field) {
      if (!this.$isNullOrEmpty(field)) {
        this.listUnit = []
        let data = {
          fieldId: field,
        }
        this.$store
          .dispatch('commonController/commonUnit', data)
          .then((res) => {
            if (res.data.error.code === 0) {
              res.data.data.map((item) => {
                this.listUnit.push({
                  text: item.name,
                  value: item.id,
                })
              })
            }
          })
      } else {
        this.listUnit = []
        this.unit = null
      }
    },
    selectFileOpen() {
      return window.document.getElementById('input_file').click()
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
      this.back()
    },
    checkInsert() {
      let isError = false

      // if (this.$isNullOrEmpty(this.requestType)) {
      //   isError = true
      //   this.requestTypeError = ['Vui lòng chọn loại kiến nghị']
      // }
      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui lòng chọn lĩnh vực']
      }
      if (this.$isNullOrEmpty(this.unit)) {
        isError = true
        this.unitError = ['Vui lòng chọn đơn vị']
      }
      if (this.$isNullOrEmpty(this.contentRequest)) {
        isError = true
        this.contentRequestError = ['Vui lòng nhập nội dung kiến nghị']
      }
      if (!isError) {
        this.insertRequest()
      }
    },
    insertRequest() {
      this.loaddingButtom = true
      let data = {
        fieldThemeId: this.fieldTheme,
        comingTime: moment(this.selectDateVB, 'DD/MM/YYYY').format(
          'DD/MM/YYYY HH:mm:ss'
        ),
        file: this.attachFileUrl,
        fieldId: this.field,
        requestContent: this.contentRequest,
        requestTypeId: null,
        symbols: this.symbol,
        unitIds: [this.unit],
        relatedUnitIds: this.unitLienQuan,
      }
      this.$store.dispatch('request/requestAdd', data).then((res) => {
        if (res.data.error.code === 0) {
          this.$showSuccess(this, 'Gửi kiến nghị thành công')
          this.loaddingButtom = false
          this.$router.push('/kien-nghi/danh-sach-kien-nghi')
        }
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
</style>
