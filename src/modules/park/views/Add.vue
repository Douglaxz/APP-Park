<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel, computed } from "vue";
import { db } from "../../../firebase.config";

const { content } = useStore();

const checkIn = ref(new Date().toLocaleString("pt-BR"));
const licensePlate = ref("");
const selectedMark = ref("");
const selectedModel = ref("");

const filteredModels = computed(() => {
  return (
    content.park.model?.filter(
      (model) => model.idMark === selectedMark.value
    ) || []
  );
});

async function handleCreatePark() {
  const res = await content.park.addPark({
    checkIn: new Date(),
    statusPark: true,
    idModel: selectedModel.value,
    licensePlate: licensePlate.value,
  });
  if (res) {
    alert("Estadia criada com sucesso");
    window.location.href = "/park";
  }
}

onMounted(() => {
  content.park.getModelsWithStatusTrue();
  content.park.getMarksWithStatusTrue();
});
</script>
<template>
  <main>
    <table>
      <tr>
        <td>Entrada</td>
        <td><input type="text" v-model="checkIn" readonly /></td>
      </tr>
      <tr>
        <td>Placa</td>
        <td><input type="text" v-model="licensePlate" /></td>
      </tr>
      <tr>
        <td>Marca</td>
        <td>
          <select v-model="selectedMark" @change="updateModel">
            <option value="">Selecione uma marca</option>
            <option
              v-for="mark in content.park.mark"
              :value="mark.id"
              :key="mark.id"
            >
              {{ mark.descMark }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Modelo:</td>
        <td>
          <select v-model="selectedModel">
            <option value="">Selecione um modelo</option>
            <option
              v-for="model in filteredModels"
              :value="model.id"
              :key="model.id"
            >
              {{ model.descModel }}
            </option>
          </select>
        </td>
      </tr>
    </table>
    <button @click="handleCreatePark">Adicionar</button>
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
