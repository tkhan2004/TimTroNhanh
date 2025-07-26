import { ref } from 'vue'

/**
 * Composable quản lý dashboard data và logic
 * @returns {Object} Dashboard state và methods
 */
export function useDashboard() {
  /** Loading state */
  const loading = ref(false)
  
  /** Error state */
  const error = ref(null)
  
  /** Dashboard stats */
  const stats = ref([])
  
  /** Room status data */
  const roomStatus = ref({
    available: 0,
    occupied: 0,
    maintenance: 0
  })
  
  /** Recent activities */
  const recentActivities = ref([])
  
  /**
   * Fetch dashboard stats từ API
   */
  const fetchStats = async () => {
    loading.value = true
    error.value = null
    
    try {
      // TODO: Gọi API thực tế
      // const response = await dashboardService.getStats()
      
      // Mock data
      stats.value = [
        {
          label: 'Tổng phòng',
          value: '24',
          change: '+2',
          trend: 'up',
          icon: 'BuildingIcon'
        },
        {
          label: 'Phòng đã thuê',
          value: '18',
          change: '+3',
          trend: 'up',
          icon: 'UsersIcon'
        },
        {
          label: 'Doanh thu tháng',
          value: '45.2M',
          change: '+12%',
          trend: 'up',
          icon: 'CreditCardIcon'
        },
        {
          label: 'Lượt xem',
          value: '1,234',
          change: '+8%',
          trend: 'up',
          icon: 'EyeIcon'
        }
      ]
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Fetch room status từ API
   */
  const fetchRoomStatus = async () => {
    try {
      // TODO: Gọi API thực tế
      roomStatus.value = {
        available: 6,
        occupied: 18,
        maintenance: 2
      }
    } catch (err) {
      console.error('Lỗi khi fetch room status:', err)
    }
  }
  
  /**
   * Fetch recent activities từ API
   */
  const fetchRecentActivities = async () => {
    try {
      // TODO: Gọi API thực tế
      recentActivities.value = [
        {
          id: 1,
          type: 'booking',
          icon: 'UsersIcon',
          text: 'Nguyễn Văn A đã đặt phòng 101',
          time: '2 giờ trước'
        },
        {
          id: 2,
          type: 'payment',
          icon: 'CreditCardIcon',
          text: 'Nhận thanh toán từ phòng 205',
          time: '4 giờ trước'
        },
        {
          id: 3,
          type: 'inquiry',
          icon: 'EyeIcon',
          text: '5 lượt xem mới cho phòng 301',
          time: '6 giờ trước'
        }
      ]
    } catch (err) {
      console.error('Lỗi khi fetch activities:', err)
    }
  }
  
  /**
   * Load tất cả dashboard data
   */
  const loadDashboardData = async () => {
    await Promise.all([
      fetchStats(),
      fetchRoomStatus(),
      fetchRecentActivities()
    ])
  }
  
  return {
    // State
    loading,
    error,
    stats,
    roomStatus,
    recentActivities,
    
    // Methods
    loadDashboardData,
    fetchStats,
    fetchRoomStatus,
    fetchRecentActivities
  }
}