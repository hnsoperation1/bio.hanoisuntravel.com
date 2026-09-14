import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBioCard } from "@/lib/bio-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = await getBioCard(slug);
  if (!card) return { title: "Không tìm thấy danh thiếp" };
  return { title: `${card.full_name} — Hanoi Sun Travel` };
}

export default async function BioCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = await getBioCard(slug);
  if (!card) notFound();

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(135deg, #031c29 0%, #0e4a6e 50%, #1a7a9e 100%)" }}
    >
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl p-8 text-center">
        {card.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.avatar_url}
            alt={card.full_name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: "linear-gradient(135deg, #ef5e2f, #f5813d)" }}
          >
            {card.full_name.charAt(0).toUpperCase()}
          </div>
        )}

        <h1 className="text-xl font-bold text-gray-900">{card.full_name}</h1>
        {card.job_title && <p className="text-sm text-gray-500 mt-1">{card.job_title}</p>}
        <p className="text-xs text-gray-400 mt-1">Hanoi Sun Travel</p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={`/${card.bio_slug}/vcard`}
            className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ef5e2f, #f5813d)", boxShadow: "0 4px 20px rgba(239,94,47,0.35)" }}
          >
            Lưu vào danh bạ
          </a>

          {card.zalo_personal_link && /^https?:\/\//.test(card.zalo_personal_link) && (
            <a
              href={card.zalo_personal_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0068ff, #0891f5)", boxShadow: "0 4px 20px rgba(0,104,255,0.35)" }}
            >
              Kết bạn Zalo
            </a>
          )}
        </div>

        {card.phone_display && (
          <a href={`tel:${card.phone_display}`} className="block mt-6 text-sm text-gray-400 hover:text-gray-600">
            {card.phone_display}
          </a>
        )}
      </div>
    </div>
  );
}
