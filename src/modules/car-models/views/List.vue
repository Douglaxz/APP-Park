<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();

onMounted(async () => {
  content.model.getModels();
});
</script>

<template>
  <main>
    <RouterLink to="/model/add">Adicionar Modelo</RouterLink>
    <hr />
    <table>
      <tr>
        <th>Marca</th>
        <th>Model</th>
        <th>Status</th>
        <th>Ação</th>
      </tr>

      <tr v-for="model in content.model.items">
        <td>{{ model.marca }}</td>
        <td>{{ model.descModel }}</td>
        <td>{{ model.statusModel }}</td>
        <td>
          <router-link :to="`/model/${model.id}`">
            <h3>Visualizar</h3>
          </router-link>
        </td>
      </tr>
    </table>
    <hr />
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
