import Vue from 'vue'
import moment from 'moment'

Vue.filter('addS', value => {
  return value + 's'
})

Vue.filter('capitalize', value => {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('dateFormat', (value, format) => {
  return moment(value).format(format)
})