import { reactive } from "vue";
import {
  create,
  list,
  detail,
  update,
  detailWithMark,
  getMarkName,
  getModelName,
} from "../api";
import { db } from "../../../firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onMounted, ref, useModel } from "vue";

const marks = ref([]);

export const parkStore = reactive({
  items: [],
  selectedParks: {},
  async getParks() {
    let parks = await list(collection(db, "parkingStay"));

    parks = await Promise.all(
      parks.map(async (item) => {
        const { descModel, idMark } = await getModelName(item.idModel);
        return { ...item, descModel, idMark };
      })
    );

    parks = await Promise.all(
      parks.map(async (item) => {
        const { descBrand } = await getMarkName(item.idMark);
        return { ...item, marca: descBrand };
      })
    );

    this.items = parks;
  },
  async getModelsWithStatusTrue() {
    const q = query(
      collection(db, "model"),
      where("statusModel", "==", true),
      orderBy("descModel")
    );
    const res = await list(q);
    console.log({ res });
    this.model = res;
  },

  async getMarksWithStatusTrue() {
    const q = query(
      collection(db, "brand"),
      where("statusBrand", "==", true),
      orderBy("descBrand")
    );
    const res1 = await list(q);
    this.mark = res1;
  },

  async calculatePricePark(minutes) {
    console.log("entrou");
    const q = query(
      collection(db, "price"),
      where("statusPrice", "==", true),
      orderBy("minuteStartPrice")
    );
    const querySnapshot = await getDocs(q);
    console.log(minutes);

    const docRef = querySnapshot.docs.find((doc) => {
      const data = doc.data();
      const minuteStartPrice = data.minuteStartPrice;
      const minuteFinalPrice = data.minuteFinalPrice;
      return minutes >= minuteStartPrice && minutes <= minuteFinalPrice;
    });

    const { valPrice } = docRef.data();
    return valPrice;
  },

  async getPark(id) {
    const res = await detailWithMark(id);
    this.selectedPark = res;
  },

  async getPark1(id) {
    const res = await detail(id);
    this.selectedPark = res;
  },

  async addPark(payload) {
    const res = await create(payload);
    this.items.push(res);
    return res;
  },
  async updatePark(id, payload) {
    const res = await update(id, payload);
    this.items = res;
  },
});
