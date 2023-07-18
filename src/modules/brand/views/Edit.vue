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

const desc = ref(content.brand.selectedBrand?.descBrand);
const status = ref(content.brand.selectedBrand?.statusBrand);
const id = route.params.id;

async function handleEditBrand() {
  const res = await content.brand.updateBrand(id, {
    descBrand: desc.value,
    statusBrand: status.value,
  });
  if (!res) {
    alert("Marca editada com sucesso");
    window.location.href = "/brand";
  }
}

onMounted(async () => {
  if (content.brand.selectedBrand?.id) return;
  content.brand.getBrand(route.params.id);
});
</script>

<template>
  <Body title="Editar marca de veículos">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleEditBrand">
        <i class="bi bi-check-circle"></i>
        <span v-if="!isSmallScreen">Salvar</span>
      </button>
      <router-link :to="`/brand/${route.params.id}`">
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
            <td>Marca:</td>
            <td>
              <input type="text" v-model="desc" class="form-control" />
            </td>
          </tr>

          <tr>
            <td>Status:</td>
            <td>
              <select v-model="status" class="form-control">
                <option :value="true">Ativo</option>
                <option :value="false">Desativado</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
