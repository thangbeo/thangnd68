<template>
  <div>
    <CardGlobal>
      <v-row class="ma-0">
        <v-col cols="4" class="py-0">
          <div class="fw-500 black--text">
            Lĩnh vực <span class="red--text">*</span>:
          </div>
          <v-select
            outlined
            :items="$store.state.commonController.stateCommon.listField"
            clearable
            @change="changeField(field)"
            dense
            :error-messages="fieldError"
            @input="fieldError = []"
            no-data-text="Không có dữ liệu"
            @click:clear="topic = null"
            v-model="field"
          ></v-select>
        </v-col>
        <v-col class="py-0" cols="4">
          <span class="fw-500 black--text">Chủ đề: </span>
          <v-select
            no-data-text="Không có dữ liệu"
            outlined
            dense
            :items="listFieldTheme"
            clearable
            v-model="topic"
          ></v-select>
        </v-col>
        <v-col class="py-0" cols="4">
          <span class="fw-500 black--text">Họ và tên</span>
          <span class="red--text">*</span>:
          <v-text-field
            outlined
            dense
            clearable
            v-model="fullName"
            :error-messages="fullNameError"
            @input="fullNameError = []"
          ></v-text-field>
        </v-col>
        <v-col class="py-0" cols="4">
          <span class="fw-500 black--text">Email</span>
          <span class="red--text">*</span>:
          <v-text-field
            outlined
            dense
            clearable
            v-model="email"
            :error-messages="emailError"
            @input="emailError = []"
          ></v-text-field>
        </v-col>
        <v-col class="py-0" cols="4">
          <span class="fw-500 black--text">Địa chỉ</span>
          <span class="red--text">*</span>:
          <v-text-field
            outlined
            dense
            clearable
            v-model="address"
            :error-messages="addressError"
            @input="addressError = []"
          ></v-text-field>
        </v-col>
        <v-col class="py-0" cols="4">
          <span class="fw-500 black--text">Điện thoại:</span>
          <v-text-field
            outlined
            dense
            type="number"
            clearable
            v-model="phoneNumber"
            :error-messages="phoneNumberError"
            @input="phoneNumberError = []"
          ></v-text-field>
        </v-col>
        <v-col class="py-0" cols="12">
          <span class="fw-500 black--text"
            >Nội dung kiến nghị <span class="red--text">*</span>:
          </span>
          <ckeditor
            :spellcheck="false"
            @input="contentRequestError = []"
            :config="$store.state.dataConfig.editorConfig"
            v-model="contentRequest"
          ></ckeditor>
          <div
            v-if="$isNullOrEmpty(contentRequest)"
            class="fs-12 red--text ml-3"
          >
            {{ contentRequestError[0] }}
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center pb-1">
          <recaptcha
            ref="recapcha"
            @success="recaptchaSuccess"
            @error="recaptchaError"
          />
        </v-col>
      </v-row>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0" no-gutters>
        <v-spacer></v-spacer>
        <v-col class="col-auto">
          <v-btn depressed class="secondary text-none" @click="close"
            >Đóng</v-btn
          >
          <v-btn class="text-none primary ml-2" depressed @click="checkSave"
            >Lưu</v-btn
          >
        </v-col>
      </v-row>
    </CardGlobal>
  </div>
</template>
<script>
import jsCookie from 'js-cookie'
export default {
  name: 'index',

  created() {},
  mounted() {},
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
  data() {
    return {
      fieldError: [],
      field: null,
      topic: null,
      fullName: null,
      fullNameError: [],
      email: null,
      emailError: [],
      address: null,
      addressError: [],
      phoneNumber: null,
      contentRequestError: [],
      phoneNumberError: [],
      listFieldTheme: [],
      contentRequest: null,
      captchaVerified: false,
    }
  },
  methods: {
    close() {
      window.location.back()
    },
    checkSave() {
      let isError = false
      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui chọn lĩnh vực']
      }
      if (this.captchaVerified === false) {
        isError = true
        this.$showWarnNotify(this, 'Vui lòng xác minh danh tính')
      }
      if (this.$isNullOrEmpty(this.fullName)) {
        isError = true
        this.fullNameError = ['Vui lòng nhập họ và tên']
      }
      if (this.$isNullOrEmpty(this.email)) {
        isError = true
        this.emailError = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email)) {
        isError = true
        this.emailError = ['Email không hợp lệ']
      }
      if (this.$isNullOrEmpty(this.address)) {
        isError = true
        this.addressError = ['Vui lòng nhập địa chỉ']
      }
      if (!this.$isNullOrEmpty(this.phoneNumber)) {
        if (!this.$isMobilePhone(this.phoneNumber)) {
          isError = true
          this.phoneNumberError = ['Số điện thoại không hợp lệ']
        }
      }
      if (this.$isNullOrEmpty(this.contentRequest)) {
        isError = true
        this.contentRequestError = ['Vui lòng nhập nội dung kiến nghị']
      }
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
        this.topic = null
        this.field = null
      }
    },
    recaptchaError() {
      this.captchaVerified = false
      //  alert(this.captchaVerified);
    },
    recaptchaSuccess() {
      this.captchaVerified = true
      // alert(this.captchaVerified);
    },
  },
}
</script>

<style lang="scss">
.v-content {
  .v-content__wrap {
    .container.fill-height.container--fluid {
      padding: 0 !important;
    }
  }
}
</style>
