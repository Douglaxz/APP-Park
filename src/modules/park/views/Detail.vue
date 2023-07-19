<script setup>
import { useStore } from "@/composables/useStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { formatTimestamp } from "../util";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const route = useRoute();

import { inject } from "vue";
const isSmallScreen = inject("isSmallScreenMessage");

const { content } = useStore();
const newValue = ref("");
const value = ref("");
const id = route.params.id;
const local = ref(false);
const status = ref("");
const checkIn = ref("");

let timestamp = ref();
let formattedTimestamp = ref();
let formattedTimestampCheckOut = ref();
formattedTimestamp = formatTimestamp(content.park.selectedPark?.checkIn);
formattedTimestampCheckOut = formatTimestamp(
  content.park.selectedPark?.checkOut
);

async function handleFinishPark() {
  const checkOut = new Date();
  const timestamp = checkIn.value;

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
    this.$router.push("/park");
  }
}

async function getPark() {
  await content.park.getPark(route.params.id);
  local.value = content.park.selectedPark?.statusPark;
  if (local.value) {
    status.value = "Ativo";
  } else {
    status.value = "Desativado";
  }
  checkIn.value = content.park.selectedPark?.checkIn;
}

onMounted(() => {
  getPark();
});
</script>

<template>
  <Body title="Visualizar estadia">
    <template v-slot:buttons>
      <router-link :to="`/park/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i>
          <span v-if="!isSmallScreen">Editar</span>
        </button>
      </router-link>
      <RouterLink to="/park">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <span v-if="!isSmallScreen">Voltar</span>
        </button>
      </RouterLink>
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
            <td>Modelo:</td>
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
                :value="status"
                class="form-control"
              />
            </td>
          </tr>
          <tr v-if="content.park.selectedPark?.checkOut">
            <td>Saida:</td>
            <td>
              <input
                type="text"
                readonly
                :value="formattedTimestampCheckOut"
                class="form-control"
              />
            </td>
          </tr>
          <tr v-if="content.park.selectedPark?.checkOut">
            <td>Valor R$:</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.park.selectedPark?.valuePark"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button
                v-if="!content.park.selectedPark?.checkOut"
                @click="handleFinishPark"
                class="btn btn-dark w-100"
              >
                <i class="bi bi-check-circle"></i>
                <span>Finalizar</span>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
