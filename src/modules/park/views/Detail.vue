<script setup>
import { useStore } from "@/composables/useStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { formatTimestamp, timestamp1 } from "../util";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const route = useRoute();

import { inject } from "vue";
const isSmallScreen = inject("isSmallScreenMessage");

const { content } = useStore();
const newValue = ref("");
let checkOut = ref("");
const value = ref("");
const id = route.params.id;

let timestamp = ref();
let formattedTimestamp = ref();
formattedTimestamp = formatTimestamp(content.park.selectedPark?.checkIn);

async function handleFinishPark() {
  checkOut = new Date();
  const timeMilliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
  const resultMilliseconds = checkOut.getTime() - timeMilliseconds;
  const minutes = Math.floor(resultMilliseconds / (1000 * 60));

  const valorEstacionamento = await content.park.calculatePricePark(minutes);

  const res = await content.park.updatePark(id, {
    checkOut: checkOut,
    valuePark: valorEstacionamento,
  });
  if (!res) {
    alert("Estadia finalizada com sucesso");
    window.location.href = "/park";
  }
}

onMounted(() => {
  content.park.getPark(route.params.id);
});
</script>

<template>
  <Body title="Visualizar estadia">
    <template v-slot:buttons>
      <router-link :to="`/park/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i>
          <p v-if="!isSmallScreen">Editar</p>
        </button>
      </router-link>
      <RouterLink to="/park">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <p v-if="!isSmallScreen">Voltar</p>
        </button>
      </RouterLink>
      <button
        v-if="!content.park.selectedPark?.checkOut"
        @click="handleFinishPark"
        class="btn btn-dark"
      >
        <i class="bi bi-check-circle"></i>
        <p v-if="!isSmallScreen">Finalizar</p>
      </button>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Entrada:</td>
            <td width="70%">
              <input
                type="text"
                readonly
                :value="formattedTimestamp"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Placa:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.park.selectedPark?.licensePlate"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Marca:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.park.selectedPark?.mark"
                class="form-control"
              />
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>Model:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.park.selectedPark?.model"
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
                :value="content.park.selectedPark?.statusPark"
                class="form-control"
              />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
