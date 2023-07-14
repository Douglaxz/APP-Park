<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const route = useRoute();

const { content } = useStore();
const newValue = ref("");
const local = ref(false);
const status = ref("");

async function getModel() {
  await content.model.getModel(route.params.id);
  local.value = content.model.selectedModel?.statusModel;
  console.log(local.value);
  if (local.value) {
    status.value = "Ativo";
  } else {
    status.value = "Desativado";
  }
}

onMounted(() => {
  getModel();
});
</script>

<template>
  <Body title="Visualizar modelo de veículos">
    <template v-slot:buttons>
      <router-link :to="`/model/${route.params.id}/edit`">
        <button class="btn btn-dark">
          <i class="bi bi-pencil-square"></i> Editar
        </button>
      </router-link>
      <router-link :to="`/model/`">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i> Voltar
        </button>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Marca</td>
            <td width="70%">
              <input
                type="text"
                readonly
                :value="content.model.selectedModel?.mark"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Modelo</td>
            <td>
              <input
                type="text"
                readonly
                :value="content.model.selectedModel?.descModel"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <input
                type="text"
                readonly
                :value="status"
                class="form-control"
              />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Body>
</template>
