<template>
  <div class="container py-6 max-w-xl">
    <h2 class="text-xl font-bold mb-4">Đăng tin cho thuê</h2>
    <form @submit.prevent="submitPost" class="space-y-3">
      <input class="form-control" placeholder="Tiêu đề" v-model="form.title" required />
      <input class="form-control" placeholder="Giá (VNĐ/tháng)" v-model="form.price" type="number" required />
      <input class="form-control" placeholder="Quận/Huyện" v-model="form.district" required />
      <input class="form-control" placeholder="Link ảnh" v-model="form.img" />
      <textarea class="form-control" placeholder="Mô tả" v-model="form.desc" rows="3"></textarea>
      <button class="btn btn-primary w-full">Đăng tin</button>
    </form>
    <div v-if="success" class="alert alert-success mt-4">Đăng tin thành công (mock)!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({ title: '', price: '', district: '', img: '', desc: '' })
const success = ref(false)
function submitPost() {
  success.value = true
  setTimeout(() => success.value = false, 2000)
}
</script> 