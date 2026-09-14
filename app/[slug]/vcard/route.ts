import { NextResponse } from "next/server";
import { getBioCard } from "@/lib/bio-card";

function escapeVCardText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const card = await getBioCard(slug);
  if (!card) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${escapeVCardText(card.full_name)};;;`,
    `FN:${escapeVCardText(card.full_name)}`,
    "ORG:Hanoi Sun Travel",
  ];
  if (card.job_title) lines.push(`TITLE:${escapeVCardText(card.job_title)}`);
  if (card.phone_display) lines.push(`TEL;TYPE=CELL:${card.phone_display}`);
  lines.push("END:VCARD");

  const vcf = lines.join("\r\n");
  const filename = encodeURIComponent(`${card.full_name}.vcf`);

  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact.vcf"; filename*=UTF-8''${filename}`,
    },
  });
}
