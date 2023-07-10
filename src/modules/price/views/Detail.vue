<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { content } = useStore();
const newValue = ref("");

onMounted(() => {
  //chama action
  content.price.getPrice(route.params.id);
});
</script>

<template>
  <h1>Visualizar</h1>
  <router-link :to="`/price/${route.params.id}/edit`"> Editar </router-link>
  <router-link :to="`/price/`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Descrição</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.price.selectedPrice?.descPrice"
        />
      </td>
    </tr>
    <tr>
      <td>Valor</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.price.selectedPrice?.valPrice"
        />
      </td>
    </tr>
    <tr>
      <td>Status</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.price.selectedPrice?.statusPrice"
        />
      </td>
    </tr>
  </table>
</template>
