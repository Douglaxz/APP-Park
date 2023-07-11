import { reactive } from "vue";
import { create, list, detail, update } from "../api";

export const priceStore = reactive({
  items: [],
  selectedModel: {},
  async getModels() {
    const res = await list();
    this.items = res;
  },
  async getModel(id) {
    const res = await detail(id);
    this.selectedPrice = res;
  },
  async addModel(payload) {
    const res = await create(payload);
    this.items.push(res);
    return res;
  },
  async updateModel(id, payload) {
    const res = await update(id, payload);
    this.items = res;
  },
});
