import Main from '@/components/main'
export default [
  {
    path:'/login',
    name: 'login',
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      title: 'login-登录',
      hideInMenu:true,
    }
  },
  {
    path:'/',
    name: '_home',
    // 地址为'/'时，重定向到'/home'页
    redirect:'/home',
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      title: 'login-登录',
      hideInMenu:true,
    },
    comments:Main,
    children: [
      {
        path:'/home',
        name: 'home',
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '首页',
          hideInMenu: true,
          icon:'md-home'
        },
        comments:()=>('@/view/home')
      },
    ]
  },
]