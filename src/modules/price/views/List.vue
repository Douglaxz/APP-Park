<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();

onMounted(async () => {
  content.price.getModels();
});
</script>

<template>
  <main>
    <RouterLink to="/price/add">Adicionar Preço</RouterLink>
    <hr />
    <table>
      <tr>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Status</th>
        <th>Ação</th>
      </tr>
      <tr v-for="price in content.price.items">
        <td>{{ price.descPrice }}</td>
        <td>{{ price.valPrice }}</td>
        <td>{{ price.statusPrice }}</td>
        <td>
          <router-link :to="`/model/${price.id}`">
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
