// import axios from 'axios'

// const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

// /**
//  * Room API service
//  */
// export const roomService = {
//   /**
//    * Lấy danh sách phòng nổi bật
//    * @returns {Promise} API response
//    */
//   async getFeaturedRooms() {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/rooms/featured`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy danh sách phòng nổi bật')
//     }
//   },

//   /**
//    * Lấy danh sách phòng với filter
//    * @param {Object} params - Filter parameters
//    * @returns {Promise} API response
//    */
//   async getRooms(params = {}) {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/rooms`, { params })
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy danh sách phòng')
//     }
//   },

//   /**
//    * Lấy chi tiết phòng
//    * @param {string} id - Room ID
//    * @returns {Promise} API response
//    */
//   async getRoomDetail(id) {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/rooms/${id}`)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể lấy chi tiết phòng')
//     }
//   },

//   /**
//    * Tạo phòng mới
//    * @param {Object} roomData - Room data
//    * @returns {Promise} API response
//    */
//   async createRoom(roomData) {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/rooms`, roomData)
//       return response.data
//     } catch (error) {
//       throw new Error('Không thể tạo phòng mới')
//     }
//   }
// }