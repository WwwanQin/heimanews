import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 设置meta属性，meta中的authorization属性用于提示路由守卫来拦截本次路由分发
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
  },
  {
    path: '/categorymanage',
    name: 'categorymanage',
    component: () => import('@/views/Categorymanage')
  },
  {
    path: '/newsarticledetail/:id',
    name: 'newsarticledetail',
    component: () => import('@/views/News_ArticleDetail')
  },
  {
    path: '/newsvideodetail/:id',
    name: 'newsvideodetail',
    component: () => import('@/views/News_VideoDetail')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
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
  let {returnUrl} = from.query
  if(to.meta.authorization){
    if(arr.token){
      next();
    }else{
      next('/login');
    }
  }else{
    next();
  }
  if(returnUrl){
    next(returnUrl);
  }
})

export default router
