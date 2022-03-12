<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/admin" class="nav-link">後台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link"
            >後台購物車</router-link
          >
          <router-link to="/admin/coupon" class="nav-link">優惠券</router-link>
          <router-link to="/" class="nav-link">前往前台</router-link>

          <a @click.prevent="logout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          this.$router.push("/login");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkLogIn() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)himiCookie\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common["Authorization"] = token;

      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          console.log(123);
          console.log(res);
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    this.checkLogIn();
  },
};
</script>
