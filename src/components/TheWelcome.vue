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
    type: 'Nhà trọ, phòng trọ',ß
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

<style scoped>
.welcome-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero-section {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 60px 30px;
  margin-bottom: 40px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.hero-search {
  display: flex;
  max-width: 600px;
  margin: 0 auto 30px;
}

.search-input-group {
  flex-grow: 1;
  position: relative;
  margin-right: 10px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #999;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}

.hero-quick-filters {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.quick-filter {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.quick-filter:hover {
  background-color: #e0e0e0;
}

.features-section {
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 50px;
  height: 50px;
  color: #007bff;
  margin-bottom: 15px;
  stroke: currentColor;
  stroke-width: 2;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.feature-description {
  color: #666;
  font-size: 0.9rem;
}

.hot-rooms-section {
  margin-bottom: 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.section-description {
  color: #666;
  font-size: 1rem;
}

.hot-rooms-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1200px) {
  .features-grid,
  .hot-rooms-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .features-grid,
  .hot-rooms-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .features-grid,
  .hot-rooms-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-search {
    flex-direction: column;
  }

  .search-input-group {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-button {
    width: 100%;
  }

  .hero-quick-filters {
    flex-direction: column;
  }
}
</style>
