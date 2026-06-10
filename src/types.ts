export interface Speaker {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  location: string;
  price: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}
