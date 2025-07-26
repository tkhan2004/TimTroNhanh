<template>
  <div class="post-room">
    <div class="page-header">
      <h1 class="page-title">Đăng tin cho thuê phòng trọ</h1>
      <p class="page-subtitle">Tạo tin đăng mới để thu hút khách thuê</p>
    </div>

    <div class="post-form-container">
      <form @submit.prevent="submitPost" class="post-form">
        <!-- Form đăng tin ở đây -->
        <div class="form-section">
          <h3>Thông tin cơ bản</h3>
          <div class="form-group">
            <label>Tiêu đề tin đăng</label>
            <input 
              v-model="form.title" 
              type="text" 
              placeholder="VD: Phòng trọ cao cấp gần trường ĐH Bách Khoa"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Mô tả chi tiết</label>
            <textarea 
              v-model="form.description" 
              rows="5"
              placeholder="Mô tả chi tiết về phòng trọ..."
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary">
            Lưu nháp
          </button>
          <button type="submit" class="btn btn-primary">
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/** Form data */
const form = ref({
  title: '',
  description: '',
  price: '',
  address: '',
  area: '',
  images: []
})

/** Submit form */
const submitPost = () => {
  console.log('Đăng tin:', form.value)
  // TODO: Gọi API đăng tin
}
</script>

<style scoped>
.post-room {
  max-width: 800px;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1rem;
}

.post-form-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}
</style>