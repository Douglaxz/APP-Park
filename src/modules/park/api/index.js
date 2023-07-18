import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

export async function list(query) {
  const querySnapshot = await getDocs(query);
  let localItems = [];

  querySnapshot.forEach(async (doc) => {
    localItems.push({ ...doc.data(), id: doc.id });
  });

  return localItems;
}

export async function detailWithMark(parkId) {
  const docSnapshot = await getDoc(doc(db, "parkingStay", parkId));
  const modelId = docSnapshot.data().idModel;
  const modelSnapshot = await getDoc(doc(db, "model", modelId));
  const markId = modelSnapshot.data().idMark;
  const markSnapshot = await getDoc(doc(db, "brand", markId));

  return {
    ...docSnapshot.data(),
    id: docSnapshot.id,
    model: modelSnapshot.data().descModel,
    mark: markSnapshot.data().descBrand,
    idMark: markId,
  };
}

export async function detail(modelId) {
  const docSnapshot = await getDoc(doc(db, "parkingStay", modelId));
  return { ...docSnapshot.data(), id: docSnapshot.id };
}

export async function create(payload) {
  const docRef = await addDoc(collection(db, "parkingStay"), payload);
  return docRef;
}

export async function update(id, payload) {
  const docRef = await updateDoc(doc(db, "parkingStay", id), payload);
  return docRef;
}

export async function getMarkName(markId) {
  const docSnapshot = await getDoc(doc(db, "brand", markId));
  return { id: docSnapshot.id, ...docSnapshot.data() };
}

export async function getModelName(modelId) {
  const docSnapshot = await getDoc(doc(db, "model", modelId));
  return { id: docSnapshot.id, ...docSnapshot.data() };
}
