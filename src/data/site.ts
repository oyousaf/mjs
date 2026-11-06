// Every fact here comes from MJ's current website. Confirm with Maz before launch.
export const site = {
  name: "MJ’s Upholstery",
  trade: "Upholsterers and coachtrimmers",
  experience: "Over 45 years of experience",
  street: "3 Alexa Court, Aston Road",
  town: "Bedford",
  postcode: "MK42 0LW",
  phone: "01234 359977",
  phoneHref: "tel:+441234359977",
  mobile: "07798 563778",
  mobileHref: "tel:+447798563778",
  email: "maz@mjs-upholstery.co.uk",
  emailHref: "mailto:maz@mjs-upholstery.co.uk",
  hours: "Monday to Thursday, 9am to 5pm",
  directions: "https://www.google.com/maps/search/?api=1&query=3+Alexa+Court+Aston+Road+Bedford+MK42+0LW",
  facebook: "https://www.facebook.com/mjsupholstery.bedford",
  googleReviews: "https://www.google.com/search?q=MJ%60s%20Upholstery&ludocid=14218840721107280024#lrd=0x0:0xc553784d1b756098,1",
} as const;

export type Tone = "oxblood" | "bottle" | "hide" | "stud" | "hood" | "panel" | "paper" | "page";

// Literal class names, so Tailwind can see them.
export const tones: Record<Tone, string> = {
  oxblood: "bg-oxblood page-dark",
  bottle: "bg-bottle page-dark",
  hide: "bg-hide page-dark",
  stud: "bg-stud page-dark",
  hood: "bg-hood page-dark",
  panel: "scheme-dark bg-panel text-ink",
  paper: "scheme-light bg-page text-ink",
  page: "bg-page text-ink",
};

// The sample book's index tabs. Each tab shares its colour with the page it opens.
export const tabs: { href: string; label: string; tone: Tone }[] = [
  { href: "/automotive", label: "Automotive", tone: "oxblood" },
  { href: "/furniture", label: "Furniture", tone: "bottle" },
  { href: "/commercial", label: "Commercial", tone: "hide" },
  { href: "/bespoke-conversion", label: "Bespoke chairs", tone: "stud" },
  { href: "/gallery", label: "Gallery", tone: "panel" },
  { href: "/reviews", label: "Reviews", tone: "panel" },
  { href: "/contact", label: "Contact", tone: "paper" },
];
