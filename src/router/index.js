import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Rone from '@/components/Rone'
import ErrorPage from '@/components/ErrorPage'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        keepAlive: false // 不需要缓存
      }

    },
    // name:'/rone/:id',  
    //在组件中使用$router会使之与其的对应路由高度耦合  
    // 从而组件只能在某些特定路由上使用限制了灵活性 
    //  可以使用props将组件与路由解耦
    // 对于包含命名视图的路由 必须分别为每个视图添加props选项
    // 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
    // path: '/promotion/from-newsletter',
    // component: Promotion,
    // props: { newsletterPopup: false }
    // props: route => ({ query: route.query.q })
    // URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
    {
      path: '/rone/:id',
      // component: Rone
      components: { default: Rone, HelloWorld: HelloWorld },
      props: { default: true, HelloWorld: false }//props被设置为true的时候$route.params会被设置为组件的属性  组件传传参布尔模式
    },
    {
      path: '/error',
      name: ErrorPage,
      component: ErrorPage,
      // meta: { requiresAuth: true },
      // beforeEnter: (to, from, next) => { //路由独享守卫
      //   // ...
      // }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
// history 充分利用history.pushState 来完成跳转url不需要重新加载页面  需要后端配置 不然404
// const router = new VueRouter({
//   mode: 'history',
//   routes: [...]
// })
export default router
router.beforeEach((to, from, next) => {
  console.log('to', to, to.path.match(/^\/rone/g) instanceof Array, !to.name)
  if (to.name) {
    next()
  } else if ((!to.name) && to.path.match(/^\/rone/g) instanceof Array === true) {
    console.log('2', 2)
    next()
  } else {
    next({ path: '/error' })
  }

})

router.afterEach((to, from) => {
  // ...
})
Vue.use(Router)