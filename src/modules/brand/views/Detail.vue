<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Body from "../../../components/body.vue";

const route = useRoute();
const { content } = useStore();

onMounted(() => {
  //chama action
  content.brand.getBrand(route.params.id);
  console.log("ONDE - Detail");
});
</script>

<template>
  <Body title="Visualizar marca de veículos">
    <template v-slot:buttons>
      <router-link :to="`/brand/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i> Editar
        </button>
      </router-link>
      <router-link :to="`/brand/`">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i> Voltar
        </button>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Marca:</td>
            <td width="70%">
              <select v-model="selectedBrand" class="form-control">
                <option value="">Selecione uma marca</option>
                <option
                  v-for="brand in content.brand.items"
                  :value="brand.id"
                  :key="brand.id"
                >
                  {{ brand.descBrand }}
                </option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Status:</td>
            <td>
              <input
                type="text"
                readonly
                :value="status"
                class="form-control"
              />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
