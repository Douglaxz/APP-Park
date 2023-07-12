<script setup>
import { useStore } from "@/composables/useStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { content } = useStore();

onMounted(() => {
  //chama action
  content.mark.getCarMark(route.params.id);
});
</script>

<template>
  <h1>Visualizar</h1>
  <router-link :to="`/CarMarks/${route.params.id}/edit`"> Editar </router-link>
  <router-link :to="`/CarMarks/`"> Voltar </router-link>
  <hr />
  <table>
    <tr>
      <td>Marca</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.mark.selectedCarMarks?.descMark"
        />
      </td>
    </tr>
    <tr>
      <td>Status</td>
      <td>
        <input
          type="text"
          readonly
          :value="content.mark.selectedCarMarks?.statusMark"
        />
      </td>
    </tr>
  </table>
</template>

<!-- <script setup>
import { useStore } from "@/composables/useStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { content } = useStore();

onMounted(() => {
  //chama action
  content.car-marks.getItem(route.params.id);
});
</script>

<template>
  <h1>
    {{ content.car-marks.selectedItem.title }}
  </h1>
  <h3>
    {{ content.car-marks.selectedItem.listId }}
  </h3>

  <router-link :to="`/items/${route.params.id}/edit`"> Editar </router-link>

  {{ content.car-marks.items }}
</template> -->
