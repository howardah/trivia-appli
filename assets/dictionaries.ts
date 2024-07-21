const categoryColors: Record<TriviaCategory, CategoryColor> = {
  "general-knowledge": "rose",
  entertainment: "fuchsia",
  science: "indigo",
  mythology: "purple",
  sports: "lime",
  geography: "emerald",
  history: "brown",
  politics: "red",
  art: "teal",
  celebrities: "amber",
  animals: "orange",
  vehicles: "gray",
};

const categoryIds: Record<TriviaCategory, number[]> = {
  "general-knowledge": [9],
  entertainment: [10, 11, 12, 13, 14, 15, 16, 29, 30, 21, 32],
  science: [17, 18, 19],
  mythology: [20],
  sports: [21],
  geography: [22],
  history: [23],
  politics: [24],
  art: [25],
  celebrities: [26],
  animals: [27],
  vehicles: [28],
};

export { categoryColors, categoryIds };
