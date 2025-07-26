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

<!-- Import external CSS file for RoomCard component styles -->
<style src="@/assets/css/RoomCard.css"></style>