<template>
  <div class="room-card">
    <div class="room-image">
      <img :src="room.image" :alt="room.title" />
      <div class="room-badge">{{ room.status }}</div>
    </div>
    
    <div class="room-content">
      <h3 class="room-title">{{ room.title }}</h3>
      <p class="room-address">{{ room.address }}</p>
      <div class="room-features">
        <span class="feature">{{ room.area }}m²</span>
        <span class="feature">{{ room.type }}</span>
      </div>
      <div class="room-price">{{ formatPrice(room.price) }}/tháng</div>
    </div>
    
    <div class="room-actions">
      <button @click="viewDetail" class="btn btn-primary">Xem chi tiết</button>
      <button @click="contact" class="btn btn-outline">Liên hệ</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

/** Props */
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

/** Emits */
const emit = defineEmits(['view-detail', 'contact'])

/**
 * Format giá tiền
 * @param {number} price - Giá phòng
 * @returns {string} Giá đã format
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

/** Xem chi tiết phòng */
const viewDetail = () => {
  emit('view-detail', props.room.id)
}

/** Liên hệ */
const contact = () => {
  emit('contact', props.room)
}
</script>

<style scoped>
.room-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
}

.room-card:hover {
  transform: translateY(-2px);
}
</style>