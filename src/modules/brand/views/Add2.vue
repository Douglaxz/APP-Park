<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const { content } = useStore();
import Body from "../../../components/body.vue";
import Alert from "../../../components/alert.vue";

const route = useRoute();
const newTitle = ref("");

async function handleCreateBrand() {
  const res = await content.brand.addBrands({
    descBrand: newTitle.value,
    statusBrand: true,
  });
  if (res) {
    alert("criado com sucesso");
    content.brand.brands();
  }

  /* this.items = res.sort((a, b) => a.name.localeCompare(b.name));
   console.log("AQUI MESMO") */
}

onMounted(async () => {
  content.brand.brands();
});
</script>

<template>
  <Body title="Marca de veículos">
    <template v-slot:buttons>
      <RouterLink to="/brand/add">
        <button class="btn btn-dark">
          <i class="bi bi-plus-circle"></i> Adicionar
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th width="30%">Marca</th>
            <th width="20%">Status</th>
            <th width="20%">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in content.brand.items">
            <td class="text-left align-middle">{{ brand.descBrand }}</td>
            <td class="text-center align-middle">
              <i
                v-if="brand.statusBrand"
                class="bi bi-toggle2-on text-success fs-1"
              ></i>
              <i v-else class="bi bi-toggle2-off text-danger fs-1"></i>
            </td>
            <td>
              <router-link :to="`/brand/${brand.id}`">
                <button class="btn btn-dark">
                  <i class="bi bi-eye"></i> Visualizar
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Body>
</template>

<style></style>
