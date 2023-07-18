<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import Body from "../../../components/body.vue";
import { inject } from "vue";

const isSmallScreen = ref(inject("isSmallScreenMessage"));

const { content } = useStore();
const newTitle = ref("");

onMounted(async () => {
  content.brand.brands();

  this.items = res.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<template>
  <Body title="Marca de veículos">
    <template v-slot:buttons>
      <RouterLink to="/brand/add">
        <button class="btn btn-dark">
          <i class="bi bi-plus-circle"></i>
          <span v-if="!isSmallScreen">Adicionar</span>
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th width="30%">Marca</th>
            <th width="20%">Status</th>
            <th width="20%">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in content.brand.items">
            <td class="text-left align-middle">{{ brand.descBrand }}</td>
            <td class="text-center align-middle">
              <i
                v-if="brand.statusBrand"
                class="bi bi-toggle2-on text-success fs-1"
              ></i>
              <i v-else class="bi bi-toggle2-off text-danger fs-1"></i>
            </td>
            <td>
              <router-link :to="`/brand/${brand.id}`">
                <button class="btn btn-dark">
                  <i class="bi bi-eye"></i>
                  <span v-if="!isSmallScreen">Visualizar</span>
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
