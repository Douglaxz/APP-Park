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
      <div class="image"><img src="../assets/fundo.jpeg" width="920" /></div>
      <div class="boxContainer">
        <div class="form">
          <div class="formTitulo">
            <i class="bi bi-p-circle"></i> Estacionamento
          </div>
          <div class="formInput">
            Bem vindo ao sistema de gerenciamento de estadia de veículos
            <input type="email" v-model="email" placeholder="e-mail" />
            <input type="password" v-model="password" placeholder="senha" />
            <button @click="handleSignIn" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
