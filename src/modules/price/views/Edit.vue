<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();
const desc = ref(content.price.selectedPrice?.descPrice);
const valor = ref(content.price.selectedPrice?.valPrice);
const status = ref(content.price.selectedPrice?.statusPrice);

const id = route.params.id;

async function handleUpdatePrice() {
  const res = await content.price.updatePrice(id, {
    descPrice: desc.value,
    statusPrice: status.value,
    valPrice: valor.value,
  });
  if (res) {
    alert("Item da tabela de preços atuaizado com sucesso");
  }
}

onMounted(() => {
  if (content.price.selectedPrice?.id) return;
  content.price.getPrice(route.params.id);
});
</script>

<template>
  <h1>EDITAR</h1>
  <button @click="handleUpdatePrice">Atualizar</button>
  <router-link :to="`/price/${route.params.id}`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Descrição</td>
      <td>
        <input type="text" v-model="desc" />
      </td>
    </tr>
    <tr>
      <td>Valor</td>
      <td><input type="text" v-model="valor" /></td>
    </tr>
    <tr>
      <td>Status</td>
      <td><input type="text" v-model="status" /></td>
    </tr>
  </table>
</template>
