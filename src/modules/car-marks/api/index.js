import { addDoc, collection, doc, getDoc, getDocs, updateDoc, } from "firebase/firestore";
import { db } from "../../../firebase.config.js";

export async function list() {
  const querySnapshot = await getDocs(collection(db, "mark"));
  const localItems = [];
  querySnapshot.forEach((doc) => {
    localItems.push({ ...doc.data(), id: doc.id });
  });
  return localItems;
}

export async function detail(markId) {
  const docSnapshot = await getDoc(doc(db, "mark", markId));
  return { ...docSnapshot.data(), id: docSnapshot.id };
}

export async function create(payload) {
  const docRef = await addDoc(collection(db, "mark"), payload);
  return docRef;
}
  
  export async function update(id,payload) {
    const docRef = await updateDoc(doc(db, "mark",id), payload);
    return docRef;
  }

