<template>
  <div class="room-management">
    <div class="page-header">
      <h1 class="page-title">Quản lý phòng trọ</h1>
      <p class="page-subtitle">Quản lý tất cả phòng trọ của bạn</p>
    </div>

    <div class="room-stats">
      <div class="stat-card">
        <div class="stat-number">{{ totalRooms }}</div>
        <div class="stat-label">Tổng phòng</div>
      </div>
      <div class="stat-card available">
        <div class="stat-number">{{ availableRooms }}</div>
        <div class="stat-label">Phòng trống</div>
      </div>
      <div class="stat-card occupied">
        <div class="stat-number">{{ occupiedRooms }}</div>
        <div class="stat-label">Đã thuê</div>
      </div>
    </div>

    <div class="room-list">
      <div class="list-header">
        <h3>Danh sách phòng</h3>
        <router-link to="/dashboard/post" class="btn btn-primary">
          + Thêm phòng mới
        </router-link>
      </div>

      <div class="room-grid">
        <div v-for="room in rooms" :key="room.id" class="room-item">
          <div class="room-image">
            <img :src="room.image" :alt="room.title" />
            <div class="room-status" :class="room.status">
              {{ room.status === 'available' ? 'Trống' : 'Đã thuê' }}
            </div>
          </div>
          <div class="room-info">
            <h4>{{ room.title }}</h4>
            <p class="room-price">{{ formatPrice(room.price) }}/tháng</p>
            <p class="room-address">{{ room.address }}</p>
          </div>
          <div class="room-actions">
            <button class="btn-icon" title="Chỉnh sửa">
              <svg viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon danger" title="Xóa">
              <svg viewBox="0 0 24 24">
                <polyline points="3,6 5,6 21,6"/>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/** Danh sách phòng */
const rooms = ref([
  {
    id: 1,
    title: 'Phòng trọ cao cấp Q1',
    price: 5000000,
    address: 'Quận 1, TP.HCM',
    image: 'https://via.placeholder.com/300x200',
    status: 'available'
  },
  {
    id: 2,
    title: 'Phòng trọ gần ĐH Bách Khoa',
    price: 3500000,
    address: 'Quận Thủ Đức, TP.HCM',
    image: 'https://via.placeholder.com/300x200',
    status: 'occupied'
  }
])

/** Computed stats */
const totalRooms = computed(() => rooms.value.length)
const availableRooms = computed(() => rooms.value.filter(r => r.status === 'available').length)
const occupiedRooms = computed(() => rooms.value.filter(r => r.status === 'occupied').length)

/**
 * Format giá tiền
 * @param {number} price - Giá phòng
 * @returns {string} Giá đã format
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}
</script>

<style scoped>
.room-management {
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

.room-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.stat-card.available .stat-number {
  color: #10b981;
}

.stat-card.occupied .stat-number {
  color: #f59e0b;
}

.room-list {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.room-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.room-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.room-image {
  position: relative;
  height: 150px;
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-status {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.room-status.available {
  background: #d1fae5;
  color: #065f46;
}

.room-status.occupied {
  background: #fef3c7;
  color: #92400e;
}

.room-info {
  padding: 1rem;
}

.room-info h4 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.room-price {
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.25rem;
}

.room-address {
  color: #6b7280;
  font-size: 0.875rem;
}

.room-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn-icon {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #e5e7eb;
}

.btn-icon.danger:hover {
  background: #fee2e2;
  color: #dc2626;
}

.btn-icon svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2563eb;
}
</style>