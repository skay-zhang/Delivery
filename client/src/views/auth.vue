<template>
  <div class="container">
    <div class="flex align-center justify-center">
      <div class="auth-box">
        <div class="title text-center">Delivery</div>
        <div class="sub-title text-center">Client</div>
        <div class="auth-form card">
          <el-form :model="form" label-width="55px">
            <el-form-item label="服务器">
              <el-input v-model="form.server" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" />
            </el-form-item>
          </el-form>
          <div>
            <el-button link style="padding: 9px 0;">忘记密码?</el-button>
            <el-button type="primary" class="float-right">登录</el-button>
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
        server: '',
        name: '',
        password: ''
      }
    };
  },
  methods: {
    getPath() {
      let location = window.location;
      this.form.server = location.protocol + '//' + location.host + '/api';
    }
  },
  mounted() {
    let state = localStorage.getItem('app:state');
    if (state) this.state = JSON.parse(state);
    this.getPath();
  }
}
</script>

<style scoped>
.auth-box {
  padding: 10px;
  width: 300px;
}

.title {
  padding-top: 9vh;
  font-weight: bold;
  font-size: 6vh;
}

.sub-title {
  padding-bottom: 7vh;
  font-size: 4vh;
}

.auth-form {
  margin-top: 10px;
  padding: 15px;
}
</style>
