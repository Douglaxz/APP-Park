import { addDoc, collection, doc, getDoc, getDocs, updateDoc, } from "firebase/firestore";
import { db } from "../../../firebase.config";

export async function list() {
  const querySnapshot = await getDocs(collection(db, "brand"));
  const localItems = [];
  querySnapshot.forEach((doc) => {
    localItems.push({ ...doc.data(), id: doc.id });
  });
  return localItems;
}

export async function detail(brandId) {
  const docSnapshot = await getDoc(doc(db, "brand", brandId));
  return { ...docSnapshot.data(), id: docSnapshot.id };
}

export async function create(payload) {
  const docRef = await addDoc(collection(db, "brand"), payload);
  return docRef;
}
  
  export async function update(id,payload) {
    const docRef = await updateDoc(doc(db, "brand",id), payload);
    return docRef;
  }

