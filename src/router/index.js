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
    path: '/personalPage',
    name: 'personalPage',
    component: () => import('@/views/PersonalPage')
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: () => import('@/views/EditUser')
  },
  {
    path: '/follow',
    name:'follow',
    component: () => import('@/views/Follow')
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
