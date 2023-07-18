<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Body from "../../../components/body.vue";
import { inject } from "vue";

const isSmallScreen = ref(inject("isSmallScreenMessage"));

const route = useRoute();
const { content } = useStore();
const local = ref(false);
const status = ref("");

async function getBrand() {
  await content.brand.getBrand(route.params.id);
  local.value = content.brand.selectedBrand?.statusBrand;
  console.log(local.value);
  if (local.value) {
    status.value = "Ativo";
  } else {
    status.value = "Desativado";
  }
}

onMounted(() => {
  getBrand();
});
</script>

<template>
  <Body title="Visualizar marca de veículos">
    <template v-slot:buttons>
      <router-link :to="`/brand/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i>
          <span v-if="!isSmallScreen">Editar</span>
        </button>
      </router-link>
      <router-link :to="`/brand/`">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <span v-if="!isSmallScreen">Voltar</span>
        </button>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Marca:</td>
            <td width="70%">
              <input
                type="text"
                readonly
                :value="content.brand.selectedBrand?.descBrand"
                class="form-control"
              />
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
