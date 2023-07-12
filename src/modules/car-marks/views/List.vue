<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const { content } = useStore();

const route = useRoute();
const newTitle = ref("");

async function handleCreateCarMark() {
  const res = await content.mark.addCarMark({
    descMark: newTitle.value,
    statusMark: true,
  });
  if (res) {
    alert("criado com sucesso");
    content.mark.getCarMarks();
  }
}

onMounted(async () => {
  content.mark.getCarMarks();
});
</script>

<template>
  <main>
    <label for="">
      Marca
      <input type="text" v-model="newTitle" />
    </label>
    <button @click="handleCreateCarMark">Create</button>
    <div v-for="mark in content.mark.items">
      <router-link :to="`/carMarks/${mark.id}`">
        <h3>{{ mark.descMark }}</h3>
      </router-link>
    </div>
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
