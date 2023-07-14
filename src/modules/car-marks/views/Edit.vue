<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();

const desc = ref(content.mark.selectedCarMarks?.descMark);
const status = ref(content.mark.selectedCarMarks?.statusMark);
const id = route.params.id;

async function handleEditMark() {
  const res = await content.mark.updateMark(id, {
    descMark: desc.value,
    statusMark: status.value,
  });
  if (!res) {
    alert("Marca editada com sucesso");
    window.location.href = "/carMarks";
  }
}

onMounted(async () => {
  if (content.mark.selectedCarMarks?.id) return;
  content.mark.getCarMark(route.params.id);
});
</script>

<template>
  <h1>EDITAR</h1>
  <button @click="handleEditMark">Atualizar</button>
  <router-link :to="`/carMarks/${route.params.id}`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Marca</td>
      <td><input type="text" v-model="desc" /></td>
    </tr>
    <tr>
      <td>Status</td>
      <td><input type="text" v-model="status" /></td>
    </tr>
  </table>
</template>
