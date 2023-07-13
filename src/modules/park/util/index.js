import { computed } from 'vue';

export function formatTimestamp(timestamp) {
  if (!timestamp) return "";

  const data_hora = new Date(timestamp.seconds * 1000);
  const dia = data_hora.getDate().toString().padStart(2, "0");
  const mes = (data_hora.getMonth() + 1).toString().padStart(2, "0");
  const ano = data_hora.getFullYear();
  const hora = data_hora.getHours().toString().padStart(2, "0");
  const minutos = data_hora.getMinutes().toString().padStart(2, "0");

  return dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos;
}

export const timestamp1 = computed(() => {
  const timestamp = content.park.selectedPark?.checkIn;
  return formatTimestamp(timestamp);
});