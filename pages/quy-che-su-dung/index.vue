<template>
  <div v-if="checkRole(Rules.System.TermsOfUse.actions.xem)">
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text d-flex align-center"
      >
        <v-btn @click="back" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        Quy chế sử dụng
        <v-spacer></v-spacer>
        <v-btn
          v-if="checkRole(Rules.System.TermsOfUse.actions.cap_nhat)"
          depressed
          class="primary text-none"
          @click="openDialogUpdate = true"
          >Cập nhật quy chế</v-btn
        >
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0">
        <!-- <v-col cols="12" class="pb-1">
          <div style="font-weight: 500; font-size: 1.1rem">Tiêu đề:</div>
        </v-col>
        <v-col cols="12" class="pt-0 ml-4 pb-1">
          <div style="font-size: 1rem">{{ title }}</div>
        </v-col> -->

        <v-col cols="12" class="pt-0 ml-4 pb-1">
          <div style="font-size: 1rem" v-html="content"></div>
        </v-col>
        <!-- <v-col cols="12" class="pb-1 d-flex align-center">
          <span style="font-weight: 500; font-size: 1.1rem">
            Trạng thái kích hoạt:
          </span>
          <span class="ml-2">
            <v-chip small outlined v-if="status == 1" color="successNotify"
              >Kích hoạt</v-chip
            >
            <v-chip small outlined v-else color="warning">Kích hoạt</v-chip>
          </span>
        </v-col> -->
      </v-row>
    </CardGlobal>
    <Update
      @Success="getList"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
    ></Update>
  </div>
</template>
<script>
import Update from '~/components/quy-che-su-dung/Update.vue'
import Rules from '~/assets/configurations/Rules'
export default {
  components: {
    Update,
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      Rules,
      openDialogUpdate: false,
      title: null,
      content: null,
      status: 1,
    }
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.TermsOfUse.id,
        actionId
      )
      return isAllowed
    },
    getList() {
      this.$store.dispatch('termsOfUse/getListTermOfUse').then((res) => {
        // console.log(res)
        this.title = res.data.data[0].title
        this.content = res.data.data[0].content
        this.status = res.data.data[0].status
        if (res.data.data[0].status === 1) {
          this.$store.commit('termsOfUse/setStyle', res.data.data[0].style)
          this.$store.commit('termsOfUse/setTitle', res.data.data[0].title)
        } else {
          this.$store.commit('termsOfUse/setStyle', null)
          this.$store.commit('termsOfUse/setTitle', null)
        }
      })
    },
    back() {
      window.history.back()
    },
  },
}
</script>
