const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface BioCard {
  bio_slug: string;
  full_name: string;
  job_title: string | null;
  phone_display: string | null;
  zalo_personal_link: string | null;
  avatar_url: string | null;
}

// Đọc từ view public "bio_cards_public" (xem migration_bio_cards.sql bên
// hns-crm) — view này chỉ lộ đúng vài cột an toàn, KHÔNG phải bảng users
// gốc, nên anon key gọi thẳng được mà không cần RLS riêng trên users.
export async function getBioCard(slug: string): Promise<BioCard | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/bio_cards_public?bio_slug=eq.${encodeURIComponent(slug)}&limit=1`,
    {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as BioCard[];
  return rows[0] ?? null;
}
