<template>
  <div id="login">
    <Card shadow class="Card">
      <p slot="title" style="font-size: 20px;text-align: center;font-weight: 700;">后台管理系统框架</p>
      <Form id="loginFrom" ref="loginFrom" :v-model="loginFrom" :rules='rules' @keydown.enter.native="handleSubmit">
        <FormItem prop='userName'>
          <Input v-model="loginFrom.userName" placeholder="请输入用户名">
          <span slot="prefix">
            <Icon :size='16' type='ios-person' />
          </span>
          </Input>
        </FormItem>
        <FormItem prop='password'>
          <Input v-model="loginFrom.password" type="password" placeholder="请输入密码">
          <span slot="prefix">
            <Icon :size='14' type='md-lock' />
          </span>
          </Input>
        </FormItem>
        <FormItem prop='imgCode'>
          <Row>
            <Col span="12">
            <Input v-model="loginFrom.imgCode" placeholder="请输入验证码" style="width:150px">
            <span slot="prepend">
              <Icon :size='14' type='md-key' />
            </span>
            </Input>
            </Col>
            <Col span="8" offset='2'>
            <Button class="verify-button" type="primary">获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button class="sub-button" type="primary" @click="handleSubmit" long :loading='loading'>登录</Button>
        </FormItem>
      </Form>
      <h2 class="login-tip">supported by@huoqingliu</h2>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapActions
  } from 'vuex'
  // 动态路由菜单
  import {
    initRouter
  } from '@/libs/router-util';
  export default {
    name: 'login',
    data() {
      return {
        loginFrom: {
          userName: '',
          password: '',
          imgCode: '',
        },
        rules: {

        },
        loading: false
      }
    },
    methods: {
      ...mapActions(['handleLogin', 'getUserInfo']),
      //点击登录
      handleSubmit() {
        if (this.loading) {
          return
        }
        this.loading = true
        let params = {
          userName: this.loginFrom.userName,
          password: this.loginFrom.password,
          imgCode: this.loginFrom.imgCode,
        }
        this.handleLogin(params).then((res) => {
          initRouter(this).then(res=>{
            this.getUserInfo().then((res) => {
              this.loading = false
              this.$router.push({
                name: this.$config.homeName
              })
            })
          })
        })
      }
    },
    mounted() {},
  }
</script>

<style lang='less' scoped>
  #login {
    height: 100%;
    width: 100%;
    background-image: url(~@/assets/bg.jpg);
    background-color: #2d3a4b;
    background-size: cover;
    position: relative;

    .Card {
      position: absolute;
      left: 70%;
      top: 50%;
      transform: translateY(-50%);
      width: 300px;
      border-radius: 20px;

      #loginFrom {
        .verify-button {
          margin-left: 10px;
          margin-top: -1px;
        }
      }

      .login-tip {
        font-size: .625rem;
        text-align: center;
        color: #c3c3c3;
      }

    }

  }
</style>