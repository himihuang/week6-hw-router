<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="nav-link">前台</router-link>
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
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/about" class="nav-link">關於我們</router-link>
          <router-link to="/products" class="nav-link"
            >前台產品列表</router-link
          >
          <router-link to="/cart" class="nav-link">前台購物車</router-link>
          <router-link to="/admin/products" class="nav-link"
            >後台購物車</router-link
          >
        </div>
      </div>
      <button type="button" class="btn btn-primary position-relative">
        結帳
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ cartData.length }}
        </span>
      </button>
    </div>
  </nav>
  <router-view></router-view>
</template>
<script>
import emitter from "@/libs/emitter.js";

export default {
  data() {
    return {
      carts: {},
      products: [],
      id: "",
      cartData: [],
      isLoading: "",
    };
  },
  methods: {
    getProduct() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCarts() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data.carts;
          console.log(this.cartData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(item, qty = 1) {
      const newId = item.id + 1;

      this.isLoading = newId;
      const data = {
        product_id: item.id,
        qty: qty,
        product: item,
      };

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data: data }
        )
        .then((res) => {
          console.log(res);
          this.cartData.push(data);
          this.getCarts();
          this.isLoading = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCarts();
    emitter.on("get-cartitem", () => {
      this.getCarts();
    });

    this.getProduct();
  },
};
</script>
