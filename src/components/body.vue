<script setup>
defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
  <div class="internBox">
    <div class="titleList">
      <div class="titleListWord">{{ title }}</div>
      <div class="titleListButtuon">
        <slot name="buttons"></slot>
      </div>
    </div>
    <div class="contentList">
      <div class="formIntern">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
