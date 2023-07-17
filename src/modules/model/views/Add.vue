<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
import { db } from "../../../firebase.config";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const { content } = useStore();

const newModel = ref("");
const selectedMark = ref("");

async function handleCreateModel() {
  const res = await content.model.addModel({
    descModel: newModel.value,
    statusModel: true,
    idMark: selectedMark.value,
  });
  if (res) {
    alert("Modelo criado com sucesso");
    this.$router.push("/model");
  }
}

onMounted(() => {
  content.model.getModelsWithStatusTrue();
});
</script>
<template>
  <Alert msg="Item da tabela de preços criado com sucesso"></Alert>
  <Body title="Adicionar modelo de veículo">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleCreateModel">
        <i class="bi bi-plus-circle"></i> Salvar
      </button>
      <RouterLink to="/model">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i> Voltar
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Marca:</td>
            <td width="70%">
              <select v-model="selectedMark" class="form-control">
                <option value="">Selecione uma marca</option>
                <option
                  v-for="mark in content.model.items"
                  :value="mark.id"
                  :key="mark.id"
                >
                  {{ mark.descBrand }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Modelo:</td>
            <td>
              <input type="text" v-model="newModel" class="form-control" />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
<style></style>
