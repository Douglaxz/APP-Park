<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";
import { inject } from "vue";
const isSmallScreen = inject("isSmallScreenMessage");

onMounted(async () => {
  content.park.getParks();
});
</script>

<template>
  <Body title="Estadia">
    <template v-slot:buttons>
      <RouterLink to="/park/add">
        <button class="btn btn-dark">
          <i class="bi bi-plus-circle"></i>
          <p v-if="!isSmallScreen">Adicionar</p>
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <table class="table table-striped table-hover">
        <thead class="table-dark table-responsive">
          <tr>
            <th>Modelo</th>
            <th>Placa</th>
            <th>Entrada</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="park in content.park.items">
            <td>{{ park.descModel }}</td>
            <td>{{ park.licensePlate }}</td>
            <td>
              {{ park.checkIn.toDate().toLocaleDateString() }}
              {{ park.checkIn.toDate().toLocaleTimeString().slice(0, 5) }}
            </td>
            <td>{{ park.valuePark }}</td>
            <td class="text-center align-middle">
              <router-link :to="`/park/${park.id}`">
                <button class="btn btn-dark">
                  <i class="bi bi-eye"></i>
                  <p v-if="!isSmallScreen">Visualizar</p>
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Body>
</template>

<style></style>
