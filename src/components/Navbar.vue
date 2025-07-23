<template>
  <nav class="site-navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">
          <img src="../assets/logo.png" alt="Thuê Trọ Logo" />
        </router-link>
      </div>

      <div class="navbar-menu">
        <router-link to="/" class="navbar-link">Trang chủ</router-link>
        <router-link to="/rooms" class="navbar-link">Tìm phòng</router-link>
        <router-link to="/post" class="navbar-link">Đăng tin</router-link>
        <router-link to="/about" class="navbar-link">Về chúng tôi</router-link>
      </div>

      <div class="navbar-actions">
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
  </nav>
</template>

<script setup>
// No additional logic needed for this component
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

@media (max-width: 992px) {
  .navbar-container {
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }

  .navbar-menu {
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  }

  .navbar-actions {
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  }
}

@media (max-width: 576px) {
  .navbar-menu {
    flex-direction: column;
    align-items: center;
  }

  .navbar-actions {
    flex-direction: column;
  }

  .navbar-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>