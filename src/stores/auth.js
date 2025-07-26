import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false
  }),

  getters: {
    isLandlord: (state) => state.user?.role === 'landlord',
    isRenter: (state) => state.user?.role === 'tenant',
    userRole: (state) => state.user?.role || null
  },

  actions: {
    async login(email, password) {
      try {
        let userData = null
        
        if (email === 'khach@gmail.com' && password === '123456') {
          userData = {
            id: 1,
            email: 'khach@gmail.com',
            fullName: 'Nguyễn Văn A',
            role: 'tenant' // RENTER
          }
        } else if (email === 'chutro@gmail.com' && password === '123456') {
          userData = {
            id: 2,
            email: 'chutro@gmail.com',
            fullName: 'Trần Thị B',
            role: 'landlord' // OWNER
          }
        }

        if (userData) {
          this.user = userData
          this.isLoggedIn = true
          
          // Lưu vào localStorage
          localStorage.setItem('user', JSON.stringify(userData))
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userRole', userData.role)
          
          return { success: true, user: userData }
        } else {
          return { success: false, error: 'Email hoặc mật khẩu không đúng' }
        }
      } catch (error) {
        return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' }
      }
    },

    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
    },

    restoreSession() {
      const savedUser = localStorage.getItem('user')
      const savedLoginStatus = localStorage.getItem('isLoggedIn')
      
      if (savedUser && savedLoginStatus === 'true') {
        this.user = JSON.parse(savedUser)
        this.isLoggedIn = true
      }
    }
  }
})
