<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center gap">
    <p class="text-[3rem] font-semibold">Доступ запрещен</p>
    <p class="font-semibold">Обратитесь к администратору</p>

    <div class="pt-5">
      <button type="submit" @click="router.push('/home')" :class="btnStyle">На главную</button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const btnStyle =
    "uppercase border-black border-1 rounded-lg py-1 px-2 font-bold hover:bg-gray-400 min-w-[10rem]";
</script>
