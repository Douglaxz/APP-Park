import { reactive } from "vue";
import { signIn, signUp } from "./api";

export const store = reactive({
  user: {},
  async signIn(email, password) {
    return await signIn(email, password);
  },
  signUp: signUp,
});
