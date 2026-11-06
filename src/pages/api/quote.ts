import type { APIRoute } from "astro";
import { PUBLIC_PREVIEW } from "astro:env/client";
import { CONTACT_FROM, CONTACT_TO, RESEND_API_KEY } from "astro:env/server";
import { readQuote } from "@/lib/quote";

export const prerender = false;

const MIN_SECONDS_TO_FILL = 3;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function isSpam(form: FormData, details: string): boolean {
  if (String(form.get("company") ?? "") !== "") return true;
  // Set by script, so it's only checked when present. The form works without JavaScript.
  const started = Number(form.get("started") ?? 0);
  if (started && (Date.now() - started) / 1000 < MIN_SECONDS_TO_FILL) return true;
  return (details.match(/https?:\/\/|www\./gi)?.length ?? 0) > 2;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const problem = () => redirect("/contact/problem", 303);
  const thanks = () => redirect("/contact/thanks", 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return problem();
  }

  const { quote, photos, valid } = readQuote(form);
  if (!valid) return problem();

  // Bots see the same result as everyone else.
  if (isSpam(form, quote.details)) return thanks();

  // Nothing reaches MJ's until they've signed off the site.
  if (PUBLIC_PREVIEW) return thanks();

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return problem();

  const rows: [string, string][] = [
    ["Name", quote.name],
    ["Email", quote.email],
    ["Phone", quote.phone || "Not given"],
    ["Job", quote.jobType],
  ];

  const attachments = await Promise.all(
    photos.map(async (p, i) => ({
      filename: `photo-${i + 1}.${p.type.split("/")[1]}`,
      content: Buffer.from(await p.arrayBuffer()),
    })),
  );

  const { Resend } = await import("resend");
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: quote.email,
    subject: `Quote request: ${quote.jobType} (${quote.name})`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${quote.details}`,
    html: `<table>${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${escapeHtml(quote.details)}</p>`,
    attachments,
  });

  if (error) {
    console.error("[quote] Resend error", error);
    return problem();
  }

  return thanks();
};
