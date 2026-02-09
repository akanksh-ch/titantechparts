export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  reviews: Review[];
}

export const mockProduct: Product = {
  id: 1,
  title: "Ultimate Gaming Keyboard",
  description:
    "High-performance keyboard with customizable RGB and mechanical switches.",
  price: 129.99,
  imageUrl: "https://via.placeholder.com/400?text=Product+Image",
  reviews: [
    {
      id: 1,
      name: "Alex",
      rating: 5,
      text: "Amazing keyboard! Worth every penny."
    },
    {
      id: 2,
      name: "Jordan",
      rating: 4,
      text: "Great feel but took a bit to set up."
    }
  ]
};
