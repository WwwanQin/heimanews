import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/personalPage/:id',
    name: 'personalPage',
    component: () => import('@/views/PersonalPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const arr = JSON.parse(localStorage.getItem('news_User_Data')) || {};
  if(to.name == 'personalPage'){
    if(arr.token){
      next();
    }else{
      next('/login');
    }
  }else{
    next();
  }
})

export default router
