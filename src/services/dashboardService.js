// import axios from 'axios'

// const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

// /**
//  * Dashboard API service
//  */
// export const dashboardService = {
//   /**
//    * Lấy thống kê tổng quan dashboard
//    * @returns {Promise} API response
//    */
//   async getStats() {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/dashboard/stats`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy dữ liệu thống kê')
//     }
//   },

//   /**
//    * Lấy trạng thái phòng
//    * @returns {Promise} API response
//    */
//   async getRoomStatus() {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/dashboard/room-status`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy trạng thái phòng')
//     }
//   },

//   /**
//    * Lấy hoạt động gần đây
//    * @param {number} limit - Số lượng hoạt động
//    * @returns {Promise} API response
//    */
//   async getRecentActivities(limit = 10) {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/dashboard/activities?limit=${limit}`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy hoạt động gần đây')
//     }
//   },

//   /**
//    * Lấy dữ liệu biểu đồ doanh thu
//    * @param {string} period - Khoảng thời gian (6months, 12months)
//    * @returns {Promise} API response
//    */
//   async getRevenueChart(period = '6months') {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/dashboard/revenue?period=${period}`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy dữ liệu doanh thu')
//     }
//   }
// }