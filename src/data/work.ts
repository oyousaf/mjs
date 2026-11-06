import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/work/*.jpg", { eager: true });

export function photo(slug: string): ImageMetadata {
  const file = files[`/src/assets/work/${slug}.jpg`];
  if (!file) throw new Error(`No photo called ${slug}`);
  return file.default;
}

export type Category = "cars" | "motorcycles" | "boats" | "furniture";

export const categories: { id: Category; label: string }[] = [
  { id: "cars", label: "Cars and vans" },
  { id: "motorcycles", label: "Motorcycles" },
  { id: "boats", label: "Boats" },
  { id: "furniture", label: "Furniture" },
];

export interface JobPhoto {
  file: string;
  alt: string;
  label?: string;
}

export interface Job {
  id: string;
  title: string;
  note: string;
  category: Category;
  photos: JobPhoto[];
}

// Written from the photos on MJ's current site. Before and after labels and job details need checking with Maz.
export const jobs: Job[] = [
  {
    id: "camper",
    title: "Camper van, all in red",
    note: "One colour carried through the front seats, side seating and rear bench.",
    category: "cars",
    photos: [
      { file: "camper-rear", alt: "Camper van interior with a wide red rear bench and two red front seats beyond it" },
      { file: "camper-side", alt: "Red side bench with a matching bolster cushion inside the camper van" },
      { file: "camper-front", alt: "Red front seats in the camper van, seen from the rear" },
    ],
  },
  {
    id: "subaru",
    title: "Two-tone Subaru seats",
    note: "Blue and cream front seats, panelled to match the car’s paint.",
    category: "cars",
    photos: [{ file: "subaru-seats", alt: "Blue and cream front seats with panelled stitching, seen through the open door of a blue Subaru" }],
  },
  {
    id: "orange",
    title: "Black and orange interior",
    note: "Front seats, rear seat and door cards, with contrast piping throughout.",
    category: "cars",
    photos: [
      { file: "orange-seats", alt: "Black and orange front seats with orange piping and a matching door card" },
      { file: "orange-front", alt: "Black and orange front seat seen through the open door of an orange car" },
      { file: "orange-rear", alt: "Black and orange rear seat with horizontal stitched panels" },
    ],
  },
  {
    id: "hood",
    title: "Vintage Morris Minor hood",
    note: "A new hood made up in the workshop, with its rear window set into the canvas.",
    category: "cars",
    photos: [
      { file: "hood-fitted", alt: "Tan canvas hood with clear windows, fitted to the frame of a vintage car" },
      { file: "hood-finished", alt: "Finished tan hood on a navy vintage car" },
      { file: "hood-side", alt: "The navy vintage car from the side, with the hood folded back" },
    ],
  },
  {
    id: "saloon",
    title: "Vintage saloon interior",
    note: "Navy seats and carpet to suit a car of this age.",
    category: "cars",
    photos: [
      { file: "vintage-saloon", alt: "Navy vintage saloon with an orange upper body, parked on a terraced street" },
      { file: "vintage-interior", alt: "Navy bench seats and dark carpet inside the vintage saloon" },
    ],
  },
  {
    id: "panels",
    title: "Vintage body panels",
    note: "Door panels and bodywork trimmed out on the workshop floor.",
    category: "cars",
    photos: [
      { file: "vintage-doors", alt: "Vintage car doors with new cream trim panels on the workshop floor" },
      { file: "vintage-body", alt: "A vintage car body shell with cream trim panels, in the workshop" },
    ],
  },
  {
    id: "croc-seat",
    title: "Textured motorcycle seat",
    note: "The seat base and foam, then the finished textured cover.",
    category: "motorcycles",
    photos: [
      { file: "motorcycle-seat-covered", alt: "Motorcycle seat covered in tan textured material, on the workbench", label: "Finished" },
      { file: "motorcycle-seat-base", alt: "The same motorcycle seat base wrapped in foam and plastic before covering", label: "In progress" },
    ],
  },
  {
    id: "yellow-seat",
    title: "Black and yellow motorcycle seat",
    note: "A bold two-colour cover, cut and stitched on the bench.",
    category: "motorcycles",
    photos: [{ file: "motorcycle-seat-yellow", alt: "Motorcycle seat with a black and yellow cover on a workbench beside a pair of shears" }],
  },
  {
    id: "boat",
    title: "Boat cabin seating",
    note: "White seating with navy stripes, from the helm through to the cabin.",
    category: "boats",
    photos: [
      { file: "boat-helm", alt: "White helm seat with navy stripes beside a boat’s steering wheel" },
      { file: "boat-bench", alt: "Long white cabin bench with navy stripes" },
      { file: "boat-cabin", alt: "Boat cabin with white seating running along one side" },
    ],
  },
  {
    id: "canopy",
    title: "Boat canopy",
    note: "A blue canopy with clear windows, made to fit the cockpit.",
    category: "boats",
    photos: [{ file: "boat-canopy", alt: "Blue canopy with three clear windows on a narrow boat, moored on a river" }],
  },
  {
    id: "sofa",
    title: "Two-seat sofa",
    note: "From a faded floral to velvet-look stripes, on the same frame.",
    category: "furniture",
    photos: [
      { file: "sofa-after", alt: "Two-seat sofa re-covered in crimson and black stripes", label: "After" },
      { file: "sofa-before", alt: "The same sofa before, in a beige floral fabric", label: "Before" },
    ],
  },
  {
    id: "armchair",
    title: "Carved armchair",
    note: "The carved frame kept, and the seat and back re-covered in pale fabric.",
    category: "furniture",
    photos: [
      { file: "armchair-after", alt: "Ornate carved armchair in pale fabric with a matching cushion and tassels", label: "After" },
      { file: "armchair-before", alt: "The same style of armchair before, in a floral brocade", label: "Before" },
    ],
  },
  {
    id: "chaise",
    title: "Chaise longue",
    note: "Rebuilt from the bare frame and springs, then finished in deep-buttoned red.",
    category: "furniture",
    photos: [
      { file: "chaise-finished", alt: "Red chaise longue with a buttoned back and a bolster cushion", label: "Finished" },
      { file: "chaise-frame", alt: "The chaise longue’s bare wooden frame and webbing", label: "Bare frame" },
    ],
  },
  {
    id: "headboard",
    title: "Checkerboard headboard",
    note: "A plain headboard re-covered in panels of magenta and grey, with buttons.",
    category: "furniture",
    photos: [
      { file: "headboard-after", alt: "Headboard covered in a buttoned magenta and grey checkerboard", label: "After" },
      { file: "headboard-before", alt: "The same headboard before, in plain dark grey", label: "Before" },
    ],
  },
  {
    id: "banquette",
    title: "Kitchen banquette",
    note: "Deep-buttoned backs and a fitted seat, wrapping around a dining corner.",
    category: "furniture",
    photos: [
      { file: "banquette-corner", alt: "Charcoal deep-buttoned banquette built into grey kitchen cabinets" },
      { file: "banquette-kitchen", alt: "The banquette wrapping around a dining table in a kitchen" },
    ],
  },
  {
    id: "bedroom",
    title: "Quilted bedroom suite",
    note: "A diamond-quilted headboard and matching pieces for a whole room.",
    category: "furniture",
    photos: [
      { file: "bedroom-suite", alt: "Opulent bedroom with a quilted headboard and a matching ottoman" },
      { file: "bedroom-headboard", alt: "Close view of diamond-quilted burgundy upholstery with a button" },
    ],
  },
  {
    id: "floral-suite",
    title: "Three-seat floral sofa",
    note: "A full re-cover, with the pattern lined up across the cushions.",
    category: "furniture",
    photos: [
      { file: "floral-sofa", alt: "Three-seat sofa in a pale floral fabric, on trestles in the workshop" },
      { file: "sofa-arm-detail", alt: "Close view of the pleating on a cream sofa arm" },
    ],
  },
  {
    id: "red-sofa",
    title: "Red two-seater",
    note: "A traditional sofa finished with piping and a full skirt.",
    category: "furniture",
    photos: [{ file: "red-sofa", alt: "Red two-seat sofa with piped edges and a skirted base" }],
  },
  {
    id: "dining",
    title: "Dining chairs",
    note: "Re-covered in cream and teal, next to one of the originals.",
    category: "furniture",
    photos: [{ file: "dining-chairs", alt: "Three dining chairs side by side: cream, an original with a wooden back, and teal" }],
  },
];

export const job = (id: string): Job => {
  const found = jobs.find((j) => j.id === id);
  if (!found) throw new Error(`No job called ${id}`);
  return found;
};
