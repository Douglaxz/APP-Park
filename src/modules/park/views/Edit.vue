<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel, computed } from "vue";
import { useRoute } from "vue-router";
import { formatTimestamp } from "../util";

const route = useRoute();
const { content } = useStore();

const selectedMark = ref(content.park.selectedPark?.idMark);
const selectedModel = ref(content.park.selectedPark?.idModel);
const status = ref(content.park.selectedPark?.statusPark);
const licensePlate = ref(content.park.selectedPark?.licensePlate);
let timestamp = ref();
let formattedTimestamp = ref();

const id = route.params.id;
timestamp = content.park.selectedPark?.checkIn;
formattedTimestamp = formatTimestamp(timestamp);

const filteredModels = computed(() => {
  return (
    content.park.model?.filter(
      (model) => model.idMark === selectedMark.value
    ) || []
  );
});

async function handleUpdatePark() {
  const res = await content.park.updatePark(id, {
    licensePlate: licensePlate.value,
    statusPark: status.value,
    idModel: selectedModel.value,
  });
  if (!res) {
    alert("Estadia atualizado com sucesso");
    window.location.href = "/park";
  }
}

onMounted(() => {
  content.park.getMarksWithStatusTrue();
  content.park.getModelsWithStatusTrue();
  content.park.getPark(route.params.id);
});
</script>

<template>
  <h1>EDITAR</h1>
  <button @click="handleUpdatePark">Atualizar</button>
  <router-link :to="`/park/${route.params.id}`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Entrada</td>
      <td>
        <input type="text" readonly :value="formattedTimestamp" />
      </td>
    </tr>
    <tr>
      <td>Placa</td>
      <td>
        <input type="text" v-model="licensePlate" />
      </td>
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
    <tr>
      <td>Status</td>
      <td><input type="text" v-model="status" /></td>
    </tr>
  </table>
</template>
