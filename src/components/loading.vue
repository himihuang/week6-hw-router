<template>
  <div></div>
</template>
<script>
import { useLoading } from "vue3-loading-overlay";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    loading() {
      if (this.isLoading) {
        let loader = useLoading();
        loader.show({});
      }
    },
  },
};
</script>
