<template>
  <!-- Login Modal -->
  <transition name="modal">
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content login-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-logo">
            <img src="../assets/logo.png" alt="Thuê Trọ Logo" class="login-logo" width="50px"/>
          </div>
          <h2>Chào mừng trở lại!</h2>
          <p class="welcome-text">Đăng nhập để tiếp tục tìm kiếm phòng trọ lý tưởng</p>
          <button @click="closeModal" class="modal-close">×</button>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <button @click="loginWithGoogle" class="social-btn" type="button">
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button @click="loginWithFacebook" class="social-btn" type="button">
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        <!-- Divider -->
        <div class="divider">
          <span>hoặc</span>
        </div>

        <form @submit.prevent="login" class="login-form">
          <input
            class="form-input"
            placeholder="Email"
            v-model="form.email"
            type="email"
            required
          />
          <input
            class="form-input"
            placeholder="Mật khẩu"
            v-model="form.password"
            type="password"
            required
          />
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span class="checkmark"></span>
              Ghi nhớ
            </label>
            <button type="button" class="forgot-password">Quên mật khẩu?</button>
          </div>
          <button type="submit" class="btn btn-primary w-full login-btn" :disabled="isLoggingIn">
            <span v-if="!isLoggingIn">Đăng nhập</span>
            <span v-else>Đang đăng nhập...</span>
          </button>
        </form>

        <div class="modal-footer">
          <p>Chưa có tài khoản? 
            <button @click="switchToRegister" class="link-btn">Đăng ký</button>
          </p>
        </div>

        <!-- Alerts -->
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">Đăng nhập thành công!</div>

        <!-- Demo Accounts -->
        <div class="demo-accounts">
          <details>
            <summary>Demo</summary>
            <div class="demo-list">
              <div>👤 khach@gmail.com / 123456</div>
              <div>🏠 chutro@gmail.com / 123456</div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'switchToRegister'])

const authStore = useAuthStore()

/** Form data đăng nhập */
const form = ref({ email: '', password: '' })
const success = ref(false)
const error = ref('')
const rememberMe = ref(false)
const isLoggingIn = ref(false)

/** Đóng modal và reset form */
const closeModal = () => {
  emit('close')
  success.value = false
  error.value = ''
  form.value = { email: '', password: '' }
}

/** Chuyển sang form đăng ký */
const switchToRegister = () => {
  emit('switchToRegister')
}

/** Xử lý đăng nhập */
const login = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  isLoggingIn.value = true
  error.value = ''

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    success.value = true
    setTimeout(() => {
      closeModal()
      
      // Redirect dựa theo role
      if (result.user.role === 'landlord') {
        // Chủ trọ -> Dashboard
        window.location.href = '/dashboard'
      }
      // Khách thuê không redirect, ở lại trang hiện tại
    }, 1500)
  } else {
    error.value = result.error
  }
  
  isLoggingIn.value = false
}

/** Đăng nhập với Google */
const loginWithGoogle = () => {
  console.log('Login with Google')
  // TODO: Implement Google login
}

/** Đăng nhập với Facebook */
const loginWithFacebook = () => {
  console.log('Login with Facebook')
  // TODO: Implement Facebook login
}
</script>

<style src="@/assets/css/Login.css"></style>
