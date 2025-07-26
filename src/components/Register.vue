<template>
  <!-- Register Modal -->
  <transition name="modal">
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content register-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-logo">
            <img src="../assets/logo.png" alt="Thuê Trọ Logo" class="login-logo" width="50px"/>
          </div>
          <h2>Tạo tài khoản</h2>
          <p class="welcome-text">Tham gia cộng đồng thuê trọ</p>
          <button @click="closeModal" class="modal-close">×</button>
        </div>

        <form @submit.prevent="register" class="register-form">
          <div class="form-row">
            <input
              class="form-input"
              placeholder="Họ tên"
              v-model="form.name"
              type="text"
              required
            />
            <input
              class="form-input"
              placeholder="Email"
              v-model="form.email"
              type="email"
              required
            />
          </div>
          <div class="form-row">
            <input
              class="form-input"
              placeholder="Số điện thoại"
              v-model="form.phone"
              type="tel"
              required
            />
            <input
              class="form-input"
              placeholder="Mật khẩu"
              v-model="form.password"
              type="password"
              required
            />
          </div>
          <input
            class="form-input"
            placeholder="Xác nhận mật khẩu"
            v-model="form.confirmPassword"
            type="password"
            required
          />
          <label class="terms-agreement">
            <input type="checkbox" v-model="agreeTerms" required>
            <span class="checkmark"></span>
            <span>Đồng ý điều khoản</span>
          </label>
          <button type="submit" class="btn btn-primary w-full">
            Tạo tài khoản
          </button>
        </form>

        <div class="modal-footer">
          <p>Đã có tài khoản? 
            <button @click="switchToLogin" class="link-btn">Đăng nhập</button>
          </p>
        </div>

        <div v-if="success" class="alert alert-success">
          Tài khoản đã được tạo thành công!
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'switchToLogin'])

/** Form data đăng ký */
const form = ref({ 
  name: '', 
  email: '', 
  phone: '', 
  password: '', 
  confirmPassword: '' 
})
const success = ref(false)
const agreeTerms = ref(false)

/** Đóng modal và reset form */
const closeModal = () => {
  emit('close')
  success.value = false
  form.value = { name: '', email: '', phone: '', password: '', confirmPassword: '' }
}

/** Chuyển sang form đăng nhập */
const switchToLogin = () => {
  emit('switchToLogin')
}

/** Xử lý đăng ký */
const register = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }

  success.value = true
  setTimeout(() => {
    closeModal()
  }, 1500)
}


</script>

<style src="@/assets/css/Register.css"></style>
