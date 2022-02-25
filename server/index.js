const express = require("express");

const app = express();

// 启动服务器 node index.js

// 解决跨域
app.use((req, res, next) => {
  // 允许跨域的地址
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.set("Access-Control-Allow-Origin", "*");
  // 是否进行预检请求
  res.set("Access-Control-Allow-Credentials", true);
  // 预检请求的缓存时间
  res.set("Access-Control-Max-Age", 36400);

  // 允许跨域的请求方式
  res.set("Access-Control-Allow-Mehtods", "GET,POST,PUT,DELETE");
  // 允许跨域的请求头
  res.set("Access-Control-Allow-Headers", "Content-Type");
  
  
  if (req.method === "options") {
    // 预检请求 直接返回响应
    res.end();
    return;
  }

  next();
});

// 设置body解析中间件
app.use(express.urlencoded())
app.use(express.json())

// 请求地址： http://localhost:9080/login
app.post("/login", function (req, res) {
  console.log(req.body);
  const { userName, password, imgCode } = req.body
  const reqCookie = 'reqCookie'
  res.cookie('token', reqCookie)
  res.json({
    code: 200, // 成功
    data: null,
    success:true,
    message: '登录成功',
    token:reqCookie
  });
});

// 请求地址： http://localhost:9080/getUserInfo
app.post("/getUserInfo", function (req, res) {
  const reqCookie = 'reqCookie'
  res.cookie('token', reqCookie)
  res.json({
    code: 200, // 成功
    data: {
      name:'测试用户',
      userId:'213424',
      avatar:'-',
      roles:['home','demo'],
    },
    success:true,
    message: '测试成功',
    token:reqCookie
  });
});

// 获取路由地址数组
app.get("/getRouters", function (req, res) {
  const reqCookie = 'reqCookie'
  res.cookie('token', reqCookie)
  res.json([
    {
      path:'/demo',
      name: '测试',
      component: 'Main',
      hasChildren:true,
      // 路由元信息，存放页面中会用到的状态或信息
      meta: {
        title: '测试',
        icon:'md-menu',
        noCache:true,
        hideInMenu:false,
      },
      children: [
        {
          path:'demo',
          name: '测试1',
          hasChildren:false,
          // 路由元信息，存放页面中会用到的状态或信息
          meta: {
            title: '测试1',
            icon:'md-menu',
            noCache:true,
            hideInMenu:false,
          },
          component: 'demo/demo.vue',
          children: [],
        },
        {
          path:'demo2',
          name: '测试2',
          hasChildren:false,
          // 路由元信息，存放页面中会用到的状态或信息
          meta: {
            title: '测试2',
            icon:'md-menu',
            noCache:true,
            hideInMenu:false,
          },
          children: [],
          component:'demo/demo2.vue'
        },
      ]
    },
    {
      path:'/sys',
      name: '系统管理',
      component: 'Main',
      hasChildren:true,
      // 路由元信息，存放页面中会用到的状态或信息
      meta: {
        title: '系统管理',
        icon:'md-adds',
        noCache:true,
        hideInMenu:false,
      },
      children: [
        {
          path:'menu',
          name: '系统菜单',
          hasChildren:false,
          // 路由元信息，存放页面中会用到的状态或信息
          meta: {
            title: '系统菜单',
            icon:'ios-pricetags',
            noCache:true,
            hideInMenu:false,
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
  ]);
});



// 请求地址： http://localhost:9080/logout
app.post("/logout", function (req, res) {
  res.json({
    code: 200, // 成功
    data: null,
    success:true,
    message: '退出登录',
    token:''
  });
});

app.listen(9080, "localhost", (err) => {
  if (!err) console.log("服务器启动成功了，请访问 http://localhost:9080");
  else console.log(err);
});
