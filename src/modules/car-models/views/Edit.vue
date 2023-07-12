<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();
const desc = ref(content.model.selectedModel?.descModel);
const selectedMark = ref(content.model.selectedModel?.idMark);
const status = ref(content.model.selectedModel?.statusModel);
const id = route.params.id;

async function handleUpdateModel() {
  const res = await content.model.updateModel(id, {
    descModel: desc.value,
    statusModel: status.value,
    idMark: selectedMark.value,
  });
  if (!res) {
    alert("Model atualizado com sucesso");
    window.location.href = "/model";
  }
}

onMounted(() => {
  content.model.getModelsWithStatusTrue();
  if (content.model.selectedModel?.id) return;
  content.model.getModel(route.params.id);
});
</script>

<template>
  <h1>EDITAR</h1>
  <button @click="handleUpdateModel">Atualizar</button>
  <router-link :to="`/model/${route.params.id}`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
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
    </tr>
    <tr>
      <td>Descrição</td>
      <td>
        <input type="text" v-model="desc" />
      </td>
    </tr>

    <tr>
      <td>Status</td>
      <td><input type="text" v-model="status" /></td>
    </tr>
  </table>
</template>
