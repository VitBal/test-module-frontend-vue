<template>
  <router-view v-if="userStore.isLoaded"/>
</template>

<script setup>
import {onMounted, watch} from "vue";
import {useAppStore} from "@/stores/app.js";
import {useUserStore} from "@/stores/user.js";

const appStore = useAppStore();
const userStore = useUserStore()

watch(() => appStore.accessDenied, (state) => {
  if (state) {
    alert('Доступ запрещен!')
  }
})

watch(() => appStore.versionMismatch, (state) => {
  if (state) {
    alert('Версия приложения не совпадает')
  }
})

onMounted(() => {
  document.addEventListener('show-notify', ({detail}) => {
    console.log(detail);
  });
});
</script>
