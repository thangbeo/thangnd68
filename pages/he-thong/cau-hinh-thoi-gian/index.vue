<template>
  <div>
    <CardGlobal>
      <div class="pa-1 d-flex align-center">
        <v-btn to="/" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        <span style="font-size: 1.3rem; font-weight: 500" class="primary--text">
          Cấu hình thời gian
        </span>
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-container style="max-width: 40%">
        <v-row class="ma-0">
          <v-spacer></v-spacer>
          <v-col class="col-auto py-0">
            <v-btn class="text-none primary" depressed> Lưu cấu hình </v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="12">
            <table class="class-body">
              <tbody>
                <tr style="height: 40px !important">
                  <td>
                    <div class="style-title d-flex align-end pt-2">
                      Cấu hình thời gian hết hạn kiến nghị đối với đơn vị:
                    </div>
                  </td>
                  <td>
                    <v-text-field
                      dense
                      hide-details=""
                      class="ml-6"
                      placeholder="Ngày"
                    >
                    </v-text-field>
                  </td>
                </tr>
                <tr style="height: 40px !important">
                  <td>
                    <div class="style-title d-flex align-end pt-2">
                      Cấu hình thời gian quá hạn kiên nghị đối với văn phòng bộ:
                    </div>
                  </td>
                  <td>
                    <v-text-field
                      dense
                      hide-details=""
                      class="ml-6"
                      placeholder="Ngày"
                    >
                    </v-text-field>
                  </td>
                </tr>
                <tr style="height: 40px !important">
                  <td>
                    <div class="style-title d-flex align-end pt-2">
                      Cấu hình thời gian thỏa đáng của kiến nghị:
                    </div>
                  </td>
                  <td>
                    <v-text-field
                      dense
                      hide-details=""
                      class="ml-6"
                      placeholder="Ngày"
                    >
                    </v-text-field>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </CardGlobal>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss">
.style-title {
  font-size: 1rem;
  font-weight: 500;
  color: black;
}
.class-body {
  .v-input.ml-3.v-input--hide-details.v-input--dense.theme--light.v-text-field.v-text-field--is-booted {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
