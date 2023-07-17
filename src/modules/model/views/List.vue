<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
const { content } = useStore();
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";
import { inject } from "vue";

const isSmallScreen = inject("isSmallScreenMessage");

onMounted(async () => {
  content.model.getModels();
});
</script>

<template>
  <Body title="Modelos de veículos">
    <template v-slot:buttons>
      <RouterLink to="/model/add">
        <button class="btn btn-dark">
          <i class="bi bi-plus-circle"></i>
          <p v-if="!isSmallScreen">Adicionar</p>
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th width="30%">Marca</th>
            <th width="30%">Model</th>
            <th width="20%">Status</th>
            <th width="20%">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in content.model.items">
            <td class="text-left align-middle">{{ model.marca }}</td>
            <td class="text-left align-middle">{{ model.descModel }}</td>
            <td class="text-center align-middle">
              <i
                v-if="model.statusModel"
                class="bi bi-toggle2-on text-success fs-1"
              ></i>
              <i v-else class="bi bi-toggle2-off text-danger fs-1"></i>
            </td>
            <td>
              <router-link :to="`/model/${model.id}`">
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
