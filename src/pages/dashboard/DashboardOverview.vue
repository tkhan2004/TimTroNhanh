<template>
  <div class="dashboard-overview">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Tổng quan</h1>
      <p class="page-subtitle">Xem tổng quan hoạt động kinh doanh của bạn</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="stat-card"
        :class="stat.trend === 'up' ? 'trend-up' : 'trend-down'"
      >
        <div class="stat-icon">
          <component :is="stat.icon" />
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
          <div class="stat-change">
            <span class="change-value">{{ stat.change }}</span>
            <span class="change-period">so với tháng trước</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <!-- Revenue Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Doanh thu 6 tháng gần đây</h3>
          <select v-model="revenueFilter" class="chart-filter">
            <option value="6months">6 tháng</option>
            <option value="12months">12 tháng</option>
          </select>
        </div>
        <div class="chart-placeholder">
          <!-- TODO: Thêm chart library -->
          <p>Biểu đồ doanh thu sẽ hiển thị ở đây</p>
        </div>
      </div>

      <!-- Room Status Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Tình trạng phòng</h3>
        </div>
        <div class="room-status-chart">
          <div class="status-item">
            <div class="status-color available"></div>
            <span>Phòng trống ({{ roomStatus.available }})</span>
          </div>
          <div class="status-item">
            <div class="status-color occupied"></div>
            <span>Đã cho thuê ({{ roomStatus.occupied }})</span>
          </div>
          <div class="status-item">
            <div class="status-color maintenance"></div>
            <span>Bảo trì ({{ roomStatus.maintenance }})</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="recent-activities">
      <div class="section-header">
        <h3 class="section-title">Hoạt động gần đây</h3>
        <router-link :to="{ name: 'BookingManagement' }" class="view-all-link">
          Xem tất cả
        </router-link>
      </div>
      
      <div class="activities-list">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <component :is="activity.icon" />
          </div>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BuildingIcon, UsersIcon, CreditCardIcon, EyeIcon } from '@/components/icons'

/** Stats data */
const stats = ref([
  {
    label: 'Tổng phòng',
    value: '24',
    change: '+2',
    trend: 'up',
    icon: 'BuildingIcon'
  },
  {
    label: 'Phòng đã thuê',
    value: '18',
    change: '+3',
    trend: 'up',
    icon: 'UsersIcon'
  },
  {
    label: 'Doanh thu tháng',
    value: '45.2M',
    change: '+12%',
    trend: 'up',
    icon: 'CreditCardIcon'
  },
  {
    label: 'Lượt xem',
    value: '1,234',
    change: '+8%',
    trend: 'up',
    icon: 'EyeIcon'
  }
])

/** Room status */
const roomStatus = ref({
  available: 6,
  occupied: 18,
  maintenance: 2
})

/** Recent activities */
const recentActivities = ref([
  {
    id: 1,
    type: 'booking',
    icon: 'UsersIcon',
    text: 'Nguyễn Văn A đã đặt phòng 101',
    time: '2 giờ trước'
  },
  {
    id: 2,
    type: 'payment',
    icon: 'CreditCardIcon',
    text: 'Nhận thanh toán từ phòng 205',
    time: '4 giờ trước'
  },
  {
    id: 3,
    type: 'inquiry',
    icon: 'EyeIcon',
    text: '5 lượt xem mới cho phòng 301',
    time: '6 giờ trước'
  }
])

const revenueFilter = ref('6months')

/**
 * Load dashboard data từ API
 */
const loadDashboardData = async () => {
  try {
    // TODO: Gọi API lấy dữ liệu dashboard
    console.log('Loading dashboard data...')
  } catch (error) {
    console.error('Lỗi khi load dashboard:', error)
  }
}

/** Load data khi component mount */
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped src="@/assets/css/DashboardOverview.css"></style>