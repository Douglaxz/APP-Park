<script setup>

import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { routes as authRoutes } from "@/modules/auth/router";
import MainLayout from "./layout/MainLayout.vue";
import { ref, watch } from "vue";

const route = useRoute();

const isAuthRoute = ref(false);
watch(route, (newRoute) => {
  isAuthRoute.value = Boolean(
    authRoutes.find((authRoute) => {
      return newRoute.path == authRoute.path;
    })
  );
});
console.log(authRoutes, route);
</script>

<template>
  <RouterView v-if="isAuthRoute" />
  <MainLayout v-else>
    <nav
      class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/Dashboard"
          ><i class="bi bi-p-circle"></i> Estacionamento</a
        >
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/Dashboard"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/Price"
                >Lista de Preços</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Marcas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/model"
                >Modelos</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/park"
                >Estadia</a
              >
            </li>
          </ul>
          <form class="d-flex" role="search">
            <button class="btn btn-dark" type="submit">
              <i class="bi bi-box-arrow-left"></i> Sair
            </button>
          </form>
        </div>
      </div>
    </nav>
    <RouterView />
    <footer class="bg-dark text-center text-white">
      <!-- Grid container -->
      <div class="container p-4 pb-0">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Facebook -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #3b5998"
            href="#!"
            role="button"
            ><i class="bi bi-facebook"></i
          ></a>

          <!-- Twitter -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #55acee"
            href="#!"
            role="button"
            ><i class="bi bi-twitter"></i
          ></a>

          <!-- Google -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #dd4b39"
            href="#!"
            role="button"
            ><i class="bi bi-google"></i
          ></a>

          <!-- Instagram -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #ac2bac"
            href="#!"
            role="button"
            ><i class="bi bi-instagram"></i
          ></a>

          <!-- Linkedin -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #0082ca"
            href="#!"
            role="button"
            ><i class="bi bi-linkedin"></i
          ></a>
          <!-- Github -->
          <a
            class="btn text-white btn-floating m-1"
            style="background-color: #333333"
            href="#!"
            role="button"
            ><i class="bi bi-github"></i
          ></a>
        </section>
        <!-- Section: Social media -->
      </div>
      <!-- Grid container -->

      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2023 Copyright
      </div>
      <!-- Copyright -->
    </footer>
  </MainLayout>
</template>

<style scoped></style>
