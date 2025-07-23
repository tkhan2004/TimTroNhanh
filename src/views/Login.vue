<template>
  <div class="container py-6 max-w-md">
    <h2 class="text-xl font-bold mb-4">Đăng nhập</h2>
    <form @submit.prevent="login" class="space-y-3">
      <input class="form-control" placeholder="Email" v-model="form.email" type="email" required />
      <input class="form-control" placeholder="Mật khẩu" v-model="form.password" type="password" required />
      <button class="btn btn-primary w-full">Đăng nhập</button>
    </form>
    <div v-if="success" class="alert alert-success mt-4">Đăng nhập thành công (mock)!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({ email: '', password: '' })
const success = ref(false)
function login() {
  success.value = true
  setTimeout(() => success.value = false, 2000)
}
</script> 