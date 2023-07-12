import { reactive } from "vue";
import { create, list, detail, update } from "../api";

export const carMarksStore = reactive({
  items: [],
  selectedcarMark: {},
  async getCarMarks() {
    const res = await list();
    this.items = res;
  },
  async getCarMark(id) {
    const res = await detail(id);
    this.selectedCarMarks = res;
  },
  async addCarMark(payload) {
    const res = await create(payload);
    this.items.push(res);
    return res;
  },
  async updateMark(id, payload) {
    console.log("entrou aqui");
    const res = await update(id, payload);
    this.items = res;
  },
});
