import { BasketItem } from "../page/Dashboard/store/BasketSlice";

export interface IAddCount {
  id: string;
  categoryName: string;
  name: string;
  count: number;
  unitPrice?: number;
  imageUrl: string;
}

export interface IAddPackageCount {
  id: string;
  image: string;
  name: string;
  description: string;
  discountPrice: number;
  actualPrice: number;
}

export interface IProductData {
  id: string;
  categoryName: string;
  name: string;
  unitPrice?: number;
  imageUrl: string;
}

export interface IBasketState {
  items?: BasketItem[];
  calculatedValue?: number;
}

export interface IAddQty {
  id: string;
  categoryName: string;
  name: string;
  count: number;
  unitPrice?: number;
  imageUrl: string;
}
