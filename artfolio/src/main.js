import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/styling.css'
import './styles/crudStyle.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.js'


Vue.config.productionTip = false

new Vue({ 
  router,
  render: h => h(App)
}).$mount('#app')

