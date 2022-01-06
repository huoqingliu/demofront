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

// 请求地址： http://localhost:9080/login
app.post("/login", function (req, res) {
  console.log(req.body);
  res.cookie('token', 'abcdef')
  res.json({
    code: 200, // 成功
    data: null,
    success:true,
    message: '登录成功',
    token:'abcdef'
  });
});

// 请求地址： http://localhost:9080/demo
app.post("/getUserInfo", function (req, res) {
  res.cookie('token', 'abcdef')
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
    token:'abcdef'
  });
});

app.listen(9080, "localhost", (err) => {
  if (!err) console.log("服务器启动成功了，请访问 http://localhost:9080");
  else console.log(err);
});
