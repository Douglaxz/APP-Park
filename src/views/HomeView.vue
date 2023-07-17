<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../composables/useStore";

const { content } = useStore();
const { auth } = content;

const router = useRouter();

const email = ref("");
const password = ref("");

async function handleSignIn() {
  const result = await auth.signIn(email.value, password.value);
  if (!result) {
    alert("email ou senha incorretos");
    return;
  }
  router.push("/dashboard");
}
</script>

<template>
  <main>
    <div class="mainScreen">
      <div class="loginContainer">
        <div class="formTitulo">
          <p><i class="bi bi-p-circle"></i> Estacionamento</p>
        </div>
        <div class="formInput">
          Bem vindo ao sistema de gerenciamento de estadia de veículos
          <input
            type="email"
            v-model="email"
            placeholder="e-mail"
            class="form-control"
          />
          <input
            type="password"
            v-model="password"
            placeholder="senha"
            class="form-control"
          />
          <button @click="handleSignIn" class="btn btn-dark">Login</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
