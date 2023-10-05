<template>
  <div>
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
      </div>
    </CardGlobal>

    <CardGlobal
      class="mt-2"
      v-if="$store.state.requestPeople.dataDetail != null"
    >
      <div class="py-1 mx-4">
        <div class="pb-0 pb-lg-3 d-flex">
          <span style="font-size: 1rem">
            <span style="font-weight: 500"> NỘI DUNG KIẾN NGHỊ</span> -
            <span style="color: #c30404">
              {{ $store.state.requestPeople.dataDetail.peopleName }}
            </span>

            <span style="color: black; font-style: italic; font-size: 0.9rem">
              gửi kiến nghị
            </span>
            <span class="mx-1"> -</span>
            <span class="fs-12">
              {{
                moment(
                  $store.state.requestPeople.dataDetail.createTime,
                  'DD/MM/YYYY HH:mm:ss'
                ).format('DD/MM/YYYY HH:mm')
              }}</span
            >
            <!-- <span style="color: #c30404"> test4 </span>
            <span style="color: black; font-style: italic; font-size: 0.9rem"
              >chủ trì
            </span> -->
          </span>

          <v-spacer></v-spacer>
        </div>

        <v-divider></v-divider>
        <div class="pt-3">
          <span class="fs-14 black--text" style="font-weight: 700">
            Nội dung
            <span>
              ( {{ $store.state.requestPeople.dataDetail.peopleName }}
            </span>
            <span class="mx-1"> -</span>
            <span>
              {{
                moment(
                  $store.state.requestPeople.dataDetail.createTime,
                  'DD/MM/YYYY HH:mm:ss'
                ).format('DD/MM/YYYY HH:mm')
              }}</span
            >):
          </span>

          <div
            class="pb-3 px-3"
            style="font-size: 11pt; color: #000000eb"
            v-html="
              breakpoint == 'desktop'
                ? $store.state.requestPeople.dataDetail.requestContent.replaceAll(
                    `<p`,
                    `<p class='ma-0'`
                  )
                : $store.state.requestPeople.dataDetail.requestContent
            "
          ></div>
        </div>
        <v-divider
          class="pb-3"
          v-if="$store.state.requestPeople.dataDetail.approvalStatus == 1"
        ></v-divider>

        <!-- trả lời -->
        <div
          v-if="this.$store.state.requestPeople.dataDetail.approvalStatus == 1"
        >
          <span class="fs-14 black--text" style="font-weight: 700">
            Trả lời
            <span> ( answerPositionName answerUnitName </span>
            <span>hoặc (answerUnitName </span>
            <span class="mx-1"> -</span>
            <span>createTime</span>):
          </span>
          <!--   v-html="
                  breakpoint == 'desktop'
                    ? item[1].answerContent.replaceAll(`<p`, `<p class='ma-0'`)
                    : item[1].answerContent
                " -->
          <div class="pb-3 px-3" style="font-size: 11pt; color: #000000eb">
            answerContent
          </div>
        </div>
      </div>
    </CardGlobal>

    <v-row class="ma-0">
      <v-spacer></v-spacer>

      <v-col class="col-auto pr-0">
        <v-btn depressed class="secondary text-none" @click="close"
          >Trở lại</v-btn
        >
      </v-col>

      <v-col class="col-auto pr-0">
        <v-btn
          depressed
          class="error text-none"
          @click="showDialogUnApproval = true"
          >Hủy duyệt</v-btn
        >
      </v-col>
      <v-col class="col-auto pr-0">
        <v-btn
          depressed
          class="primary text-none"
          to="/kien-nghi-nguoi-dan/chi-tiet-kien-nghi/duyet-kien-nghi"
          >Duyệt kiến nghị</v-btn
        >
      </v-col>
    </v-row>
    <yes-no-alert
      :open="showDialogUnApproval"
      alert-msg="Bạn có chắc chắn muốn hủy duyệt kiến nghị này?"
      @toggle="showDialogUnApproval = !showDialogUnApproval"
      @OK="approval"
    >
    </yes-no-alert>
  </div>
</template>
<script>
export default {
  transition: 'slide-x-reverse-transition',
  components: {},
  data() {
    return {
      showDialogUnApproval: false,
    }
  },
  created() {},
  mounted() {
    if (this.$isNullOrEmpty(this.$store.state.requestPeople.dataDetail)) {
      window.history.back()
    }
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
  },
  methods: {
    approval() {
      this.loaddingAction = true
      let data = {
        requestPendingId: this.$store.state.requestPeople.dataDetail.id,
        approvalStatus: 2,
      }
      this.$store
        .dispatch('requestPeople/approvalPending', data)
        .then((res) => {
          if (!res.error) {
            this.$showSuccess(this, 'Hủy duyệt kiến nghị thành công')
            this.loaddingAction = false
            this.$router.push(
              '/kien-nghi-nguoi-dan/danh-sach-kien-nghi-cho-duyet'
            )
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
