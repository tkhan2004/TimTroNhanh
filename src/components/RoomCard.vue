<template>
  <router-link 
    :to="{ name: 'RoomDetail', params: { id: room.id } }" 
    class="room-card"
  >
    <div class="room-card-image-container">
      <img 
        :src="room.img" 
        alt="Ảnh phòng" 
        class="room-card-image"
      />
      <span v-if="room.isHot" class="room-card-hot-badge">HOT</span>
      <button 
        class="room-card-favorite-btn" 
        @click.prevent="toggleFavorite"
      >
        <svg viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
    </div>

    <div class="room-card-content">
      <h3 class="room-card-title">{{ room.title }}</h3>
      <p class="room-card-price">{{ formatPrice(room.price) }}</p>
      
      <div class="room-card-tags">
        <span class="room-card-tag">{{ room.type }}</span>
        <span v-if="room.area" class="room-card-tag">{{ room.area }}m²</span>
      </div>

      <div class="room-card-location">
        <svg viewBox="0 0 24 24" class="location-icon">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>{{ room.location }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  if (price === 0) {
    return 'Liên hệ lấy giá'
  } else if (price >= 1000000) {
    return 'Từ ' + (price / 1000000).toFixed(1) + ' triệu/tháng'
  }
  return price.toLocaleString() + ' đ/tháng'
}

const toggleFavorite = () => {
  // Implement favorite toggle logic
  // This would typically involve an API call
  console.log('Toggle favorite for room', props.room.id)
}
</script>

<style scoped>
.room-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
  text-decoration: none;
  color: inherit;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.room-card-image-container {
  position: relative;
  width: 100%;
  padding-top: 66.66%; /* Tỷ lệ 3:2 */
}

.room-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-card-hot-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff0000;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
}

.room-card-favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.room-card-favorite-btn:hover {
  background-color: #f0f0f0;
}

.room-card-favorite-btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #333;
  stroke-width: 2;
}

.room-card-content {
  padding: 15px;
}

.room-card-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.room-card-price {
  color: #007bff;
  font-weight: bold;
  margin-bottom: 8px;
}

.room-card-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.room-card-tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.room-card-location {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.8rem;
}

.room-card-location svg {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  color: #999;
}

.location-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  color: #007bff;
}
</style>