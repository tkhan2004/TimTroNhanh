// /**
//  * Utility functions for formatting data
//  */

// /**
//  * Format price to Vietnamese currency
//  * @param {number} price - Price value
//  * @returns {string} Formatted price
//  */
// export const formatPrice = (price) => {
//   return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
// }

// /**
//  * Format date to Vietnamese format
//  * @param {Date|string} date - Date value
//  * @returns {string} Formatted date
//  */
// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('vi-VN')
// }

// /**
//  * Format phone number
//  * @param {string} phone - Phone number
//  * @returns {string} Formatted phone
//  */
// export const formatPhone = (phone) => {
//   return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
// }

// /**
//  * Truncate text
//  * @param {string} text - Text to truncate
//  * @param {number} length - Max length
//  * @returns {string} Truncated text
//  */
// export const truncateText = (text, length = 100) => {
//   if (text.length <= length) return text
//   return text.substring(0, length) + '...'
// }