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
        <router-link to="/post" class="navbar-link">Đăng tin</router-link>
        <router-link to="/about" class="navbar-link">Về chúng tôi</router-link>
      </div>
      <div class="navbar-actions desktop-only">
        <button class="btn btn-outline-primary navbar-btn">
          <svg viewBox="0 0 24 24" class="btn-icon">
            <path d="M12 4.5v15m7.5-7.5h-15"></path>
          </svg>
          Quảng cáo Trọ
        </button>
        <div class="navbar-auth">
          <router-link to="/login" class="btn btn-primary navbar-btn">
            Đăng nhập
          </router-link>
          <router-link to="/register" class="btn btn-secondary navbar-btn">
            Đăng ký
          </router-link>
        </div>
      </div>
    </div>
    <!-- Mobile menu overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="navbar-mobile-menu">
        <div class="navbar-mobile-content">
          <router-link to="/" class="navbar-link" @click="closeMenu">Trang chủ</router-link>
          <router-link to="/rooms" class="navbar-link" @click="closeMenu">Tìm phòng</router-link>
          <router-link to="/post" class="navbar-link" @click="closeMenu">Đăng tin</router-link>
          <router-link to="/about" class="navbar-link" @click="closeMenu">Về chúng tôi</router-link>
          <button class="btn btn-outline-primary navbar-btn" @click="closeMenu">
            <svg viewBox="0 0 24 24" class="btn-icon">
              <path d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
            Quảng cáo Trọ
          </button>
          <div class="navbar-auth">
            <router-link to="/login" class="btn btn-primary navbar-btn" @click="closeMenu">
              Đăng nhập
            </router-link>
            <router-link to="/register" class="btn btn-secondary navbar-btn" @click="closeMenu">
              Đăng ký
            </router-link>
          </div>
        </div>
        <div class="navbar-overlay" @click="closeMenu"></div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }
</script>

<style scoped>
.site-navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.navbar-logo img {
  width: 150px;
  height: 70px;
  margin-right: 10px;
}

.navbar-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 120;
}

.navbar-hamburger span {
  display: block;
  width: 26px;
  height: 3px;
  margin: 4px 0;
  background: #007bff;
  border-radius: 2px;
  transition: all 0.3s;
}

.navbar-hamburger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar-hamburger span.open:nth-child(2) {
  opacity: 0;
}
.navbar-hamburger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.navbar-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-link:hover {
  color: #007bff;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.navbar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background-color: #e9ecef;
}

.btn-outline-primary {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}

.navbar-auth {
  display: flex;
  gap: 10px;
}

.desktop-only {
  display: flex;
}

/* Responsive styles */
@media (max-width: 992px) {
  .navbar-hamburger {
    display: flex;
  }
  .desktop-only {
    display: none !important;
  }
  .navbar-mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .navbar-mobile-content {
    background: #fff;
    width: 100vw;
    padding: 32px 0 24px 0;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    z-index: 210;
    animation: fadeInMenu 0.2s;
  }
  .navbar-link, .navbar-btn {
    width: 90vw;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  .navbar-auth {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
  }
  .navbar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.25);
    z-index: 205;
  }
}

@media (max-width: 576px) {
  .navbar-logo img {
    width: 110px;
    height: 50px;
  }
}

@keyframes fadeInMenu {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>