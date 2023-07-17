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

export async function detailWithMark(modelId) {
  const docSnapshot = await getDoc(doc(db, "model", modelId));
  const markId = docSnapshot.data().idMark;
  const markSnapshot = await getDoc(doc(db, "brand", markId));

  return {
    ...docSnapshot.data(),
    id: docSnapshot.id,
    brand: markSnapshot.data().descBrand,
  };
}

export async function detail(modelId) {
  const docSnapshot = await getDoc(doc(db, "model", modelId));
  return { ...docSnapshot.data(), id: docSnapshot.id };
}

export async function create(payload) {
  const docRef = await addDoc(collection(db, "model"), payload);
  return docRef;
}

export async function update(id, payload) {
  const docRef = await updateDoc(doc(db, "model", id), payload);
  return docRef;
}

export async function getMarkName(markId) {
  const docSnapshot = await getDoc(doc(db, "brand", markId));
  return { id: docSnapshot.id, ...docSnapshot.data() };
}
