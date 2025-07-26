---
type: "always_apply"
---

Dưới đây là Frontend Code Rule chuyên nghiệp cho Vue 3 (Composition API + Pinia) được trình bày đầy đủ dưới dạng file Markdown (.md). Bạn có thể dùng file này làm tài liệu nội bộ hoặc chia sẻ cho AI agent/code assistant.

⸻


# 📘 FE_PRO_CODER_RULE_VUE

> Hướng dẫn viết mã frontend chuyên nghiệp với Vue 3 + Composition API + Pinia.

---

## 🎯 Mục tiêu

Code frontend hiện đại, dễ đọc, dễ mở rộng, dễ bảo trì, dùng được trong môi trường làm việc nhóm và sẵn sàng production.

---

## 📁 1. Cấu trúc thư mục chuẩn

src/
├── assets/           # Ảnh, biểu tượng, fonts, màu sắc
├── components/       # Component tái sử dụng
├── layouts/          # Layout chính (DefaultLayout, AdminLayout,…)
├── pages/            # Mỗi page tương ứng route
├── router/           # Cấu hình Vue Router
├── stores/           # State management - Pinia
├── services/         # Gọi API
├── composables/      # Các logic tách biệt (useX)
├── utils/            # Hàm tiện ích chung
├── constants/        # Biến hằng số, route name,…
├── App.vue
└── main.js

---

## ✍️ 2. Quy tắc Comment

- Trước mỗi function hoặc logic phức tạp:
```js
/**
 * Mô tả chức năng
 * @param {type} param - mô tả
 * @returns {type}
 */

	•	Trước block logic:

// Gọi API để lấy danh sách phòng trọ


⸻

🧠 3. Component & Composition API
	•	Dùng setup(), ref, computed, watch,…
	•	Dùng defineProps, defineEmits rõ ràng.
	•	Props và emits phải có định nghĩa hoặc comment đầy đủ.
	•	Logic phức tạp phải tách ra composables/ ví dụ: useAuth.js, useRoomFilter.js.

⸻

💅 4. Style & CSS
	•	Dùng scoped.
	•	Class đặt tên theo BEM hoặc theo cấu trúc rõ ràng: room-card, btn-primary, main-header.

⸻

⚙️ 5. Gọi API
	•	Tách riêng trong services/:

// services/roomService.js
export const fetchRooms = () => axios.get('/api/rooms')

	•	Gọi API trong component phải có:
	•	try/catch
	•	loading state
	•	error state

⸻

🧾 6. State Management (Pinia)
	•	Tách từng store theo domain: useUserStore(), useRoomStore(),…
	•	Không chứa logic xử lý trong component → đẩy vào store hoặc composables/.
	•	Dùng getters để tính toán state.

⸻

🌐 7. Router chuẩn

// router/index.js
const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/HomePage.vue') },
  { path: '/rooms', name: 'RoomList', component: () => import('@/pages/RoomList.vue') },
]

	•	Tất cả route phải đặt name.
	•	Dùng lazy loading: component: () => import(...).

⸻

✅ 8. Checklist Trước Khi Merge/Hoàn Thành
	•	Tách component nếu dài > 50 dòng.
	•	Sử dụng Composition API.
	•	Không gọi API trực tiếp trong component.
	•	Logic chia rõ vào composables/, services/, stores/.
	•	Đặt tên biến/hàm rõ ràng (camelCase).
	•	Không có console.log, debugger, hoặc code không dùng.
	•	Giao diện responsive trên mobile.
	•	Code có comment rõ ràng.
	•	Tất cả route dùng name.
	•	Dùng lazy loading cho route component.

⸻

📌 Ví dụ Comment trong Component Vue

<script setup>
import { fetchRooms } from '@/services/roomService'
import { ref, onMounted } from 'vue'

/** Danh sách phòng trọ */
const rooms = ref([])

/** Gọi API khi vào trang */
onMounted(async () => {
  try {
    const res = await fetchRooms()
    rooms.value = res.data
  } catch (err) {
    console.error('Lỗi khi fetch phòng:', err)
  }
})
</script>


⸻

🔰 Ghi chú
	•	Ưu tiên tách nhỏ logic, giữ file component < 100 dòng.
	•	Có thể dùng thư viện UI như Element Plus, Vuetify, Naive UI, nhưng phải có cấu hình style nhất quán.
	•	Nếu làm nhiều màn hình → nên có layout tổng và chia rõ page, component.

⸻

