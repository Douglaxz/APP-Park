import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

export async function list() {
  const querySnapshot = await getDocs(collection(db, "price"));
  const localItems = [];
  querySnapshot.forEach((doc) => {
    localItems.push({ ...doc.data(), id: doc.id });
  });
  return localItems;
}

export async function detail(priceId) {
  const docSnapshot = await getDoc(doc(db, "price", priceId));
  return { ...docSnapshot.data(), id: docSnapshot.id };
}

export async function create(payload) {
  const docRef = await addDoc(collection(db, "price"), payload);
  return docRef;
}

export async function update(id,payload) {
  const docRef = await updateDoc(doc(db, "price",id), payload);
  return docRef;
}
