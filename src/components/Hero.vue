<template>
  <div class="hero-container">
    <div class="hero-background">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="hero-title-highlight">Ở TRỌ KHÔNG LO</span>
            <br>
            CỨ ĐỂ CHÚNG TÔI LO CHỖ Ở CHO BẠN
          </h1>
          <p class="hero-subtitle">
            Hàng nghìn phòng trọ được cập nhật mỗi ngày trên toàn quốc
            <br>
            Cùng bạn tìm nơi ở an tâm từ những người cho thuê uy tín
          </p>
        </div>

        <div class="hero-search-container">
          <div class="hero-search-tabs">
            <button 
              v-for="(tab, index) in searchTabs" 
              :key="index"
              @click="activeTab = index"
              :class="['search-tab', { 'active': activeTab === index }]"
            >
              {{ tab }}
            </button>
          </div>

          <div class="hero-search-form">
            <div class="search-inputs">
              <div class="search-input-group">
                <svg viewBox="0 0 24 24" class="search-icon">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input 
                  type="text" 
                  placeholder="Nhập địa chỉ, quận, thành phố"
                  class="search-input"
                  v-model="searchQuery"
                />
              </div>

              <div class="search-input-group">
                <div class="select-wrapper">
                  <select 
                    class="search-select" 
                    v-model="selectedLocation"
                  >
                    <option value="" disabled selected>Chọn địa điểm</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="dn">Đà Nẵng</option>
                  </select>
                </div>
              </div>

              <div class="search-input-group">
                <div class="select-wrapper">
                  <select 
                    class="search-select" 
                    v-model="selectedPrice"
                    @change="handlePriceChange"
                  >
                    <option value="" disabled selected>Mức giá</option>
                    <option value="0-1">Dưới 1 triệu</option>
                    <option value="1-3">1-3 triệu</option>
                    <option value="3-5">3-5 triệu</option>
                    <option value="5-10">5-10 triệu</option>
                    <option value="10+">Trên 10 triệu</option>
                    <option value="custom">Tùy chọn</option>
                  </select>
                </div>
              </div>

              <div 
                v-if="showCustomPriceInput" 
                class="search-input-group price-range"
              >
                <div class="price-inputs">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    class="price-input"
                    v-model="customPriceFrom"
                    min="0"
                  />
                  <span class="price-separator">-</span>
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    class="price-input"
                    v-model="customPriceTo"
                    min="0"
                  />
                </div>
                <span class="price-unit">triệu</span>
              </div>

              <div class="search-input-group">
                <div class="select-wrapper">
                  <select 
                    class="search-select" 
                    v-model="selectedArea"
                  >
                    <option value="" disabled selected>Diện tích</option>
                    <option value="0-20">Dưới 20m²</option>
                    <option value="20-30">20-30m²</option>
                    <option value="30-50">30-50m²</option>
                    <option value="50+">Trên 50m²</option>
                  </select>
                </div>
              </div>

              <button class="search-button" @click="performSearch">
                <svg viewBox="0 0 24 24" class="search-button-icon">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-promotions">
      <div class="promotion-slider">
        <div class="promotion-item">
          <img src="https://picsum.photos/seed/promo1/800/200" alt="Khuyến mãi 1" />
        </div>
        <div class="promotion-item">
          <img src="https://picsum.photos/seed/promo2/800/200" alt="Khuyến mãi 2" />
        </div>
        <div class="promotion-item">
          <img src="https://picsum.photos/seed/promo3/800/200" alt="Khuyến mãi 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchTabs = [
  'Tất cả', 
  'Nhà trọ, phòng trọ', 
  'Nhà nguyên căn', 
  'Căn hộ'
]

const activeTab = ref(0)
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedPrice = ref('')
const selectedArea = ref('')

// Custom price range
const showCustomPriceInput = ref(false)
const customPriceFrom = ref(null)
const customPriceTo = ref(null)

const handlePriceChange = () => {
  showCustomPriceInput.value = selectedPrice.value === 'custom'
}

const performSearch = () => {
  // Determine price range
  let priceFrom = null
  let priceTo = null

  if (selectedPrice.value !== 'custom') {
    const [from, to] = selectedPrice.value.split('-')
    priceFrom = from === '0' ? null : parseFloat(from) * 1000000
    priceTo = to === '+' ? null : (to ? parseFloat(to) * 1000000 : null)
  } else {
    priceFrom = customPriceFrom.value ? customPriceFrom.value * 1000000 : null
    priceTo = customPriceTo.value ? customPriceTo.value * 1000000 : null
  }

  const searchParams = {
    query: searchQuery.value,
    location: selectedLocation.value,
    priceFrom: priceFrom,
    priceTo: priceTo,
    area: selectedArea.value,
    type: searchTabs[activeTab.value]
  }

  console.log('Searching with params:', searchParams)
  // Implement actual search logic here
}
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
}

.hero-background {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  position: relative;
  padding: 80px 0 40px;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" opacity="0.1"%3E%3Cpattern id="pattern" width="50" height="50" patternUnits="userSpaceOnUse"%3E%3Cpath d="M0 50V0h50" fill="none" stroke="white" stroke-width="1"/%3E%3C/pattern%3E%3Crect width="100%" height="100%" fill="url(%23pattern)"/%3E%3C/svg%3E');
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero-text {
  text-align: center;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 15px;
}

.hero-title-highlight {
  color: #ffd700;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.hero-search-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.hero-search-tabs {
  display: flex;
  background-color: #f4f4f4;
  border-bottom: 1px solid #e0e0e0;
}

.search-tab {
  flex: 1;
  padding: 12px;
  text-align: center;
  background-color: #f4f4f4;
  color: #666;
  border: none;
  transition: all 0.3s ease;
}

.search-tab.active {
  background-color: #007bff;
  color: white;
}

.hero-search-form {
  padding: 20px;
}

.search-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 10px;
  align-items: center;
}

.search-input-group {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #999;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.search-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white url('data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>') no-repeat right 10px center;
  background-size: 24px;
  color: #666;
  font-size: 0.9rem;
}

.search-select:focus {
  outline: none;
  border-color: #007bff;
}

.search-select option {
  color: #333;
}

.search-select option:first-child {
  color: #999;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6b00;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  white-space: nowrap;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #ff8533;
}

.search-button-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: currentColor;
}

.price-range {
  grid-column: span 2; /* Make price range span two columns */
  display: flex;
  align-items: center;
  gap: 5px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.price-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
}

.price-separator {
  font-size: 1.2rem;
  color: #666;
}

.price-unit {
  font-size: 0.9rem;
  color: #666;
  margin-left: 5px;
}

.hero-promotions {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
}

.promotion-slider {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.promotion-item {
  flex: 0 0 auto;
  width: calc(100% - 30px);
  scroll-snap-align: center;
}

.promotion-item img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

@media (max-width: 1200px) {
  .search-inputs {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .search-inputs {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }
}
</style> 