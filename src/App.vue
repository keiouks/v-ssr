<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

function addCount() {
  count.value++;
}
</script>

<template>
  <button @click="addCount">{{ count }}</button>
  <div class="good">good</div>
  <img src="./20230707075538555-900x900.jpg" width="100" height="100" />
</template>

<style scoped>
.good {
  color: red;
}
</style>
