"use client";

import { useEffect, useState } from "react";

// Trình duyệt nhúng trong Zalo/Messenger/Instagram... thường chặn tải file
// và chặn mở tab/app ngoài — khiến cả 2 nút trên trang này không phản ứng
// gì dù code đúng.
//
// Android: link intent:// ép được trình duyệt hệ thống (Chrome) mở thẳng,
// vì webview nhúng vẫn giao lại điều hướng intent:// cho OS xử lý.
// iOS: KHÔNG có cách nào tương đương — Apple chặn hẳn việc web tự chuyển
// app trình duyệt, chỉ còn cách khách tự bấm menu "···" của app đang mở.
const IN_APP_MARKERS = ["zalo", "fban", "fbav", "instagram", "line/", "micromessenger"];

export default function InAppBrowserNotice() {
  const [inApp, setInApp] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setInApp(IN_APP_MARKERS.some((m) => ua.includes(m)));
    setIsAndroid(ua.includes("android"));
  }, []);

  if (!inApp) return null;

  function openInChrome() {
    const url = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end`;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API có thể bị chặn trong webview — bỏ qua, khách vẫn
      // đọc được hướng dẫn bên dưới để tự copy link trên thanh địa chỉ.
    }
  }

  return (
    <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-left">
      <p className="text-xs font-semibold text-amber-800">
        Bạn đang mở bằng trình duyệt trong app (Zalo/Messenger...)
      </p>
      <p className="text-xs text-amber-700 mt-1">
        Trình duyệt này thường chặn lưu danh bạ và kết bạn Zalo. Hãy mở trang này bằng Safari/Chrome rồi bấm lại 2 nút bên dưới.
      </p>

      {isAndroid ? (
        <button
          type="button"
          onClick={openInChrome}
          className="mt-2.5 w-full text-center px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
        >
          Mở bằng Chrome
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={copyLink}
            className="mt-2.5 w-full text-center px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
          >
            {copied ? "Đã sao chép link!" : "Sao chép link"}
          </button>
          <p className="text-[11px] text-amber-600 mt-1.5">
            Mở Safari, dán link vào thanh địa chỉ. (iOS không cho web tự chuyển trình duyệt.)
          </p>
        </>
      )}
    </div>
  );
}
