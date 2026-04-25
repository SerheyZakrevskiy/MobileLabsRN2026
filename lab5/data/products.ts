import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15",
    price: 1200,
    image: require("../assets/products/iphone.jpg"),
    description:
      "Смартфон Apple iPhone 15 з якісним дисплеєм, сучасною камерою та високою продуктивністю.",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    price: 1000,
    image: require("../assets/products/samsung.png"),
    description:
      "Флагманський смартфон Samsung Galaxy S23 з AMOLED-дисплеєм, потужним процесором та якісною камерою.",
  },
];
