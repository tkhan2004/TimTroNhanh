<script setup>
import RoomCard from './RoomCard.vue'

const hotRooms = [
  {
    id: 1,
    title: 'Nhà trọ 134/45 Đường Số 1, Phường 1...',
    location: 'Gò Vấp, Thành phố Hồ Chí Minh',
    price: 4000000,
    img: 'https://picsum.photos/300/200?1',
    type: 'Nhà trọ, phòng trọ',
    area: 16,
    isHot: true
  },
  {
    id: 2,
    title: 'Nhà Trọ Tại 27/11 Cộng Hòa, Phường ...',
    location: 'Tân Bình, Thành phố Hồ Chí Minh',
    price: 4700000,
    img: 'https://picsum.photos/300/200?2',
    type: 'Nhà trọ, phòng trọ',
    area: 22,
    isHot: true
  },
  {
    id: 3,
    title: 'Phòng trọ Quận 10, gần chợ, tiện đi lại',
    location: 'Quận 10, TP.HCM',
    price: 3100000,
    img: 'https://picsum.photos/300/200?12',
    type: 'Nhà trọ, phòng trọ',
    area: 20,
    isHot: true
  },
  {
    id: 4,
    title: 'Nhà trọ Quận Bình Tân, giá sinh viên',
    location: 'Bình Tân, TP.HCM',
    price: 2000000,
    img: 'https://picsum.photos/300/200?14',
    type: 'Nhà trọ, phòng trọ',
    area: 15,
    isHot: true
  }
]
</script>

<template>
  <div class="welcome-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Tìm Phòng Trọ Dễ Dàng</h1>
        <p class="hero-subtitle">Khám phá hàng ngàn phòng trọ, căn hộ, nhà nguyên căn phù hợp với nhu cầu của bạn</p>
        
        <div class="hero-search">
          <div class="search-input-group">
            <svg viewBox="0 0 24 24" class="search-icon">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              type="text" 
              placeholder="Bạn muốn tìm trọ ở đâu?" 
              class="search-input"
            />
          </div>
          <button class="search-button">Tìm kiếm</button>
        </div>

        <div class="hero-quick-filters">
          <button class="quick-filter">Phòng trọ</button>
          <button class="quick-filter">Nhà nguyên căn</button>
          <button class="quick-filter">Căn hộ</button>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <svg viewBox="0 0 24 24" class="feature-icon">
            <path d="M12 4.5v15m7.5-7.5h-15"></path>
          </svg>
          <h3 class="feature-title">Đăng tin miễn phí</h3>
          <p class="feature-description">Dễ dàng đăng tin phòng trọ của bạn mà không mất phí</p>
        </div>

        <div class="feature-card">
          <svg viewBox="0 0 24 24" class="feature-icon">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="feature-title">Xác thực an toàn</h3>
          <p class="feature-description">Chúng tôi kiểm duyệt và xác thực mọi tin đăng</p>
        </div>

        <div class="feature-card">
          <svg viewBox="0 0 24 24" class="feature-icon">
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="feature-title">Minh bạch giá</h3>
          <p class="feature-description">Không phát sinh chi phí ẩn, giá rõ ràng</p>
        </div>
      </div>
    </section>

    <section class="hot-rooms-section">
      <div class="section-header">
        <h2 class="section-title">Phòng Trọ Nổi Bật</h2>
        <p class="section-description">Những phòng trọ được nhiều người quan tâm nhất</p>
      </div>

      <div class="hot-rooms-grid">
        <RoomCard 
          v-for="room in hotRooms" 
          :key="room.id" 
          :room="room" 
        />
      </div>
    </section>
  </div>
</template>

<!-- Import external CSS file for TheWelcome component styles -->
<style src="@/assets/css/TheWelcome.css"></style>
