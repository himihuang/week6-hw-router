<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        <h1 class="text-center">登入</h1>

        <form @submit="logIn">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              v-model="user.username"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="user.password"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `himiCookie=${token}; expires= ${new Date(
            expired
          )}`;
          this.$router.push("/");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert('帳號或密碼錯誤');
        });
    },
    checkLogin() {},
  },
};
</script>
