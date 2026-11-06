// Rules for /api/quote. The form's HTML attributes mirror these, so people see the same limits with no JavaScript.

export const JOB_TYPES = [
  "Car or van interior",
  "Convertible hood",
  "Motorcycle seat",
  "Boat",
  "Furniture",
  "Bespoke chair",
  "Commercial seating",
  "Something else",
] as const;

export const MAX_PHOTOS = 3;
// Vercel rejects request bodies over 4.5 MB, so the browser shrinks photos to fit inside this.
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  jobType: string;
  details: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,30}$/;

export function readQuote(form: FormData): { quote: QuoteRequest; photos: File[]; valid: boolean } {
  const text = (key: string) => String(form.get(key) ?? "").trim();
  const jobType = text("jobType");
  const quote: QuoteRequest = {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    jobType: (JOB_TYPES as readonly string[]).includes(jobType) ? jobType : "Something else",
    details: text("details"),
  };

  const photos = form.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);
  const photoBytes = photos.reduce((sum, p) => sum + p.size, 0);

  const valid =
    quote.name.length > 0 &&
    quote.name.length <= 100 &&
    EMAIL.test(quote.email) &&
    quote.email.length <= 200 &&
    (!quote.phone || PHONE.test(quote.phone)) &&
    quote.details.length >= 10 &&
    quote.details.length <= 3000 &&
    photos.length <= MAX_PHOTOS &&
    photoBytes <= MAX_PHOTO_BYTES &&
    photos.every((p) => PHOTO_TYPES.includes(p.type));

  return { quote, photos, valid };
}
