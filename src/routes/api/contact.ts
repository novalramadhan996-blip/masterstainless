import { createFileRoute } from "@tanstack/react-router";

const RECIPIENT = "ramadhannoval924@gmail.com";
const FROM = "Master Stainless Website <noreply@masterstainless.online>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as ContactPayload;

          if (text(body.website, 200)) return Response.json({ success: true });

          const name = text(body.name, 100);
          const email = text(body.email, 254);
          const phone = text(body.phone, 50);
          const company = text(body.company, 150);
          const subject = text(body.subject, 200) || "Permintaan penawaran dari website";
          const message = text(body.message, 5000);

          if (!name || !message || !email) {
            return Response.json({ success: false, message: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ success: false, message: "Format email tidak valid." }, { status: 400 });
          }

          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            console.error("RESEND_API_KEY is not configured.");
            return Response.json({ success: false, message: "Layanan email belum dikonfigurasi." }, { status: 500 });
          }

          const html = `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
              <h2>Pesan Baru dari Website Master Stainless</h2>
              <p><strong>Nama:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telepon:</strong> ${phone || "-"}</p>
              <p><strong>Perusahaan:</strong> ${company || "-"}</p>
              <p><strong>Subjek:</strong> ${subject}</p>
              <hr>
              <p><strong>Pesan:</strong></p>
              <p style="white-space:pre-wrap">${message}</p>
            </div>
          `;

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: FROM,
              to: [RECIPIENT],
              reply_to: email,
              subject: `[Website] ${subject}`,
              html,
            }),
          });

          if (!resendResponse.ok) {
            console.error("Resend API error:", resendResponse.status, await resendResponse.text());
            return Response.json({ success: false, message: "Pesan gagal dikirim. Silakan coba lagi." }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (error) {
          console.error("Contact API error:", error);
          return Response.json({ success: false, message: "Terjadi kesalahan saat mengirim pesan." }, { status: 500 });
        }
      },
    },
  },
});
