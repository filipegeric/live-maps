import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from '@/components/WelcomeView'
import NotFound from '@/components/NotFound'
import ExploreView from '@/components/ExploreView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WelcomeView',
      component: WelcomeView
    },
    {
      path: '/explore',
      name: 'ExploreView',
      component: ExploreView
    },
    
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
