<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Body from "../../../components/body.vue";
import { inject } from "vue";

const isSmallScreen = ref(inject("isSmallScreenMessage"));

const route = useRoute();
const { content } = useStore();
const newTitle = ref("");
const newValue = ref("");
const newBrand = ref("");

async function handleCreateBrand() {
  const res = await content.brand.addBrands({
    descBrand: newBrand.value,
    statusBrand: "true",
    valBrand: newValue.value,
  });
  if (!res) return;
  alert("Marca criada com sucesso");
  this.$router.push("/brand");
}
</script>

<template>
  <Body title="Adicionar uma marca de veículo">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleCreateBrand">
        <i class="bi bi-plus-circle"></i>
        <span v-if="!isSmallScreen">Salvar</span>
      </button>
      <RouterLink to="/brand">
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
            <td>Marca:</td>
            <td>
              <input type="text" v-model="newBrand" class="form-control" />
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
<style></style>
