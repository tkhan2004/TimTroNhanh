<template>
  <nav class="site-navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">
          <img src="../assets/logo.png" alt="Thuê Trọ Logo" />
        </router-link>
      </div>

      <!-- Hamburger button for mobile -->
      <button class="navbar-hamburger" @click="toggleMenu" aria-label="Mở menu">
        <span :class="{'open': menuOpen}"></span>
        <span :class="{'open': menuOpen}"></span>
        <span :class="{'open': menuOpen}"></span>
      </button>

      <!-- Desktop menu -->
      <div class="navbar-menu desktop-only">
        <router-link to="/" class="navbar-link">Trang chủ</router-link>
        <router-link to="/rooms" class="navbar-link">Tìm phòng</router-link>
        <router-link to="/about" class="navbar-link">Về chúng tôi</router-link>
        <router-link to="/review" class="navbar-link">Review</router-link>
        <router-link to="/pr" class="navbar-link">Quảng cáo</router-link>

      </div>
      <div class="navbar-actions desktop-only">
        <!-- Hiển thị khi chưa đăng nhập -->
        <div v-if="!isLoggedIn" class="navbar-auth">
          <!-- Nút đăng tin - yêu cầu đăng nhập -->
          <button @click="openLoginModal" class="btn btn-warning navbar-btn post-btn">
            <svg viewBox="0 0 24 24" class="btn-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Đăng tin
          </button>
          
          <button @click="openLoginModal" class="btn btn-primary navbar-btn">
            Đăng nhập
          </button>
          <button @click="openRegisterModal" class="btn btn-secondary navbar-btn">
            Đăng ký
          </button>
        </div>

        <!-- Hiển thị khi đã đăng nhập -->
        <div v-else class="navbar-user">
          <!-- Nút đăng tin - chỉ OWNER mới thấy -->
          <router-link 
            v-if="isLandlord" 
            to="/post" 
            class="btn btn-warning navbar-btn post-btn"
          >
            <svg viewBox="0 0 24 24" class="btn-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Đăng tin
          </router-link>

          <!-- Actions cho RENTER - chỉ khách thuê mới thấy -->
          <div v-if="!isLandlord" class="user-actions">
            <button class="action-btn favorites-btn" title="Danh sách yêu thích">
              <svg viewBox="0 0 24 24" class="action-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
              </svg>
              <span class="favorites-count">3</span>
            </button>
            <button class="action-btn notification-btn" title="Thông báo">
              <svg viewBox="0 0 24 24" class="action-icon">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="notification-count">2</span>
            </button>
          </div>

          <div class="user-greeting">
            <span class="greeting-text">Chào, </span>
            <span class="user-name">{{ currentUser?.fullName }}</span>
            <span class="user-role">({{ isLandlord ? 'Chủ trọ' : 'Khách thuê' }})</span>
          </div>
          
          <div class="user-dropdown">
            <!-- Menu cho OWNER -->
            <button v-if="isLandlord" @click="goToDashboard" class="dropdown-item">
              <svg viewBox="0 0 24 24" class="dropdown-icon">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Quản lý phòng
            </button>
            
            <!-- Menu cho RENTER -->
            <button v-if="!isLandlord" class="dropdown-item">
              <svg viewBox="0 0 24 24" class="dropdown-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Phòng yêu thích
            </button>
            
            <!-- Menu chung -->
            <button class="dropdown-item">
              <svg viewBox="0 0 24 24" class="dropdown-icon">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Hồ sơ cá nhân
            </button>
            
            <button @click="handleLogout" class="dropdown-item logout">
              <svg viewBox="0 0 24 24" class="dropdown-icon">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3v1"/>
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="navbar-mobile-menu">
        <div class="navbar-mobile-content">
          <router-link to="/" class="navbar-link" @click="closeMenu">Trang chủ</router-link>
          <router-link to="/rooms" class="navbar-link" @click="closeMenu">Tìm phòng</router-link>
          <router-link to="/about" class="navbar-link" @click="closeMenu">Về chúng tôi</router-link>
          
          <!-- Mobile auth buttons -->
          <div v-if="!isLoggedIn" class="navbar-auth">
            <!-- Nút đăng tin mobile - yêu cầu đăng nhập -->
            <button @click="openLoginModal" class="btn btn-warning navbar-btn post-btn mobile-post-btn">
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Đăng tin
            </button>
            
            <button @click="openLoginModal" class="btn btn-primary navbar-btn">
              Đăng nhập
            </button>
            <button @click="openRegisterModal" class="btn btn-secondary navbar-btn">
              Đăng ký
            </button>
          </div>

          <!-- Mobile user menu -->
          <div v-else class="mobile-user-menu">
            <!-- Nút đăng tin cho landlord -->
            <router-link
              v-if="isLandlord"
              to="/post"
              class="btn btn-warning navbar-btn post-btn mobile-post-btn"
              @click="closeMenu"
            >
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Đăng tin
            </router-link>
            <div class="user-greeting-mobile">
              <span class="greeting-text">Chào, {{ currentUser?.fullName }}</span>
            </div>
            
            <!-- Mobile actions for tenant -->
            <div v-if="!isLandlord" class="mobile-user-actions">
              <button class="action-btn favorites-btn" title="Danh sách yêu thích">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
                </svg>
                <span class="favorites-count">3</span>
              </button>
              <button class="action-btn notification-btn" title="Thông báo">
                <svg viewBox="0 0 24 24" class="action-icon">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span class="notification-count">2</span>
              </button>
            </div>

            <button v-if="isLandlord" @click="goToDashboard" class="mobile-menu-item">
              Dashboard
            </button>
            <button v-if="!isLandlord" class="mobile-menu-item">
              Danh sách yêu thích
            </button>
            <button class="mobile-menu-item">Hồ sơ</button>
            <button @click="handleLogout" class="mobile-menu-item logout">Đăng xuất</button>
          </div>
        </div>
        <div class="navbar-overlay" @click="closeMenu"></div>
      </div>
    </transition>

    <!-- Login Modal Component -->
    <Login
      :showModal="showLoginModal"
      @close="closeLoginModal"
      @switchToRegister="switchToRegister"
    />

    <!-- Register Modal Component -->
    <Register
      :showModal="showRegisterModal"
      @close="closeRegisterModal"
      @switchToLogin="switchToLogin"
    />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from './Login.vue'
import Register from './Register.vue'

const router = useRouter()
const authStore = useAuthStore()

const menuOpen = ref(false)
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

/** Computed properties từ store */
const isLoggedIn = computed(() => authStore.isLoggedIn)
const currentUser = computed(() => authStore.user)
const isLandlord = computed(() => authStore.user?.role === 'landlord')

/** Khôi phục session khi component mount */
onMounted(() => {
  authStore.restoreSession()
})

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const openLoginModal = () => {
  showLoginModal.value = true
  showRegisterModal.value = false
  closeMenu()
}

const openRegisterModal = () => {
  showRegisterModal.value = true
  showLoginModal.value = false
  closeMenu()
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

const closeRegisterModal = () => {
  showRegisterModal.value = false
}

const switchToRegister = () => {
  closeLoginModal()
  openRegisterModal()
}

const switchToLogin = () => {
  closeRegisterModal()
  openLoginModal()
}

/** Logout */
const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Home' })
  closeMenu()
}

/** Go to dashboard */
const goToDashboard = () => {
  router.push({ name: 'DashboardOverview' })
  closeMenu()
}

</script>





<style scoped src="@/assets/css/Navbar.css"></style>
