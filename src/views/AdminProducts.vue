<template>
  <div class="container">
    <Loading :active="isLoading" :can-cancel="!isLoading"></Loading>
    <productModal
      ref="productModal"
      :temp-product="temp"
      :isEdit="isEdit"
      @updateItem="getProducts"
    ></productModal>
    <h1>產品列表</h1>
    <button type="button" class="btn btn-primary" @click="openModal(false)">
      新增產品
    </button>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th>是否啟用</th>
          <th>修改</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="product in products" :key="product.id">
          <tr>
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
              <div>
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  v-model="product.is_enabled"
                  @change="getProduct(product)"
                />
              </div>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="openModal(true, product)"
              >
                編輯
              </button>

              <button type="button" class="btn btn-outline-danger">刪除</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import productModal from "@/components/productModal.vue";
import emitter from "@/libs/emitter.js";
export default {
  components: { productModal },
  data() {
    return {
      isLoading: false,
      products: [],
      product: {},
      temp: {
        imagesUrl: [],
      },
      isEdit: false,
    };
  },
  methods: {
    checkLogIn() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)himiCookie\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common["Authorization"] = token;

      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
    getProduct(product) {
      this.product = JSON.parse(JSON.stringify(product));
      console.log(this.product);
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`,
          { data: this.product }
        )
        .then((res) => {
          emitter.emit("update-products");
          console.log(res);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`
        )
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          this.isLoading = false;
        });
    },
    openModal(isEdit, product) {
      if (isEdit) {
        if (!product.imagesUrl) {
          this.temp = { ...product, imagesUrl: [] };
        } else {
          this.temp = { ...product };
        }
        this.isEdit = true;
      } else {
        this.temp = {
          imagesUrl: [],
        };
        this.isEdit = false;
      }
      this.$refs.productModal.openModal();
    },
  },
  mounted() {
    this.checkLogIn();
    this.getProducts();
  },
};
</script>
