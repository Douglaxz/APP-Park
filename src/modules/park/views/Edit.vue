<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel, computed } from "vue";
import { useRoute } from "vue-router";
import { formatTimestamp } from "../util";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const route = useRoute();
const { content } = useStore();

import { inject } from "vue";
const isSmallScreen = inject("isSmallScreenMessage");

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
  <Alert msg="Estadia atualizado com sucesso"></Alert>
  <Body title="Editar estadia">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleUpdatePark">
        <i class="bi bi-check-circle"></i>
        <p v-if="!isSmallScreen">Salvar</p>
      </button>
      <router-link :to="`/park/${route.params.id}`">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <p v-if="!isSmallScreen">Voltar</p>
        </button>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Entrada:</td>
            <td width="70%">
              <input
                type="text"
                readonly
                :value="formattedTimestamp"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Placa:</td>
            <td>
              <input type="text" v-model="licensePlate" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>Marca:</td>
            <td>
              <select
                v-model="selectedMark"
                @change="updateModel"
                class="form-control"
              >
                <option value="">Selecione uma marca</option>
                <option
                  v-for="mark in content.park.mark"
                  :value="mark.id"
                  :key="mark.id"
                >
                  {{ mark.descBrand }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Modelo:</td>
            <td>
              <select v-model="selectedModel" class="form-control">
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
            <td>Status:</td>
            <td>
              <select v-model="status" class="form-control">
                <option :value="true">Ativo</option>
                <option :value="false">Desativado</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
