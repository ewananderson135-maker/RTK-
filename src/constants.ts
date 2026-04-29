export const SERVICES = {
  waxing: {
    separate: [
      { name: "Eyebrows", price: 15 },
      { name: "Upper Lip", price: 10 },
      { name: "Chin", price: 10 },
      { name: "Underarm", price: 25 },
      { name: "Half Leg", price: 35 },
      { name: "Half Arm", price: 25 },
      { name: "Full Arm", price: 40 },
      { name: "Full Leg", price: 50 },
      { name: "Stomach", price: 30 },
      { name: "Back/Shoulders", price: 50 },
    ],
    combos: [
      { name: "Upper Lip, Chin & Eyebrows", price: 32 },
      { name: "Chin & Upper Lip", price: 15 },
    ],
    special: {
      name: "That Girl Combo",
      price: 53,
      description: "Essential Skin Refresher Facial + LED Light Therapy + Choice of Upper Lip or Chin wax",
    }
  },
  facials: [
    {
      name: "Essential Skin Refresher",
      price: 40,
      description: "cleansing (x2), exfoliation, hot steam extractions, high frequency, customized mask, toner & moisturizer",
    },
    {
      name: "Flawless Finish",
      price: 55,
      description: "cleansing (x2), exfoliation, hot steam, facial extractions, high frequency, customized mask, toner & moisturizer with a facial, neck and shoulder massage",
    }
  ],
  addOns: [
    { name: "Dermaplaning hair removal", price: 20 },
    { name: "LED light therapy", price: 10, recommended: true },
    { name: "Complimentary add-on's during facial", price: 5 },
  ]
};

export const CONTACT = {
  address: "127 Ryland St, Nepean, ON K2J 6R1",
  phone: "(514) 962-2594",
  hours: "Open · Closes 10 p.m.",
  instagram: "@rtk.aesthetics", // Assuming based on name and DM mention
};
