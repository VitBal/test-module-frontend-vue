<template>
  <div
    class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 gap-3"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Home
      </h2>
    </div>

    <div>
      <p><b> userStore: </b> {{ userStore.user }}</p>
    </div>

    <div class="sm:mx-auto w-[60%] flex flex-wrap gap-1 pt-10">
      <button type="submit" @click="handleAbout" :class="btnStyle">
        AboutPage
      </button>
      <button type="submit" @click="handleLocked" :class="btnStyle">Locked</button>
      <button type="submit" @click="handleLogin" :class="btnStyle">
        Login
      </button>
      <button type="submit" @click="handleLogout" :class="btnStyle">
        Logout
      </button>
      <button type="submit" @click="handle301" :class="btnStyle">301</button>
      <button type="submit" @click="handle403" :class="btnStyle">403</button>
      <button type="submit" @click="handle404client" :class="btnStyle">
        404
      </button>
      <button type="submit" @click="handle404back" :class="btnStyle">
        404 back
      </button>
      <button type="submit" @click="handle409" :class="btnStyle">409</button>
      <button type="submit" @click="handle419" :class="btnStyle">419</button>
      <button type="submit" @click="handle422" :class="btnStyle">422</button>
      <button type="submit" @click="handle423" :class="btnStyle">423</button>
      <button type="submit" @click="handle500" :class="btnStyle">500</button>
      <button type="submit" @click="handle503" :class="btnStyle">503</button>
    </div>
  </div>
</template>

<script setup>
import {useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { api } from "@/api/index.js";

const userStore = useUserStore();
const router = useRouter();

const btnStyle =
  "uppercase border-black border-1 rounded-lg py-1 px-2 font-bold hover:bg-gray-400 min-w-[10rem]";

const handleAbout = () => {
  router.push("/about");
};

const handleLocked = () => {
  router.push("/locked");
};

const handleLogout = async () => {
  await userStore.logout().then(() => {
    router.push("/login");
  });
};

const handleLogin = () => {
  router.push("/login");
};

const handle301 = () => {
  api.get("/api/test-301");
};

const handle403 = () => {
  api.get("/api/test-403");
};

const handle404client = () => {
  router.push("/fake");
};

const handle404back = () => {
  api.get("/api/test-404");
};

const handle409 = () => {
  api.get("/api/test-409");
};

const handle419 = () => {
  api.get("/api/test-419");
};

const handle422 = () => {
  api.get("/api/test-422");
};

const handle423 = () => {
  api.get("/api/test-423");
};

const handle500 = () => {
  api.get("/api/test-500");
};

const handle503 = () => {
  api.get("/api/test-503");
};
</script>

<style scoped></style>
