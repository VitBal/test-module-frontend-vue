<template>
  <div class="flex min-h-screen flex-col justify-center items-center px-3 bg-linear-to-t from-gray-300 to-white">
    <div class="sm:w-sm max-sm:w-full">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autocomplete="email"
              required
              class="block w-full bg-white rounded-md py-1 px-3 border-1 border-gray-300 focus:border-gray-800"
            />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              autocomplete="current-password"
              required
              class="block w-full bg-white rounded-md py-1 px-3 border-1 border-gray-300 focus:border-gray-800"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-1 px-2 bg-gray-100 uppercase border-black border-1 rounded-lg py-1 px-2 hover:bg-gray-400"
          >
            {{ loading ? "Вход..." : "Вход" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(null);
const loading = ref(false);

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    });

    const redirectPath = route.query.redirect || "/";
    router.push(redirectPath);
  } catch (err) {
    error.value = err.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>
