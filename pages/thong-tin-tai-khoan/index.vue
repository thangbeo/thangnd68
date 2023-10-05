<template>
  <div>
    <CardGlobal>
      <div class="pa-1 d-flex align-center">
        <v-btn to="/" icon>
          <v-icon size="30" color="primary">mdi-arrow-left-circle</v-icon>
        </v-btn>
        <span style="font-size: 1.3rem; font-weight: 500" class="primary--text">
          Thông tin tài khoản
        </span>
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
        
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
