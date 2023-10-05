<template>
  <div>
    <div id="app">{{ time }}</div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
Vue.prototype.moment = moment
export default {
  data() {
    return {
      date: moment(12 * 60 * 60 * 10 * 1000),
    }
  },
  computed: {
    time() {
      return this.date.format('hh:mm:ss')
    },
  },

  mounted() {
    setInterval(() => {
      this.date = moment(this.date.subtract(1, 'seconds'))
    }, 1000)
  },
}
</script>
