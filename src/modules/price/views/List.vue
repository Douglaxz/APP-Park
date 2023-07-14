<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();

onMounted(async () => {
  content.price.getPrices();
});
</script>

<template>
  <main>
    <div class="internBox">
      <div class="titleList">
        Lista de preços
        <RouterLink to="/price/add">
          <button class="btn btn-dark">
            <i class="bi bi-plus-circle"></i> Adicionar
          </button>
        </RouterLink>
      </div>
      <div class="contentList">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th width="30%">Descrição</th>
              <th width="10%">Valor R$</th>

              <th width="15%">Minuto Inicial</th>
              <th width="15%">Minuto Final</th>
              <th width="10%">Status</th>
              <th width="20%">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="price in content.price.items">
              <td class="text-left align-middle">{{ price.descPrice }}</td>
              <td class="text-right align-middle">R$ {{ price.valPrice }}</td>
              <td class="text-center align-middle">
                {{ price.minuteStartPrice }}
              </td>
              <td class="text-center align-middle">
                {{ price.minuteFinalPrice }}
              </td>
              <td class="text-center align-middle">
                <i
                  v-if="price.statusPrice"
                  class="bi bi-toggle2-on text-success fs-1"
                ></i>
                <i v-else class="bi bi-toggle2-off text-danger fs-1"></i>
              </td>
              <td class="text-center align-middle">
                <router-link :to="`/price/${price.id}`">
                  <button class="btn btn-dark">
                    <i class="bi bi-eye"></i> Visualizar
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style></style>
