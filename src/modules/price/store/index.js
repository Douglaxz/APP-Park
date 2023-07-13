import { reactive } from "vue";
import { create, list, detail, update } from "../api";

export const priceStore = reactive({
  items: [],
  selectedModel: {},
  async getPrices() {
    const res = await list();
    this.items = res;
  },
  async getPrice(id) {
    const res = await detail(id);
    this.selectedPrice = res;
  },
  async addPrice(payload) {
    const res = await create(payload);
    this.items.push(res);
    return res;
  },
  async updatePrice(id, payload) {
    const res = await update(id, payload);
    this.items = res;
  },
});
