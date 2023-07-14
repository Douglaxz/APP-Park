<script setup>
import { useStore } from "@/composables/useStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { formatTimestamp, timestamp1 } from "../util";

const route = useRoute();

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
  console.log(valorEstacionamento);

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
  <h1>Visualizar</h1>
  <router-link :to="`/park/${route.params.id}/edit`"> Editar </router-link>
  <router-link :to="`/park/`"> Voltar </router-link>
  <button v-if="!content.park.selectedPark?.checkOut" @click="handleFinishPark">
    Finalizar
  </button>
  <hr />
  <table>
    <tr>
      <td>Entrada</td>
      <td>
        <input type="text" readonly :value="formattedTimestamp" />
      </td>
    </tr>
    <tr>
      <td>Placa</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.park.selectedPark?.licensePlate"
        />
      </td>
    </tr>
    <tr>
      <td>Marca</td>
      <td>
        <input type="text" readonly :value="content.park.selectedPark?.mark" />
      </td>
    </tr>
    <tr></tr>
    <tr>
      <td>Model</td>
      <td>
        <input type="text" readonly :value="content.park.selectedPark?.model" />
      </td>
    </tr>
    <tr>
      <td>Status</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.park.selectedPark?.statusPark"
        />
      </td>
    </tr>
  </table>
</template>
