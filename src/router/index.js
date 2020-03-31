import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index')
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
    path: '/personalPage',
    name: 'personalPage',
    meta: {
      authorization: true
    },
    component: () => import('@/views/PersonalPage')
  },
  {
    path: '/editUser',
    name: 'editUser',
    meta: {
      authorization: true
    },
    component: () => import('@/views/EditUser')
  },
  {
    path: '/follow',
    name: 'follow',
    meta: {
      authorization: true
    },
    component: () => import('@/views/Follow')
  },
  {
    path: '/comments',
    name: 'comments',
    meta: {
      authorization: true
    },
    component: () => import('@/views/Comments')
  },
  {
    path: '/star',
    name: 'star',
    meta: {
      authorization: true
    },
    component: () => import('@/views/Star')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 设置路由守卫
router.beforeEach((to,from,next)=>{
  const arr = JSON.parse(localStorage.getItem('news_User_Data')) || {};
  console.log(to.name);
  if(to.meta.authorization){
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
