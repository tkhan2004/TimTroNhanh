<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Tìm Trọ Nhanh</h4>
          <p>Nền tảng tìm kiếm phòng trọ hàng đầu Việt Nam</p>
        </div>
        
        <div class="footer-section">
          <h4>Liên kết</h4>
          <ul>
            <li><router-link :to="{ name: 'Home' }">Trang chủ</router-link></li>
            <li><router-link :to="{ name: 'RoomList' }">Tìm phòng</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Liên hệ</h4>
          <p>Email: contact@timtronhanh.com</p>
          <p>Hotline: 1900 1234</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Tìm Trọ Nhanh. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2d3748;
  color: white;
  padding: 2rem 0 1rem;
  margin-top: auto;
}
</style>