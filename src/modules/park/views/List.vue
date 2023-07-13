<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();

onMounted(async () => {
  content.park.getParks();
});
</script>

<template>
  <main>
    <RouterLink to="/park/add">Adicionar Estadia</RouterLink>
    <hr />
    <table>
      <tr>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Placa</th>
        <th>Data Entrada</th>
        <th>Hora Entrada</th>
        <th>Data Saída</th>
        <th>Hora Saída</th>
        <th>Valor</th>
        <th>Ação</th>
      </tr>
      <tr v-for="park in content.park.items">
        <td>{{ park.marca }}</td>
        <td>{{ park.descModel }}</td>
        <td>{{ park.licensePlate }}</td>
        <td>
          {{ park.checkIn.toDate().toLocaleDateString() }}
        </td>
        <td>
          {{ park.checkIn.toDate().toLocaleTimeString() }}
        </td>
        <td>
          {{ park.checkOut?.toDate().toLocaleDateString() }}
        </td>
        <td>
          {{ park.checkOut?.toDate().toLocaleTimeString() }}
        </td>
        <td>{{ park.valuePark }}</td>
        <td>{{ park.statusModel }}</td>
        <td>
          <router-link :to="`/park/${park.id}`">
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
