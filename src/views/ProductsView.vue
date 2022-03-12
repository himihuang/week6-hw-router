<template>
  <div>
    <Loading :active="isLoading" :can-cancel="!isLoading"></Loading>
    <h2>產品列表</h2>
    <!-- 產品Modal -->

    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="product in products" :key="product.id">
          <tr v-if="product.is_enabled">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openModal(product.id)"
                  :disabled="isLoading === product.id + 2"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-show="isLoading === product.id + 2"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product)"
                  :disabled="isLoading === product.id + 1"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-show="isLoading == product.id + 1"
                  ></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </template>
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
    emitter.on("update-products", () => {
      this.getProduct();
    });
  },
};
</script>
