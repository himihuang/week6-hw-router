<template>
  <div>
    <h1>產品內頁</h1>
    <div>
      <img :src="product.imageUrl" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          console.log(res);
          this.product = res.data.product;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
    this.loading();
  },
};
</script>
