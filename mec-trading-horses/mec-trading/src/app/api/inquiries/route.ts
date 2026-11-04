import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const InquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(3).max(5000),
  lookingFor: z.string().trim().max(160).optional(),
  hasTrainer: z.string().optional(),
  viewingDate: z.string().optional(),
  horseId: z.string().optional(),
  locale: z.enum(["en", "fr", "ar", "de", "nl"]).default("en"),
  source: z.string().max(120).optional().default("website")
});

async function notifyByEmail(subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CRM_NOTIFICATION_EMAIL ?? "sales@mechorses.com";
  const from = process.env.RESEND_FROM_EMAIL;
  if (!key || !from) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text: body })
  });
  if (!response.ok) console.error("CRM email notification failed:", await response.text());
  return response.ok;
}

async function notifyByWhatsApp(body: string) {
  const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_CRM_RECIPIENT;
  if (!token || !phoneNumberId || !recipient) return false;
  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: recipient, type: "text", text: { body } })
  });
  if (!response.ok) console.error("CRM WhatsApp notification failed:", await response.text());
  return response.ok;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission", details: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  try {
    const inquiry = await db.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        service: data.service,
        message: data.message,
        lookingFor: data.lookingFor || null,
        hasTrainer: data.hasTrainer ? data.hasTrainer === "yes" : null,
        viewingDate: data.viewingDate ? new Date(data.viewingDate) : null,
        horseId: data.horseId || null,
        locale: data.locale,
        source: data.source,
        status: "NEW"
      },
      select: { id: true, createdAt: true }
    });

    const notification = [
      "New MEC HORSES lead",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Country: ${data.country || "—"}`,
      `Service: ${data.service}`,
      `Horse: ${data.lookingFor || "—"}`,
      `Message: ${data.message}`,
      `Lead ID: ${inquiry.id}`
    ].join("\n");

    // Persistence is the source of truth. Notifications are best-effort and
    // can be activated by adding the provider credentials to deployment env.
    await Promise.allSettled([
      notifyByEmail("New MEC HORSES lead", notification),
      notifyByWhatsApp(notification)
    ]);

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry persistence failed:", error);
    return NextResponse.json({ error: "Could not save inquiry. Please contact MEC HORSES directly." }, { status: 500 });
  }
}
