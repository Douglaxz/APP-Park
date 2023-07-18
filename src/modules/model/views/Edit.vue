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
const desc = ref(content.model.selectedModel?.descModel);
const selectedMark = ref(content.model.selectedModel?.idMark);
const status = ref(content.model.selectedModel?.statusModel);
const id = route.params.id;

async function handleUpdateModel() {
  const res = await content.model.updateModel(id, {
    descModel: desc.value,
    statusModel: status.value,
    idMark: selectedMark.value,
  });
  if (!res) {
    const myModalAlternative = new bootstrap.Modal("#exampleModal");
    myModalAlternative.show();
    this.$router.push("/model");
  }
}

onMounted(() => {
  content.model.getModelsWithStatusTrue();
  if (content.model.selectedModel?.id) return;
  content.model.getModel(route.params.id);
});
</script>

<template>
  <Alert msg="Modelo de veículo atualizado com sucesso"></Alert>
  <Body title="Editar modelo de veículos">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleUpdateModel">
        <i class="bi bi-check-circle"></i>
        <p v-if="!isSmallScreen">Salvar</p>
      </button>
      <router-link :to="`/model/${route.params.id}`">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i>
          <p v-if="!isSmallScreen">Voltar</p>
        </button>
      </router-link></template
    >
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td>Marca:</td>
            <td>
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
