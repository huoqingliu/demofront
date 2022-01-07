import Main from '@/components/main'
export default [
  {
    path:'/login',
    name: 'login',
    component: () => import('@/components/login/login.vue'),
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      title: '登录',
      hideInMenu:true,
    }
  },
  {
    path:'/',
    name: '_home',
    // 地址为'/'时，重定向到'/home'页
    redirect: '/home',
    component:Main,
    
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      noCache:true,
      hideInMenu:true,
    },
    children: [
      {
        path:'/home',
        name: 'home',
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '首页',
          noCache:true,
          hideInMenu: true,
          icon:'md-home'
        },
        component:()=>import('@/view/home/home.vue')
      },
      {
        path:'/demo',
        name: 'demo',
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '测试1',
          noCache:true,
          hideInMenu: true,
          icon:'md-home'
        },
        component:()=>import('@/view/demo/demo.vue')
      },
    ]
  },
  { 
    path: '*', 
    redirect: '/404', 
    hidden: true 
  }
]