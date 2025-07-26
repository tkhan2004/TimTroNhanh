<template>
  <nav class="navbar">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <img src="@/assets/images/logo.png" alt="Logo" />
        Tìm Trọ Nhanh
      </router-link>
      
      <div class="navbar-menu">
        <router-link :to="{ name: 'Home' }" class="nav-link">Trang chủ</router-link>
        <router-link :to="{ name: 'RoomList' }" class="nav-link">Tìm phòng</router-link>
        <router-link :to="{ name: 'Post' }" class="nav-link">Đăng tin</router-link>
        <router-link :to="{ name: 'Login' }" class="nav-link">Đăng nhập</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Navbar logic
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
}
</style>