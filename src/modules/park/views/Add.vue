<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel, computed } from "vue";
import { db } from "../../../firebase.config";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const { content } = useStore();

const checkIn = ref(new Date().toLocaleString("pt-BR"));
const licensePlate = ref("");
const selectedMark = ref("");
const selectedModel = ref("");

import { inject } from "vue";
const isSmallScreen = inject("isSmallScreenMessage");

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
  <Alert msg="Estadia criada com sucesso"></Alert>
  <Body title="Adicionar estadia">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleCreatePark">
        <i class="bi bi-plus-circle"></i>
        <p v-if="!isSmallScreen">Salvar</p>
      </button>
      <RouterLink to="/park">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <p v-if="!isSmallScreen">Voltar</p>
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td>Entrada:</td>
            <td>
              <input
                type="text"
                v-model="checkIn"
                readonly
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td width="30%">Placa:</td>
            <td width="70%">
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
        </table>
      </div>
    </template>
  </Body>
</template>
