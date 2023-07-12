<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { content } = useStore();
const newValue = ref("");

onMounted(() => {
  //chama action
  content.model.getModel(route.params.id);
});
</script>

<template>
  <h1>Visualizar</h1>
  <router-link :to="`/model/${route.params.id}/edit`"> Editar </router-link>
  <router-link :to="`/model/`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Marca</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.model.selectedModel?.mark"
        />
      </td>
    </tr>
    <tr>
      <td>Modelo</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.model.selectedModel?.descModel"
        />
      </td>
    </tr>
    <tr>
      <td>Status</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.model.selectedModel?.statusModel"
        />
      </td>
    </tr>
  </table>
</template>
