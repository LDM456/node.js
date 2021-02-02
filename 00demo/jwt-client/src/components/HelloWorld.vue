<template>
  <div class="hello">
    <h1>我是首页</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
    getDetail() {
      this.$axios
        .get('/users/userInfo')
        .then((res) => {
          console.log('1233')
          if (res.code === '0') {
            this.$message.success('成功请求到首页数据啦')
          } else {
            this.$message(res.message)
          }
        })
        .catch(() => {})
    },
  },

  mounted() {
    this.getDetail()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
