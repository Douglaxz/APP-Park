<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

import { inject } from "vue";

const isSmallScreen = ref(inject("isSmallScreenMessage"));

const route = useRoute();

const { content } = useStore();
const newValue = ref("");
const local = ref(false);
const status = ref("");
async function getPrice() {
  await content.price.getPrice(route.params.id);
  local.value = content.price.selectedPrice?.statusPrice;
  if (local.value) {
    status.value = "Ativo";
  } else {
    status.value = "Desativado";
  }
}
onMounted(() => {
  getPrice();
});
</script>

<template>
  <Body title="Visualizar lista de preços">
    <template v-slot:buttons>
      <router-link :to="`/price/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i>
          <span v-if="!isSmallScreen">Editar</span>
        </button>
      </router-link>
      <RouterLink to="/price">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <span v-if="!isSmallScreen">Voltar</span>
        </button>
      </RouterLink></template
    >
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Descrição:</td>
            <td width="70%">
              <input
                type="text"
                readonly
                :value="content.price.selectedPrice?.descPrice"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Valor: R$</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.price.selectedPrice?.valPrice"
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
          <tr>
            <td>Minuto inicio:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.price.selectedPrice?.minuteStartPrice"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Minuto final:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.price.selectedPrice?.minuteFinalPrice"
                class="form-control"
              />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
