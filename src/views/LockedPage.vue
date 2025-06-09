<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center gap">
    <p class="text-[3rem] font-semibold">{{ message }}</p>
    <p class="font-semibold">Обратитесь к администратору</p>

    <div class="pt-5">
      <button type="submit" @click="router.push({name: 'home'})" :class="btnStyle">На главную</button>
    </div>
    <div class="pt-5">
      <button type="submit" @click="appStore.reload()" :class="btnStyle">Обновить</button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {useAppStore} from "@/stores/app.js";
import {computed} from "vue";

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();

const message = computed(() => {
  if(!userStore.moduleAccess) {
    return 'Доступ запрещен'
  }
  else if (appStore.maintenanceMode) {
    return 'Приложение на обслуживании'
  }
  else {
    return 'Как вы тут оказались?'
  }
})

const btnStyle =
    "uppercase border-black border-1 rounded-lg py-1 px-2 font-bold hover:bg-gray-400 min-w-[10rem]";
</script>
