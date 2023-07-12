<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";

const { content } = useStore();

const newTitle = ref("");
const newValue = ref("");

async function handleCreatePrice() {
  const res = await content.price.addPrice({
    descPrice: newTitle.value,
    statusPrice: "true",
    valPrice: newValue.value,
  });

  if (!res) {
    alert("Item da tabela de preços criado com sucesso");
    window.location.href = "/price";
  }
}
</script>
<template>
  <main>
    <label for="">
      Descrição:
      <input type="text" v-model="newTitle" />
    </label>
    <label for="">
      Valor R$:
      <input type="text" v-model="newValue" />
    </label>
    <button @click="handleCreatePrice">Create</button>
  </main>
</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
