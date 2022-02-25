<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div style="width:100%;text-align:center;margin:10px 0 20px 0">
          <h2 v-if="!isCollapsed" style="color:#fff;">后台管理系统</h2>
          <h2 v-else style="color:#fff;">管</h2>
        </div>
        <Menu theme="dark" width="auto" id="menuUl" :class="menuitemClasses" :active-name='activeName' :open-names='openNames' @on-select="turnToPage">

          <template  >
            <div v-for="(item,index) in menuList">
            
            <Submenu v-if="item.children.length>1" :name="item.path">
              <template slot="title">
                <Icon :type="item.icon"/>
                <span>{{item.name}}</span>
              </template>
              <div v-for="(childrenItem,index) in item.children">
                <Submenu v-if="childrenItem.children.length>1" :name="childrenItem.path">
                  <template slot="title">
                    <Icon :type="childrenItem.icon"/>
                    <span>{{childrenItem.name}}</span>
                  </template>
                  <MenuItem v-for="(childrenItem1,index) in childrenItem.children" :name="childrenItem.path+'/'+childrenItem1.path" :to='{name:childrenItem1.name}'>
                    <Icon :type="childrenItem1.icon"/>
                    <span>{{childrenItem1.name}}</span>
                  </MenuItem>
                  
                </Submenu>
                <MenuItem v-else  :name="item.path+'/'+childrenItem.path" :to='{name:childrenItem.name}'>
                  <Icon :type="childrenItem.icon"/>
                  <span>{{childrenItem.name}}</span>
                </MenuItem>
              </div>
              
            </Submenu>
            <MenuItem  v-else :name="item.path+'/'+item.children[0].path" :to='{name:item.children[0].name}'>
              <Icon :type="item.children[0].icon"/>
              <span>{{item.children[0].name}}</span>
            </MenuItem>
            </div>
          </template>

        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24">
          </Icon>
          <Breadcrumb style='position:absolute;top: -3px;left: 75px'>
            <BreadcrumbItem v-for="item in list" :to='item.to'>
              <Icon :type="item.icon"></Icon>{{item.title}}
            </BreadcrumbItem>
          </Breadcrumb>
          <div class="user-avatar-dropdown">
            <Dropdown @on-click="handleLogout">

              <Avatar icon='ios-person' size='small'></Avatar>
              <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem name='userName'>hi,{{userName}}</DropdownItem>
                <DropdownItem name='logout'>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content>

          <keep-alive>
            <router-view />
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    name:'Main',
    data() {
      return {
        isCollapsed: false,
        list: [{
          to: '/home',
          icon:'ios-home',
          title: '首页'
        }],
        activeName:'',
        openNames:'',
        userName: ''
      }
    },
    computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      menuList() {
        return this.$store.state.app.menuList
      }
    },
    methods: {
      ...mapActions(['logout']),
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      },
      handleLogout(name) {
        console.log('handleLogout', name);
        if (name !== 'logout') {
          return
        }
        this.logout().then((res) => {
          console.log('退出登录');
          this.$router.push({
            name: 'login'
          })
        })
      },
      turnToPage(item) {
        let {
          name,
          query,
          params
        } = {}
        if (typeof item === 'string') {
          name = item
        } else {
          name = item.name
          query = item.query
          params = item.params
        }
        this.$router.push({
          name,
          query,
          params
        })
      },
      getTitle(lists){
        lists.forEach((item)=>{
          this.list.push({
            to :'',
            icon:item.icon,
            title:item.name,
          })
          if (item.children&&item.children[0]) {
            this.getTitle(item.children)
          }
        })
      }
    },
    mounted() {
      this.userName = this.$store.state.user.name
      this.activeName = this.$route.path
      this.openNames = ['/'+this.activeName.split('/')[1]]
      
    },
    created() {
      this.activeName = this.$route.path
      this.openNames = ['/'+this.activeName.split('/',2)[1]]
      this.menuList.forEach((item,index)=>{
        if (item.name ==this.openNames[0] ) {
          this.list.push({
            to :'',
            icon:item.icon,
            title:item.name,
          })
        }
        this.getTitle(this.menuList)
      })
    },
  }
</script>

<style lang='less' scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    overflow: hidden;

    /deep/.ivu-layout.ivu-layout-has-sider {
      height: 100%;
      width: 100%;
    }
  }

  .layout-header-bar {
    position: relative;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  #menuUl{
    li{
      width: 100%;
      margin: 0;
    }
    .ivu-menu-item-selected{
      border-right: none;
      color: #fff;
      background: #e25454 !important;
    }
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .user-avatar-dropdown {
    float: right;
    margin-right: 40px;

  }

  /deep/.ivu-dropdown-menu {
    line-height: normal;
    text-align: center;
  }
  /deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
    width: 100%;
    margin: 0;
  }
</style>