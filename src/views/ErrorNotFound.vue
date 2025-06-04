<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-10 bg-linear-to-t from-gray-400 to-white"
  >
    <span class="text-[11rem] font-bold">ЧØЧ</span>

    <span class="text-[3rem]">Страница не найдена</span>

    <button
        type="button"
        class="uppercase border-black border-1 rounded-lg py-1 px-2 font-bold hover:bg-gray-400"
        @click="router.push('/')">
      На главную
    </button>
  </div>
</template>
<script setup lang="ts">
import router from "@/router/index.js";
</script>