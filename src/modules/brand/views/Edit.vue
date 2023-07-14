<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();

const desc = ref(content.brand.selectedBrand?.descBrand);
const status = ref(content.brand.selectedBrand?.statusBrand);
const id = route.params.id;

async function handleEditBrand() {
  const res = await content.brand.updateBrand(id, {
    descBrand: desc.value,
    statusBrand: status.value,
  });
  if (!res) {
    alert("Marca editada com sucesso");
    window.location.href = "/brand";
  }
}

onMounted(async () => {
  if (content.brand.selectedBrand?.id) return;
  content.brand.getBrand(route.params.id);
  console.log("ONDE")
});
</script>

<template>
  <h1>EDITAR</h1>
  <button @click="handleEditBrand">Atualizar</button>
  <router-link :to="`/brand/${route.params.id}`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Marca</td>
      <td><input type="text" v-model="desc" /></td>
    </tr>
    <tr>
      <td>Status</td>
      <td><input type="text" v-model="status" /></td>
    </tr>
  </table>
</template>
