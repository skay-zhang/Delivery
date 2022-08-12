<template>
  <div class="container">
    <div class="flex align-center justify-center">
      <div class="auth-box">
        <div class="title text-center">Delivery</div>
        <div class="auth-form card">
          <el-form :model="form" label-width="40px">
            <el-form-item label="账户">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" />
            </el-form-item>
          </el-form>
          <div>
            <el-button link style="padding: 9px 0;">忘记密码?</el-button>
            <el-button type="primary" class="float-right" @click="$router.push('/home')">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      state: { share: false, receive: false },
      form: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
  },
  mounted() {
    let state = localStorage.getItem('app:state');
    if (state) this.state = JSON.parse(state);
  }
}
</script>

<style scoped>
.auth-box {
  padding: 10px;
  width: 300px;
}

.title {
  padding: 25vh 0 20px;
  font-weight: bold;
  font-size: 6vh;
}

.auth-form {
  margin-top: 10px;
  padding: 15px;
}
</style>
