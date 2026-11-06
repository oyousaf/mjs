// From MJ's current reviews page. Spelling and punctuation tidied, wording unchanged.
export interface Review {
  id: string;
  quote: string;
  name: string;
  year?: number;
  about: string;
}

export const reviews: Review[] = [
  {
    id: "dean",
    quote:
      "Huge thank you for transforming my Victory Vision seat. Brilliant service and superb job done at the drop of a hat. Took the bike to Yorkshire Friday afternoon. By Saturday it was on Facebook with the tag by someone else saying ‘me sitting on the most photographed motorbike in the Dales’. Everyone was admiring it.",
    name: "Dean Chrisp",
    year: 2015,
    about: "Motorcycle seat",
  },
  {
    id: "robert",
    quote:
      "Once again truly delighted with your work. This is now the third job you have undertaken for us. The first was to make some custom and waterproof cushions for our outdoor furniture. They look and are fantastic. Then you reupholstered our 20 plus year old leather suite. We were blown away with the quality of your work and actually a reasonable price. Finally, you have just made a footstool for us to match the suite (four years after the reupholstery work). The job was super quick and we are delighted with the result. No hesitation in recommending you whatsoever.",
    name: "Robert Prichard",
    year: 2015,
    about: "Cushions, suite and footstool",
  },
  {
    id: "steve",
    quote:
      "I had my Toyota Supra seats done by Maz in October. They were superb. He is a nice friendly guy. Able to contact him out of hours. Picked up my seats late one night, as I had to work late. Highly recommended.",
    name: "Steve W",
    year: 2014,
    about: "Toyota Supra seats",
  },
  {
    id: "noel",
    quote:
      "On behalf of the parish, I should like to take this opportunity to thank you for the way you have refurbished the kneelers and for your co-operation in enabling us to always have a full complement of them for our weekend service. Personally, it has been a great pleasure in dealing with you.",
    name: "Noel O.",
    year: 2014,
    about: "Church kneelers",
  },
  {
    id: "sue",
    quote: "Excellent work Maz, you sure are good at what you do.",
    name: "Sue Nicholson",
    year: 2015,
    about: "Five-star review",
  },
  {
    id: "sarah",
    quote:
      "Used him a year ago and highly impressed. Friendly, fast, low prices, knows what he’s doing, and LISTENS to the customer! I couldn’t have asked for better service! Will be going back this week to start a new job.",
    name: "Sarah M",
    year: 2008,
    about: "Repeat customer",
  },
];

export const review = (id: string): Review => {
  const found = reviews.find((r) => r.id === id);
  if (!found) throw new Error(`No review called ${id}`);
  return found;
};
