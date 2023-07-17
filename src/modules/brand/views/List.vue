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
  
  /* this.items = res.sort((a, b) => a.name.localeCompare(b.name));
   console.log("AQUI MESMO") */
}

onMounted(async () => {
  content.brand.brands();
});
</script>

<template>

   <STYLE>A {text-decoration: none;} </STYLE>
 
    <main>
      
      <label for="">
        Marca:
        <input type="text" v-model="newTitle" class="mb-3 mt-2"/>
      </label>
      <button @click="handleCreateBrand" class="ml-9">Criar</button>
      <div v-for="brand in content.brand.items">
        <router-link :to="`/brand/${brand.id}`">
          <h6>{{ brand.descBrand }}</h6>
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
