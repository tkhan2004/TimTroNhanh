<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner"></div>
    <p>Đang tải thông tin phòng...</p>
  </div>

  <div v-else-if="error" class="error-container">
    <p>Đã có lỗi xảy ra: {{ error.message }}</p>
    <button @click="fetchRoomDetails">Thử lại</button>
  </div>

  <div v-else-if="room" class="room-detail-container">
    <div class="room-detail-content">
      <!-- Image Gallery -->
      <section class="room-gallery">
        <div class="main-image">
          <img 
            :src="room.imageUrls[0]" 
            :alt="room.title" 
            class="main-image-display"
          />
        </div>
        <div class="thumbnail-images">
          <img 
            v-for="(image, index) in room.imageUrls.slice(1, 5)" 
            :key="index"
            :src="image"
            :alt="`Room image ${index + 2}`"
            class="thumbnail-image"
          />
          <div 
            v-if="room.imageUrls.length > 5" 
            class="more-images-overlay"
          >
            +{{ room.imageUrls.length - 5 }}
          </div>
        </div>
      </section>

      <!-- Room Basic Information -->
      <section class="room-info">
        <div class="room-header">
          <h1 class="room-title">{{ room.title }}</h1>
          <button 
            class="favorite-button" 
            @click="toggleFavorite"
          >
            <svg 
              viewBox="0 0 24 24" 
              :class="['favorite-icon', { 'favorited': room.isFavorited }]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{{ room.favoriteCount }} Lượt thích</span>
          </button>
        </div>

        <div class="room-details">
          <div class="room-price-area">
            <div class="room-price">
              <svg viewBox="0 0 24 24" class="icon">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {{ formatPrice(room.price) }}
            </div>
            <div class="room-area">
              <svg viewBox="0 0 24 24" class="icon">
                <path d="M17 16l2.5-2.5m0 0L22 16m-2.5-2.5V19a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3"/>
              </svg>
              {{ room.area }} m²
            </div>
          </div>

          <div class="room-location">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {{ formatAddress(room) }}
          </div>
        </div>

        <!-- Room Description -->
        <div class="room-description">
          <h3>Mô tả chi tiết</h3>
          <p>{{ room.description }}</p>
        </div>

        <!-- Room Utilities -->
        <div class="room-utilities">
          <h3>Tiện ích</h3>
          <div class="utilities-grid">
            <div 
              v-for="utility in room.utilities" 
              :key="utility.id" 
              class="utility-item"
            >
              <img :src="utility.icon" :alt="utility.name" />
              <span>{{ utility.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="room-contact">
        <div class="owner-info">
          <img 
            :src="room.owner.avatarUrl" 
            :alt="room.owner.fullName" 
            class="owner-avatar"
          />
          <div class="owner-details">
            <h3>{{ room.owner.fullName }}</h3>
            <p>Đã đăng {{ formatDate(room.createdAt) }}</p>
          </div>
        </div>

        <div class="contact-methods">
          <button 
            class="contact-button phone-button"
            @click="showPhoneNumber"
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Gọi điện
          </button>

          <button 
            class="contact-button zalo-button"
            @click="openZaloChat"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Chat Zalo
          </button>

          <button 
            class="contact-button messenger-button"
            @click="openMessenger"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Messenger
          </button>
        </div>
      </section>

      <!-- Map Section -->
      <section class="room-map" v-if="room.latitude && room.longitude">
        <h3>Vị trí phòng</h3>
        <div id="map" class="map-container"></div>
      </section>
    </div>

    <!-- Similar Rooms Recommendation -->
    <section class="similar-rooms">
      <h2>Phòng tương tự</h2>
      <div class="similar-rooms-grid">
        <RoomCard 
          v-for="similarRoom in similarRooms" 
          :key="similarRoom.id" 
          :room="similarRoom"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RoomCard from '@/components/RoomCard.vue'

// Get the route to access route parameters
const route = useRoute()

// Reactive room data
const room = ref(null)
const loading = ref(true)
const error = ref(null)

// Fetch room details
const fetchRoomDetails = async () => {
  try {
    // In a real application, replace this with an actual API call
    // For now, we'll simulate an API call with a timeout
    loading.value = true
    
    // Simulated API call
    const roomId = route.params.id
    
    // Mock data - in real app, this would be an API call
    const mockRoomData = {
      id: roomId,
      title: `Phòng trọ số ${roomId} - Đầy đủ tiện nghi`,
      description: 'Phòng trọ rộng rãi, thoáng mát, đầy đủ tiện nghi. Gần trung tâm, an ninh tốt.',
      price: 4500000,
      area: 30,
      address: `123 Đường ABC, Phường XYZ, Quận ${roomId}`,
      city: 'Hồ Chí Minh',
      district: `Quận ${roomId}`,
      ward: 'Phường 1',
      latitude: 10.7758,
      longitude: 106.7039,
      status: 'AVAILABLE',
      createdAt: new Date(),
      owner: {
        fullName: `Chủ nhà ${roomId}`,
        avatarUrl: `https://picsum.photos/200/200?${roomId}`
      },
      utilities: [
        { id: 1, name: 'Wifi', icon: 'wifi-icon.svg' },
        { id: 2, name: 'Điều hòa', icon: 'ac-icon.svg' },
        { id: 3, name: 'Giường', icon: 'bed-icon.svg' }
      ],
      imageUrls: [
        `https://picsum.photos/800/600?${roomId}1`,
        `https://picsum.photos/800/600?${roomId}2`,
        `https://picsum.photos/800/600?${roomId}3`,
        `https://picsum.photos/800/600?${roomId}4`,
        `https://picsum.photos/800/600?${roomId}5`
      ],
      favoriteCount: 42,
      isFavorited: false
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    room.value = mockRoomData
    loading.value = false
  } catch (err) {
    error.value = err
    loading.value = false
  }
}

// Lifecycle hook to fetch room details when component mounts
onMounted(fetchRoomDetails)

// Existing methods from previous implementation
const formatPrice = (price) => {
  return price >= 1000000 
    ? `${(price / 1000000).toFixed(1)} triệu/tháng` 
    : `${price.toLocaleString()} đ/tháng`
}

const formatAddress = (room) => {
  return `${room.address}, ${room.ward}, ${room.district}, ${room.city}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const toggleFavorite = () => {
  if (room.value) {
    room.value.isFavorited = !room.value.isFavorited
    room.value.favoriteCount += room.value.isFavorited ? 1 : -1
  }
}

const showPhoneNumber = () => {
  if (room.value) {
    alert(`Số điện thoại: ${room.value.owner.phoneNumber || 'Chưa cung cấp'}`)
  }
}

const openZaloChat = () => {
  if (room.value) {
    window.open(`https://zalo.me/${room.value.owner.zaloId || ''}`, '_blank')
  }
}

const openMessenger = () => {
  if (room.value) {
    window.open(`https://m.me/${room.value.owner.messengerId || ''}`, '_blank')
  }
}
</script>

<!-- Import external CSS file for RoomDetail view styles -->
<style src="@/assets/css/RoomDetail.css"></style>