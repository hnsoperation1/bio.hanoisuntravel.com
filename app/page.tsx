export default function Home() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20"
      style={{ background: "linear-gradient(135deg, #031c29 0%, #0e4a6e 50%, #1a7a9e 100%)" }}
    >
      <p className="text-white/70 font-medium">Hanoi Sun Travel</p>
      <h1 className="text-2xl font-bold text-white mt-2">Trang danh thiếp điện tử</h1>
      <p className="text-white/50 text-sm mt-4 max-w-xs">
        Quét mã QR trên card visit của nhân viên để mở đúng danh thiếp của người đó.
      </p>
      <a
        href="https://hanoisuntravel.com"
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-105"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
      >
        Về hanoisuntravel.com
      </a>
    </div>
  );
}
