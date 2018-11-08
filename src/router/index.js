import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import iosCompanySign from '@/views/iosCompanySign/list'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'iosCompanySign',
      component: iosCompanySign
    },
    {
      path: '/ios-company-sign',
      name: 'iosCompanySign',
      component: iosCompanySign
    }
  ]
})
