<template>
  <div>
    <CardGlobal>
      <div style="font-size: 1.3rem; font-weight: 500" class="primary--text">
        <v-btn @click="backHis" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Duyệt kiến nghị
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0">
        <v-col cols="12" class="pa-1" style="background: #3ba8e752">
          <div class="fs-16 fw-500 ml-1">Thông tin cá nhân</div>
        </v-col>
        <v-col cols="12" class="pa-1">
          <v-row class="ma-0 pt-2">
            <v-col class="py-0" cols="3">
              <span class="fw-500 black--text">Họ và tên</span>
              <span class="red--text">*</span>:
              <v-text-field
                outlined
                dense
                readonly
                v-model="fullName"
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="3">
              <span class="fw-500 black--text">Email</span>
              <span class="red--text">*</span>:
              <v-text-field
                outlined
                dense
                readonly
                v-model="email"
              ></v-text-field>
            </v-col>

            <v-col class="py-0" cols="3">
              <span class="fw-500 black--text">Điện thoại:</span>
              <v-text-field
                outlined
                readonly
                dense
                type="number"
                v-model="phoneNumber"
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="3">
              <span class="fw-500 black--text">CMND/CCCD: </span>
              <v-text-field
                no-data-text="Không có dữ liệu"
                outlined
                readonly
                dense
                v-model="CCCD"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="py-0">
              <span class="fw-500 black--text">Tỉnh/Thành phố</span>
              <span class="red--text">*</span>:
              <v-select
                outlined
                dense
                readonly
                no-data-text="Không có dữ liệu"
                :items="listProvince"
                v-model="province"
                @input="provinceError = []"
              ></v-select>
            </v-col>
            <v-col cols="3" class="py-0">
              <span class="fw-500 black--text">Quận/Huyện</span>
              <span class="red--text">*</span>:
              <v-select
                outlined
                dense
                readonly
                no-data-text="Không có dữ liệu"
                :items="listDistrict"
                @change="getDicWard(district)"
                v-model="district"
              ></v-select>
            </v-col>
            <v-col cols="3" class="py-0">
              <span class="fw-500 black--text">Xã/Phường/Thị trấn</span>
              <span class="red--text">*</span>:
              <v-select
                outlined
                dense
                readonly
                no-data-text="Không có dữ liệu"
                :items="listWard"
                v-model="ward"
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="3">
              <span class="fw-500 black--text"
                >Số nhà, đường, thôn (tổ dân phố)</span
              >
              <span class="red--text">*</span>:
              <v-text-field
                outlined
                dense
                readonly
                v-model="address"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="pa-1" style="background: #3ba8e752">
          <div class="fs-16 fw-500 ml-1">Thông tin kiến nghị</div>
        </v-col>
        <v-col cols="12" class="pa-1">
          <v-row class="ma-0">
            <v-col cols="4" class="pb-0">
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

            <v-col cols="4" class="pb-0">
              <div class="style-title-input pb-1">
                Đơn vị chủ trì <span class="red--text">*</span>:
              </div>
              <v-autocomplete
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
              ></v-autocomplete>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="style-title-input pb-1">
                Trạng thái hiển thị trang chủ:
              </div>

              <v-switch
                :true-value="1"
                :false-value="0"
                v-model="statusShowHome"
                class="ma-0 pa-0"
              >
                <template #label>
                  <div class="black--text">
                    {{ statusShowHome == 1 ? 'Hiển thị' : 'Không hiển thị' }}
                  </div>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="style-title-input pb-1">
                Nội dung kiến nghị<span class="red--text"> *</span>:
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
        </v-col>
      </v-row>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0">
        <v-spacer></v-spacer>
        <v-col class="col-auto pr-0 py-1">
          <v-btn class="secondary text-none" depressed @click="backHis">
            Đóng</v-btn
          >
        </v-col>
        <v-col class="col-auto pr-0 py-1">
          <v-btn
            class="primary text-none"
            depressed
            @click="checkApproval"
            :loading="loaddingAction"
          >
            Duyệt</v-btn
          >
        </v-col>
      </v-row>
    </CardGlobal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusShowHome: 0,
      fullName: null,
      email: null,
      phoneNumber: null,
      CCCD: null,
      listProvince: [],
      province: null,
      listDistrict: [],
      district: null,
      contentRequestError: [],
      listWard: [],
      ward: null,
      address: null,
      requestType: null,
      field: null,
      fieldTheme: null,
      symbol: null,
      problemGroup: null,
      unit: null,
      leader: null,
      hotProblems: null,
      note: null,
      leadingIdeas: null,
      contentRequest: null,
      unitError: [],
      fieldError: [],
      listFieldTheme: [],
      requestTypeError: [],
      listUnit: [],
      loaddingAction: false,
    }
  },
  mounted() {
    if (this.$isNullOrEmpty(this.$store.state.requestPeople.dataDetail)) {
      window.history.back()
    } else {
      this.getDicProvince()
      this.setData()
      this.getDicDistrict(
        this.$store.state.requestPeople.dataDetail.provinceCode
      )
      this.getDicWard(this.$store.state.requestPeople.dataDetail.districtCode)
      this.geListCommonUnit()
    }
  },
  methods: {
    checkApproval() {
      let isError = false
      if (this.$isNullOrEmpty(this.unit)) {
        isError = true
        this.unitError = ['Vui lòng chọn đơn vị']
      }
      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui lòng chọn lĩnh vực']
      }

      if (this.$isNullOrEmpty(this.contentRequest)) {
        isError = true
        this.contentRequestError = ['Vui lòng nhập nội dung kiến nghị']
      }
      if (!isError) {
        this.approval()
      }
    },
    approval() {
      this.loaddingAction = true
      let data = {
        requestPendingId: this.$store.state.requestPeople.dataDetail.id,
        approvalStatus: 1,
        fieldId: this.field,
        fieldThemeId: this.fieldTheme,
        unitId: this.unit,
        showHome: this.statusShowHome,
      }
      this.$store
        .dispatch('requestPeople/approvalPending', data)
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Duyệt kiến nghị thành công')
            this.loaddingAction = false
            this.$router.push(
              '/kien-nghi-nguoi-dan/danh-sach-kien-nghi-cho-duyet'
            )
          }
        })
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
    setData() {
      let data = this.$store.state.requestPeople.dataDetail
      this.fullName = data.peopleName
      this.email = data.peopleEmail
      this.phoneNumber = data.peoplePhone
      this.CCCD = data.cccd
      this.province = data.provinceCode
      this.district = data.districtCode
      this.ward = data.wardCode
      this.address = data.peopleAddress
      this.contentRequest = data.requestContent
    },
    getDicDistrict(value) {
      if (!this.$isNullOrEmpty(value)) {
        let data = {
          provinceCode: value,
        }
        this.$store.dispatch('common/getDicDistrict', data).then((res) => {
          if (!res.error) {
            res.data.data.map((item) => {
              this.listDistrict.push({
                text: item.name,
                value: item.code,
              })
            })
          }
        })
      }
    },
    getDicWard(value) {
      if (!this.$isNullOrEmpty(value)) {
        let data = {
          districtCode: value,
        }
        this.$store.dispatch('common/getDicWard', data).then((res) => {
          if (!res.error) {
            res.data.data.map((item) => {
              this.listWard.push({
                text: item.name,
                value: item.code,
              })
            })
          }
        })
      }
    },
    getDicProvince() {
      this.$store.dispatch('common/getDicProvince').then((res) => {
        if (!res.error) {
          // console.log(res)
          res.data.data.map((item) => {
            this.listProvince.push({
              text: item.name,
              value: item.code,
            })
          })
        }
      })
    },
    backHis() {
      window.history.back()
    },
  },
}
</script>
<style>
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-top: 0px;
  margin-bottom: 4px !important;
}
</style>