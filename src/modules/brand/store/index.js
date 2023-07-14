import { reactive } from "vue";
import { create, list, detail, update } from "../api";

export const brandStore = reactive({
  items: [],
  selectedBrand: {},
  async brands() {
    const res = await list();
    this.items = res;
  },
  async getBrand(id) {
    const res = await detail(id);
    this.selectedBrand = res;
  },
  async addBrands(payload) {
    const res = await create(payload);
    this.items.push(res);
    return res;
  },
  async updateBrand(id, payload) {
    console.log("entrou aqui");
    const res = await update(id, payload);
    this.items = res;
  },
});
