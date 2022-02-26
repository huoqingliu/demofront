<template>
  <div id="home">
    <Card shadow class="Card">
      <img alt="Vue logo" src="@/assets/logo.png">

    </Card>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    mounted() {
      
    },
  }
</script>

<style lang="less" scoped>
  #home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .hello {
    height: 100%;
    width: 100%;
  }

  /deep/.ivu-card-shadow,.ivu-card-shadow:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  }

  .Card {
    margin: 0 20px;
    padding: 20px;
    border-radius: 20px;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>