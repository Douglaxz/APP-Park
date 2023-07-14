<template>
  <div class="about">
    <RouterLink to="/price">Preços</RouterLink>
    <RouterLink to="/model">Modelos</RouterLink>
    <RouterLink to="/park">Estadia (Estacionamento)</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
