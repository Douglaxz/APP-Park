import { reactive } from "vue";
import {
  create,
  list,
  detail,
  update,
  detailWithMark,
  getMarkName,
} from "../api";
import { db } from "../../../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onMounted, ref, useModel } from "vue";

const marks = ref([]);

export const modelStore = reactive({
  items: [],
  selectedModels: {},
  async getModels() {
    let models = await list(collection(db, "model"));

    models = await Promise.all(
      models.map(async (item) => {
        const { descBrand } = await getMarkName(item.idMark);
        return { ...item, marca: descBrand };
      })
    );

    this.items = models;
  },
  async getModelsWithStatusTrue() {
    const q = query(collection(db, "brand"), where("statusBrand", "==", true));

    const res = await list(q);
    this.items = res;
  },
  async getModel(id) {
    const res = await detailWithMark(id);
    this.selectedModel = res;
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
