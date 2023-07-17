<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();

onMounted(() => {
  //chama action
  content.brand.getBrand(route.params.id);
  console.log("ONDE - Detail")
});
</script>

<template>
  <h2>Visualizar</h2>
  <router-link :to="`/brand/${route.params.id}/edit`"> Editar </router-link>
  <router-link :to="`/brand/`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Marca:</td>
      <td>
        <input class="mb-1"
          type="text"
          readonly
          :value="content.brand.selectedBrand?.descBrand"
        />
      </td>
    </tr>
    <tr>
      <td>Status:</td>
      <td>
        <input class="mb-1"
          type="text"
          readonly
          :value="content.brand.selectedBrand?.statusBrand"
        />
      </td>
    </tr>
  </table>
</template>

