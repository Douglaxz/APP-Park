<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Alert from "../../../components/alert.vue";
import Body from "../../../components/body.vue";

const route = useRoute();
const { content } = useStore();
const desc = ref(content.price.selectedPrice?.descPrice);
const valor = ref(content.price.selectedPrice?.valPrice);
const status = ref(content.price.selectedPrice?.statusPrice);
const minuteFinalPrice = ref(content.price.selectedPrice?.minuteFinalPrice);
const minuteStartPrice = ref(content.price.selectedPrice?.minuteStartPrice);

const id = route.params.id;

async function handleUpdatePrice() {
  const res = await content.price.updatePrice(id, {
    descPrice: desc.value,
    statusPrice: status.value,
    valPrice: valor.value,
    minuteFinalPrice: minuteFinalPrice.value,
    minuteStartPrice: minuteStartPrice.value,
  });
  if (!res) {
    const myModalAlternative = new bootstrap.Modal("#exampleModal");
    myModalAlternative.show();
  }
}

onMounted(() => {
  if (content.price.selectedPrice?.id) return;
  content.price.getPrice(route.params.id);
});
</script>

<template>
  <Alert msg="Item da tabela de preços atuaizado com sucesso"></Alert>
  <Body title="Editar lista de preços">
    <template v-slot:buttons>
      <button class="btn btn-dark" @click="handleUpdatePrice">
        <i class="bi bi-check-circle"></i> Salvar
      </button>
      <RouterLink :to="`/price/${route.params.id}`">
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
              <input type="text" v-model="desc" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>Valor: R$</td>
            <td><input type="text" v-model="valor" class="form-control" /></td>
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
        </table>
      </div>
    </template>
  </Body>
</template>
