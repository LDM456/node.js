<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button v-if="isLogin" type="primary" @click="login">登录</el-button>
        <el-button v-else type="primary" @click="register">注册</el-button>
      </el-form-item>
      <span class="trigger-text" @click="trigger">
        {{ isLogin ? '去注册吧~' : '去登录吧~' }}
      </span>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLogin: true,
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    trigger() {
      this.isLogin = !this.isLogin
    },
    register() {
      this.$axios
        .post('/users/register', {
          ...this.ruleForm,
        })
        .then((res) => {
          if (res.code === '0') {
            this.$message.success('注册成功啦~快去登录吧')
          } else {
            this.$message(res.message)
          }
        })
        .catch(() => {})
    },
    login() {
      this.$axios
        .post('/users/login', {
          ...this.ruleForm,
        })
        .then((res) => {
          if (res.code == '200') {
            this.$message.success('登录成功')
            localStorage.setItem('token', res.data.token)
            this.$router.push('/')
          } else {
            this.$message(res.message)
          }
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  width: 50%;
  margin: auto;
}
.login-btn button {
  width: 100%;
}
.trigger-text {
  font-size: 12px;
  display: block;
  text-align: right;
  color: #409eff;
  /* float: left; */
}
</style>
