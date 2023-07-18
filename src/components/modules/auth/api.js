import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
export const signUp = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const signIn = (email, senha) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const signOut = async () => {
  console.log("função logout");
  try {
    await auth.signOut();
    console.log("Logout realizado com sucesso!");
    window.location.href = "/";
  } catch (err) {
    console.error("Erro ao fazer logout:", err);
  }
};
