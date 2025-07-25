<template>
  <div class="room-list-container">
    <div class="room-list-content">
      <!-- Filter Sidebar -->
      <aside class="filter-sidebar">
        <div class="filter-header">
          <h2>Bộ lọc tìm kiếm</h2>
          <button 
            class="reset-filters-btn" 
            @click="resetFilters"
          >
            Đặt lại
          </button>
        </div>

        <!-- Room Type Tabs -->
        <div class="room-type-tabs">
          <button 
            v-for="(type, index) in roomTypes" 
            :key="index"
            @click="selectRoomType(type.value)"
            :class="['room-type-tab', { 'active': selectedRoomType === type.value }]"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- Location Filter -->
        <div class="filter-section">
          <h3>Địa điểm</h3>
          <div class="location-filters">
            <select 
              v-model="selectedCity" 
              class="filter-select"
            >
              <option value="">Tất cả thành phố</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="hn">Hà Nội</option>
              <option value="dn">Đà Nẵng</option>
            </select>

            <select 
              v-model="selectedDistrict" 
              class="filter-select"
            >
              <option value="">Tất cả quận/huyện</option>
              <option 
                v-for="district in getDistrictsByCity(selectedCity)" 
                :key="district.value" 
                :value="district.value"
              >
                {{ district.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Price Filter -->
        <div class="filter-section">
          <h3>Mức giá</h3>
          <div class="price-filters">
            <div class="price-range-inputs">
              <input 
                type="number" 
                v-model="priceFrom" 
                placeholder="Từ" 
                class="price-input"
              />
              <span>-</span>
              <input 
                type="number" 
                v-model="priceTo" 
                placeholder="Đến" 
                class="price-input"
              />
              <span class="price-unit">triệu</span>
            </div>
            <div class="price-presets">
              <button 
                v-for="preset in pricePresets" 
                :key="preset.label"
                @click="applyPricePreset(preset)"
                class="price-preset-btn"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Area Filter -->
        <div class="filter-section">
          <h3>Diện tích</h3>
          <div class="area-filters">
            <div class="area-range-inputs">
              <input 
                type="number" 
                v-model="areaFrom" 
                placeholder="Từ" 
                class="area-input"
              />
              <span>-</span>
              <input 
                type="number" 
                v-model="areaTo" 
                placeholder="Đến" 
                class="area-input"
              />
              <span class="area-unit">m²</span>
            </div>
            <div class="area-presets">
              <button 
                v-for="preset in areaPresets" 
                :key="preset.label"
                @click="applyAreaPreset(preset)"
                class="area-preset-btn"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Utilities Filter -->
        <div class="filter-section">
          <h3>Tiện ích</h3>
          <div class="utilities-grid">
            <label 
              v-for="utility in utilities" 
              :key="utility.id" 
              class="utility-checkbox"
            >
              <input 
                type="checkbox" 
                :value="utility.id" 
                v-model="selectedUtilities"
              />
              <span>{{ utility.name }}</span>
            </label>
          </div>
        </div>

        <!-- Apply Filters Button -->
        <button 
          class="apply-filters-btn" 
          @click="applyFilters"
        >
          Áp dụng bộ lọc
        </button>
      </aside>

      <!-- Room Listings -->
      <main class="room-listings">
        <div class="listings-header">
          <h2>{{ pageTitle }}</h2>
          <div class="sort-options">
            <select v-model="sortOption" class="sort-select">
              <option value="newest">Mới nhất</option>
              <option value="lowest_price">Giá thấp nhất</option>
              <option value="highest_price">Giá cao nhất</option>
              <option value="largest_area">Diện tích lớn nhất</option>
            </select>
          </div>
        </div>

        <div class="rooms-grid">
          <RoomCard 
            v-for="room in paginatedRooms" 
            :key="room.id" 
            :room="room"
          />
        </div>

        <div 
          v-if="filteredRooms.length === 0" 
          class="no-results"
        >
          <p>Không tìm thấy phòng phù hợp</p>
          <button @click="resetFilters">Đặt lại bộ lọc</button>
        </div>

        <div class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            Trang trước
          </button>
          <span>Trang {{ currentPage }} / {{ totalPages }}</span>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            Trang tiếp
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RoomCard from '@/components/RoomCard.vue'

// Room Types
const roomTypes = [
  { label: 'Tất cả', value: '' },
  { label: 'Phòng trọ', value: 'room' },
  { label: 'Nhà nguyên căn', value: 'house' },
  { label: 'Căn hộ', value: 'apartment' }
]

// City and District Data
const cityDistricts = {
  hcm: [
    { label: 'Quận 1', value: 'q1' },
    { label: 'Quận 2', value: 'q2' },
    { label: 'Quận 3', value: 'q3' },
    { label: 'Quận 4', value: 'q4' },
    { label: 'Quận 5', value: 'q5' }
  ],
  hn: [
    { label: 'Quận Ba Đình', value: 'badinh' },
    { label: 'Quận Hoàn Kiếm', value: 'hoankiem' },
    { label: 'Quận Tây Hồ', value: 'tayho' }
  ],
  dn: [
    { label: 'Quận Hải Châu', value: 'haichau' },
    { label: 'Quận Sơn Trà', value: 'sontra' }
  ]
}

// Utilities
const utilities = [
  { id: 1, name: 'Wifi' },
  { id: 2, name: 'Điều hòa' },
  { id: 3, name: 'Giường' },
  { id: 4, name: 'Tủ quần áo' },
  { id: 5, name: 'Bếp' },
  { id: 6, name: 'Máy giặt' }
]

// Price Presets
const pricePresets = [
  { label: 'Dưới 1 triệu', min: 0, max: 1 },
  { label: '1-3 triệu', min: 1, max: 3 },
  { label: '3-5 triệu', min: 3, max: 5 },
  { label: '5-10 triệu', min: 5, max: 10 }
]

// Area Presets
const areaPresets = [
  { label: 'Dưới 20m²', min: 0, max: 20 },
  { label: '20-30m²', min: 20, max: 30 },
  { label: '30-50m²', min: 30, max: 50 },
  { label: 'Trên 50m²', min: 50, max: null }
]

// Reactive State
const selectedRoomType = ref('')
const selectedCity = ref('')
const selectedDistrict = ref('')
const priceFrom = ref(null)
const priceTo = ref(null)
const areaFrom = ref(null)
const areaTo = ref(null)
const selectedUtilities = ref([])
const sortOption = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Mock Rooms Data
const rooms = ref([
  {
    id: 1,
    title: 'Phòng trọ đầy đủ tiện nghi',
    type: 'room',
    price: 3500000,
    area: 25,
    location: 'Quận 1, TP. Hồ Chí Minh',
    img: 'https://picsum.photos/300/200?1',
    utilities: [1, 2, 3],
    city: 'hcm',
    district: 'q1'
  },
  // Add more mock rooms...
])

// Computed Properties
const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    // Room Type Filter
    if (selectedRoomType.value && room.type !== selectedRoomType.value) return false

    // City Filter
    if (selectedCity.value && room.city !== selectedCity.value) return false

    // District Filter
    if (selectedDistrict.value && room.district !== selectedDistrict.value) return false

    // Price Filter
    const roomPrice = room.price / 1000000
    if (priceFrom.value && roomPrice < priceFrom.value) return false
    if (priceTo.value && roomPrice > priceTo.value) return false

    // Area Filter
    if (areaFrom.value && room.area < areaFrom.value) return false
    if (areaTo.value && room.area > areaTo.value) return false

    // Utilities Filter
    if (selectedUtilities.value.length > 0) {
      const hasAllUtilities = selectedUtilities.value.every(utilityId => 
        room.utilities.includes(utilityId)
      )
      if (!hasAllUtilities) return false
    }

    return true
  }).sort((a, b) => {
    switch (sortOption.value) {
      case 'lowest_price': return a.price - b.price
      case 'highest_price': return b.price - a.price
      case 'largest_area': return b.area - a.area
      default: return 0 // newest
    }
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredRooms.value.length / itemsPerPage.value))

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRooms.value.slice(start, end)
})

// Page Title
const pageTitle = computed(() => {
  const typeLabel = roomTypes.find(type => type.value === selectedRoomType.value)?.label || 'Tất cả phòng'
  return `${typeLabel} (${filteredRooms.value.length} phòng)`
})

// Methods
const getDistrictsByCity = (city) => {
  return cityDistricts[city] || []
}

const selectRoomType = (type) => {
  selectedRoomType.value = type
}

const applyPricePreset = (preset) => {
  priceFrom.value = preset.min
  priceTo.value = preset.max
}

const applyAreaPreset = (preset) => {
  areaFrom.value = preset.min
  areaTo.value = preset.max
}

const applyFilters = () => {
  // Trigger filtering (computed property will handle this)
  currentPage.value = 1
}

const resetFilters = () => {
  selectedRoomType.value = ''
  selectedCity.value = ''
  selectedDistrict.value = ''
  priceFrom.value = null
  priceTo.value = null
  areaFrom.value = null
  areaTo.value = null
  selectedUtilities.value = []
  sortOption.value = 'newest'
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<!-- Import external CSS file for RoomList view styles -->
<style src="@/assets/css/RoomList.css"></style>