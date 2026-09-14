"use client";

import { useEffect, useState } from "react";

// Trình duyệt nhúng trong Zalo/Messenger/Instagram... thường chặn tải file
// và chặn mở tab/app ngoài — khiến cả 2 nút trên trang này không phản ứng
// gì dù code đúng. Không có cách nào bypass từ phía web, chỉ có thể hướng
// khách thoát ra trình duyệt thật (Safari/Chrome).
const IN_APP_MARKERS = ["zalo", "fban", "fbav", "instagram", "line/", "micromessenger"];

export default function InAppBrowserNotice() {
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setInApp(IN_APP_MARKERS.some((m) => ua.includes(m)));
  }, []);

  if (!inApp) return null;

  return (
    <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-left">
      <p className="text-xs font-semibold text-amber-800">
        Bạn đang mở bằng trình duyệt trong app (Zalo/Messenger...)
      </p>
      <p className="text-xs text-amber-700 mt-1">
        Trình duyệt này thường chặn lưu danh bạ và kết bạn Zalo. Bấm nút{" "}
        <strong>⋯</strong> hoặc <strong>chia sẻ</strong> ở góc màn hình, chọn{" "}
        <strong>&quot;Mở bằng trình duyệt khác&quot;</strong> (Safari/Chrome) rồi bấm lại 2 nút bên dưới.
      </p>
    </div>
  );
}
