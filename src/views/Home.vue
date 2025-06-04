<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Home
      </h2>
    </div>

    <div>
      <p>authStore: {{ authStore }}</p>
      <p>userStore: {{ userStore }}</p>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <button
        type="submit"
        @click="handleLogout"
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout(true);
  router.push("/login");
};
</script>

<style scoped></style>
