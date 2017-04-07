let Vue = require('vue')
let App = require('../vue-template/app.vue')

new Vue({
  el: '#main',  
  render: function (createElement) { 
    return createElement(App) 
  }
})