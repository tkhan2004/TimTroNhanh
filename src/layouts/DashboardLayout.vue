<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="dashboard-sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <img src="@/assets/logo.png" alt="Logo" class="sidebar-logo" />
        <h3 v-if="!sidebarCollapsed" class="sidebar-title">Quản lý trọ</h3>
      </div>

      <nav class="sidebar-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name"
          :to="{ name: item.route }"
          class="nav-item"
          :class="{ active: $route.name === item.route }"
        >
          <component :is="item.icon" class="nav-icon" />
          <span v-if="!sidebarCollapsed" class="nav-text">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn">
          <LogOutIcon class="nav-icon" />
          <span v-if="!sidebarCollapsed">Đăng xuất</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Top Header -->
      <header class="dashboard-header">
        <button @click="toggleSidebar" class="sidebar-toggle">
          <MenuIcon />
        </button>
        
        <div class="header-actions">
          <button class="notification-btn">
            <BellIcon />
            <span class="notification-badge">3</span>
          </button>
          
          <div class="user-menu">
            <img src="https://via.placeholder.com/32" alt="Avatar" class="user-avatar" />
            <span class="user-name">Chủ nhà ABC</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="dashboard-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  HomeIcon, 
  BuildingIcon, 
  UsersIcon, 
  CreditCardIcon, 
  BarChartIcon,
  MenuIcon,
  BellIcon,
  LogOutIcon,
  PlusIcon
} from '@/components/icons'

const router = useRouter()

/** Sidebar state */
const sidebarCollapsed = ref(false)

/** Menu items */
const menuItems = [
  { label: 'Tổng quan', route: 'DashboardOverview', icon: 'HomeIcon' },
  { label: 'Đăng tin mới', route: 'PostRoom', icon: 'PlusIcon' },
  { label: 'Quản lý phòng', route: 'RoomManagement', icon: 'BuildingIcon' },

  { label: 'Thống kê', route: 'Analytics', icon: 'BarChartIcon' }
]

/** Toggle sidebar */
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

/** Logout function */
const logout = () => {
  // TODO: Gọi API logout
  router.push({ name: 'Home' })
}
</script>

<style scoped src="@/assets/css/DashboardLayout.css"></style>
