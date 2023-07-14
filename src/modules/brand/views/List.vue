<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const { content } = useStore();

const route = useRoute();
const newTitle = ref("");

async function handleCreateBrand() {
  const res = await content.brand.addBrands({
    descBrand: newTitle.value,
    statusBrand: true,
  });
  if (res) {
    alert("criado com sucesso");
    content.brand.brands();
  }
}

onMounted(async () => {
  content.brand.brands();
});
</script>

<template>
  <main>
    <label for="">
      Marca
      <input type="text" v-model="newTitle" />
    </label>
    <button @click="handleCreateBrand">Create</button>
    <div v-for="brand in content.brand.items">
      <router-link :to="`/brand/${brand.id}`">
        <h3>{{ brand.descBrand }}</h3>
      </router-link>
    </div>
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
