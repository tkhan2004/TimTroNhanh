<template>
  <div class="analytics">
    <div class="page-header">
      <h1 class="page-title">Thống kê & Báo cáo</h1>
      <p class="page-subtitle">Phân tích hiệu suất kinh doanh</p>
    </div>

    <div class="analytics-grid">
      <div class="chart-card">
        <h3>Doanh thu theo tháng</h3>
        <div class="chart-placeholder">
          📊 Biểu đồ doanh thu sẽ hiển thị ở đây
        </div>
      </div>

      <div class="chart-card">
        <h3>Tỷ lệ lấp đầy phòng</h3>
        <div class="occupancy-rate">
          <div class="rate-circle">
            <span class="rate-number">75%</span>
          </div>
          <p>Tỷ lệ lấp đầy trung bình</p>
        </div>
      </div>

      <div class="chart-card">
        <h3>Top phòng được quan tâm</h3>
        <div class="top-rooms">
          <div v-for="room in topRooms" :key="room.id" class="room-stat">
            <span class="room-name">{{ room.name }}</span>
            <span class="room-views">{{ room.views }} lượt xem</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/** Top rooms data */
const topRooms = ref([
  { id: 1, name: 'Phòng trọ cao cấp Q1', views: 1234 },
  { id: 2, name: 'Phòng gần ĐH Bách Khoa', views: 987 },
  { id: 3, name: 'Phòng trọ Q7', views: 756 }
])
</script>

<style scoped>
.analytics {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 8px;
  color: #6b7280;
  font-size: 1.125rem;
}

.occupancy-rate {
  text-align: center;
}

.rate-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#3b82f6 0deg 270deg, #e5e7eb 270deg 360deg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  position: relative;
}

.rate-circle::before {
  content: '';
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  position: absolute;
}

.rate-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  position: relative;
  z-index: 1;
}

.top-rooms {
  space-y: 0.75rem;
}

.room-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.room-stat:last-child {
  border-bottom: none;
}

.room-name {
  font-weight: 500;
  color: #1f2937;
}

.room-views {
  color: #6b7280;
  font-size: 0.875rem;
}
</style>