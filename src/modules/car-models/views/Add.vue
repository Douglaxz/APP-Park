<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
import { db } from "../../../firebase.config";

const { content } = useStore();

const newModel = ref("");
const selectedMark = ref("");

async function handleCreateModel() {
  const res = await content.model.addModel({
    descModel: newModel.value,
    statusModel: true,
    idMark: selectedMark.value,
  });
  if (res) {
    alert("Modelo criado com sucesso");
    window.location.href = "/model";
  }
}

onMounted(() => {
  content.model.getModelsWithStatusTrue();
});
</script>
<template>
  <main>
    <label for=""> Marca: </label>
    <select v-model="selectedMark">
      <option value="">Selecione uma marca</option>
      <option
        v-for="mark in content.model.items"
        :value="mark.id"
        :key="mark.id"
      >
        {{ mark.descMark }}
      </option>
    </select>
    <label for="">
      Modelo:
      <input type="text" v-model="newModel" />
    </label>
    <button @click="handleCreateModel">Create</button>
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
