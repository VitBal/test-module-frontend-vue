<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-10 bg-linear-to-t from-gray-300 to-white">
    <div
        class="h-full w-full flex flex-col justify-center items-center gap-10"
        style="background:url('public/404.gif') no-repeat bottom right;"
    >
      <span class="text-[11rem] font-extrabold">ЧØЧ</span>

      <span class="text-[3rem] font-semibold">Страница не найдена</span>

      <button
          type="button"
          class="uppercase border-black border-1 rounded-lg py-1 px-2 hover:bg-gray-400"
          @click="router.push('/')">
        На главную
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router/index.js";
</script>