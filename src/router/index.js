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
      component: ExploreView,
      // this might not be good here
      //component: () => import('@/components/ExploreView')
      meta: {
        progress: {
          func: [
            {call: 'color', modifier: 'temp', argument: '#2da8ee'},
            {call: 'fail', modifier: 'temp', argument: '#6e0000'},
            {call: 'location', modifier: 'temp', argument: 'top'},
            {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 1500}}
          ]
        }
      }
    },
    
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
