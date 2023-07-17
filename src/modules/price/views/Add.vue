<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref, useModel } from "vue";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const { content } = useStore();

const newTitle = ref("");
const newValue = ref("");
const minuteFinalPrice = ref("");
const minuteStartPrice = ref("");

async function handleCreatePrice() {
  const res = await content.price.addPrice({
    descPrice: newTitle.value,
    statusPrice: "true",
    valPrice: newValue.value,
    minuteFinalPrice: minuteFinalPrice.value,
    minuteStartPrice: minuteStartPrice.value,
  });

  if (!res) {
    const myModalAlternative = new bootstrap.Modal("#exampleModal");
    myModalAlternative.show();
    window.location.href = "/price";
  }
}
</script>
<template>
  <Alert msg="Item da tabela de preços criado com sucesso"></Alert>
  <Body title="Adicionar lista de preços">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleCreatePrice">
        <i class="bi bi-plus-circle"></i> Salvar
      </button>
      <RouterLink to="/price">
        <button class="btn btn-dark">
          <i class="bi bi-box-arrow-left"></i> Voltar
        </button>
      </RouterLink>
    </template>
    <template v-slot:content>
      <div class="formIntern">
        <table class="table">
          <tr>
            <td width="30%">Descrição:</td>
            <td width="70%">
              <input type="text" v-model="newTitle" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>Valor:</td>
            <td>
              <input type="text" v-model="newValue" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>Minuto inicio cobrança:</td>
            <td>
              <input
                type="text"
                v-model="minuteStartPrice"
                class="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>Minuto final cobrança:</td>
            <td>
              <input
                type="text"
                v-model="minuteFinalPrice"
                class="form-control"
              />
            </td>
          </tr>
        </table></div
    ></template>
  </Body>
</template>
<style></style>
