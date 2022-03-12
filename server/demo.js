[{
    path: '/demo',
    name: '测试',
    component: 'Main',
    hasChildren: true,
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      title: '测试',
      icon: 'md-menu',
      noCache: true,
      hideInMenu: false,
    },
    children: [{
        path: 'demo',
        name: '测试1',
        hasChildren: false,
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '测试1',
          icon: 'md-menu',
          noCache: true,
          hideInMenu: false,
        },
        component: 'demo/demo.vue',
        children: [],
      },
      {
        path: 'demo2',
        name: '测试2',
        hasChildren: false,
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '测试2',
          icon: 'md-menu',
          noCache: true,
          hideInMenu: false,
        },
        children: [],
        component: 'demo/demo2.vue'
      },
    ]
  },
  {
    path: '/sys',
    name: '系统管理',
    component: 'Main',
    hasChildren: true,
    // 路由元信息，存放页面中会用到的状态或信息
    meta: {
      title: '系统管理',
      icon: 'md-adds',
      noCache: true,
      hideInMenu: false,
    },
    children: [{
        path: 'menu',
        name: '系统菜单',
        hasChildren: false,
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '系统菜单',
          icon: 'ios-pricetags',
          noCache: true,
          hideInMenu: false,
        },
        component: 'sys/menu.vue',
        children: [],
      },
      /* {
        path:'menu1',
        name: '系统菜单1',
        hasChildren:false,
        // 路由元信息，存放页面中会用到的状态或信息
        meta: {
          title: '系统菜单1',
          icon:'ios-pricetags',
          noCache:true,
          hideInMenu:false,
        },
        component: 'sys/menu1.vue',
        children: [],
      } */
    ]
  },
]