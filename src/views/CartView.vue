<template>
  <div class="container">
    <Loading :active="isLoading" :can-cancel="!isLoading"></Loading>

    <h2>購物車</h2>
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="removeCartAll"
      >
        清空購物車
      </button>
    </div>
    <!-- 產品Modal -->

    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>單價</th>
          <th>總計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartData" :key="product.id">
          <td>{{ product.product.title }}</td>
          <td>
            {{ product.qty }} /
            {{ product.product.unit }}
          </td>
          <td>
            {{ product.product.price }}
          </td>
          <td>
            {{ product.final_total }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="removerCartItem(product.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
      isLoading: false,
      total: 0,
    };
  },
  methods: {
    removerCartItem(id) {
      this.isLoading = true;

      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then(() => {
          this.getCarts();
          this.isLoading = false;
          emitter.emit("get-cartitem");
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getProduct() {
      this.isLoading = true;

      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getCarts() {
      this.isLoading = true;

      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data.carts;
          this.cartData.forEach((element) => {
            this.total = this.total + element.final_total;
          });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    addToCart(item, qty = 1) {
      this.isLoading = true;

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
          emitter.emit("get-cartitem");
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    removeCartAll() {
      this.isLoading = true;

      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          this.getCarts();
          this.total = "";
          this.isLoading = false;
          emitter.emit("get-cartitem");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCarts();
    this.getProduct();
  },
};
</script>
