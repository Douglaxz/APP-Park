import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const signOut = async () => {
  console.log("função logout");
  try {
    await auth.signOut();
    console.log("Logout realizado com sucesso!");
    this.$router.push("/");
  } catch (err) {
    console.error("Erro ao fazer logout:", err);
  }
};
