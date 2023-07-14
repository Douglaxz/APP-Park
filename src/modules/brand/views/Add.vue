<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();
const newTitle = ref("");
const newValue = ref("");

async function handleCreateBrand() {
  const res = await content.brand.addBrands({
    descBrand: newTitle.value,
    statusBrand: "true",
    valBrand: newValue.value,
  });
  if (!res) return;
    alert("Item criado com sucesso");
    window.location.href = "/brand";
}
</script>
<template>
  <main>
    <label for="">
      Descrição:
      <input type="text" v-model="newTitle" />
    </label>
    <button @click="handleCreateBrand">Create</button>
  </main>
</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>