<template>
  <div
      class="h-screen w-screen min-w-[600px] flex flex-col justify-center text-center items-center gap-5 bg-linear-to-t from-gray-300 to-white">
    <div class="h-[10rem] w-[10rem]">
      <img v-if="!userStore.moduleAccess" src="/public/no-access.svg" alt="deny">
      <img v-if="appStore.maintenanceMode" class="gear" src="/public/gear.svg" alt="gear">
    </div>
    <div class="text-[3rem] font-extrabold px-2">
      {{ message.title }}
    </div>
    <div class="text-[1rem] font-semibold">
      {{ message.hint }}
    </div>

    <div class="flex gap-5">
      <button type="submit" @click="appStore.reload()" :class="btnStyle">Обновить</button>

      <button type="submit" @click="appStore.redirectToMainPage()" :class="btnStyle">На главную</button>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user.js";
import {useAppStore} from "@/stores/app.js";
import {computed} from "vue";

const userStore = useUserStore();
const appStore = useAppStore();

const message = computed(() => {
  if (!userStore.moduleAccess) {
    return {title: 'Доступ запрещен', hint: 'Обратитесь к администратору'}
  } else if (appStore.maintenanceMode) {
    return {title: 'Приложение в режиме обслуживания', hint: 'Попробуйте зайти позже'}
  } else {
    return {title: 'Ошибка', hint: ''}
  }
})

const btnStyle =
    "uppercase border-black border-1 rounded-lg py-1 px-2 hover:bg-gray-400";
</script>


<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}

.gear {
  animation: rotate 5s linear infinite;
}
</style>
