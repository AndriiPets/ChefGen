export interface Recepie {
  directions: [string];
  image: string;
  ingredients: [string];
  title: string;
}

export interface RecepieContent {
  recepie: string;
  index: number;
  type: string;
}
