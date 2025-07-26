import { ref } from 'vue'
import { roomService } from '@/services/roomService'

/**
 * Composable quản lý rooms data và logic
 * @returns {Object} Rooms state và methods
 */
export function useRooms() {
  /** Loading state */
  const loading = ref(false)
  
  /** Error state */
  const error = ref(null)
  
  /** Rooms list */
  const rooms = ref([])
  
  /** Featured rooms */
  const featuredRooms = ref([])
  
  /** Filters */
  const filters = ref({
    location: '',
    priceMin: null,
    priceMax: null,
    roomType: '',
    area: null
  })
  
  /**
   * Fetch featured rooms
   */
  const fetchFeaturedRooms = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await roomService.getFeaturedRooms()
      featuredRooms.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Fetch rooms với filters
   * @param {Object} filterParams - Filter parameters
   */
  const fetchRooms = async (filterParams = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await roomService.getRooms(filterParams)
      rooms.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Search rooms
   * @param {string} query - Search query
   */
  const searchRooms = async (query) => {
    await fetchRooms({ search: query })
  }
  
  return {
    // State
    loading,
    error,
    rooms,
    featuredRooms,
    filters,
    
    // Methods
    fetchFeaturedRooms,
    fetchRooms,
    searchRooms
  }
}