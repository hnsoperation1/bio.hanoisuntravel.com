# bio.hanoisuntravel.com

Card visit điện tử: khách quét QR trên card visit → mở `bio.hanoisuntravel.com/<slug>` → 2 nút "Lưu vào danh bạ" (tải vCard) và "Kết bạn Zalo" (mở link cá nhân Zalo).

Dùng chung Supabase project với `hns-crm`/`ketoan` (không phải project riêng). Đọc dữ liệu qua view `bio_cards_public` (xem `../hns-crm/supabase/migrations/migration_bio_cards.sql`) bằng anon key — không cần đăng nhập, không lộ bảng `users` gốc.

## Trước khi chạy

1. Chạy migration `../hns-crm/supabase/migrations/migration_bio_cards.sql` trên Supabase (SQL editor hoặc CLI) — thêm cột `bio_slug`/`phone_display`/`zalo_personal_link` vào `users` và tạo view `bio_cards_public`.
2. Set dữ liệu cho từng nhân viên muốn có card visit điện tử, ví dụ:
   ```sql
   UPDATE users SET bio_slug = 'quoc-lt', phone_display = '0xxxxxxxxx',
     zalo_personal_link = 'https://zalo.me/...'
   WHERE email = 'quoc@hanoisuntravel.com';
   ```
   `zalo_personal_link` lấy từ app Zalo: Cá nhân → Mã QR của tôi → Chia sẻ liên kết (không tự đoán theo số điện thoại).

## Dev

```bash
npm install
npm run dev
```

Mở `http://localhost:3000/<bio_slug>`.
