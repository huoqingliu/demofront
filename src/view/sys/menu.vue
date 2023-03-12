<template>
  <div id="home">
    <Card shadow class="Card searchCard">
      <Form ref="searchData" class="searchData" :model="searchData" :rules="searchRules" label-position='right'
        :label-width='100'>
        <Row type='flex' style="justify-content:space-between;">
          <FormItem label="名称：" prop="user">
            <Input type="text" v-model="searchData.user" placeholder="请输入名称">
            </Input>
          </FormItem>
          <FormItem label="类型：" prop="password">
            <Input type="text" v-model="searchData.password" placeholder="请输入类型">
            </Input>
          </FormItem>
          <div style="flex-grow:20;">
            <Button :loading="isSearchLoading" style="float:right;" type="primary" @click="handleQuery">查询</Button>
          </div>
        </Row>
      </Form>
    </Card>

    <Card shadow class="Card tableCard">
      <Table :data="tableData" :columns="tableColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page ref="page" :current="currentPage" :page-size="pageSize" :total="detailTotal" :page-size-opts="[5,10,20]"  @on-change="handleChangePage" @on-page-size-change="handleSizeChange" show-sizer show-total ></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        detailTotal:100,
        pageSize:5,
        currentPage:1,
        isSearchLoading:false,
        tableData: this.mockTableData(5),
        tableColumns: [{
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Status',
            key: 'status',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
              const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: 'Portrayal',
            key: 'portrayal',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.portrayal.length + 'portrayals',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.portrayal.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData[params.index].portrayal.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item)
                  }))
                ])
              ]);
            }
          },
          {
            title: 'People',
            key: 'people',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: params.row.people.length + 'customers',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.people.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData[params.index].people.map(item => {
                    return h('li', {
                      style: {
                        textAlign: 'center',
                        padding: '4px'
                      }
                    }, item.n + '：' + item.c + 'People')
                  }))
                ])
              ]);
            }
          },
          {
            title: 'Sampling Time',
            key: 'time',
            render: (h, params) => {
              return h('div', 'Almost' + params.row.time + 'days');
            }
          },
          {
            title: 'Updated Time',
            key: 'update',
            render: (h, params) => {
              return h('div', this.formatDate(this.tableData[params.index].update));
            }
          }
        ],

        searchData: {
          user: '',
          password: ''
        },
        searchRules: {
          /* user: [
              { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ], */
        }
      }
    },
    components: {},

    mounted() {

    },

    methods: {

      //获取表格数据
      search(){
        if (this.isSearchLoading) {
          return
        }
        this.isSearchLoading = true
        let params={
          user: this.searchData.user,
          password: this.searchData.password,
          pageSize:this.pageSize,
          currentPage:this.currentPage,
        }
        this.tableData =this.mockTableData(this.pageSize)
        this.isSearchLoading =false
        this.$Message.error('查询成功')
        /* getTableList(params).then((res) => {
          if (res.data.status==200) {
            this.tableData = res.data.data
            this.detailTotal = res.data.totalCount
          } else {
            this.$Message.error(res.data.mseeage)
          }
          this.isSearchLoading =false
        }).catch((err) => {
          this.isSearchLoading =false
          this.$Message.error('请求失败，网络错误')
        }); */
      },
      
      //页码改变
      handleChangePage(page) {
        this.currentPage=page
        this.search()
      },

      //每页条数改变
      handleSizeChange(size){
        this.currentPage=1
        this.$refs["page"].currentPage=1;
        this.pageSize=size
        this.search()
      },

      //点击查询
      handleQuery() {
        this.$refs["searchData"].validate((valid) => {
          if (valid) {
            this.currentPage=1
            this.$refs["page"].currentPage=1;
            this.search()
          } else {
            this.$Message.error('请填写必填项!');
          }
        })
      },

      mockTableData(size) {
        let data = [];
        for (let i = 0; i < size; i++) {
          data.push({
            name: 'Business' + Math.floor(Math.random() * 100 + 1),
            status: Math.floor(Math.random() * 3 + 1),
            portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
            people: [{
                n: 'People' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              },
              {
                n: 'People' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              },
              {
                n: 'People' + Math.floor(Math.random() * 100 + 1),
                c: Math.floor(Math.random() * 1000000 + 100000)
              }
            ],
            time: Math.floor(Math.random() * 7 + 1),
            update: new Date()
          })
        }
        console.log(data);
        return data;
      },
      formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
    }
  }
</script>

<style lang="less" scoped>
  #home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  /deep/.ivu-card-shadow,
  .ivu-card-shadow:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  }


  .Card {
    margin: 0 20px;
    // padding: 20px;
    border-radius: 20px;

  }

  .searchCard {
    margin: 20px;

    .searchData {
      /deep/.ivu-form-item {
        margin-bottom: 0 !important;
      }
    }
  }
</style>