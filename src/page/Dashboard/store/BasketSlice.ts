import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddCount, IProductData } from "../../../core/property.interface";

export interface BasketItem extends IProductData {
  count: number;
}

export interface BasketState {
  items: BasketItem[];
  calculatedValue?: number;
}

const initialState: BasketState = {
  items: [],
  calculatedValue: 0,
};

const saveToLocalStorage = (state: BasketState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("basketState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = (): BasketState => {
  try {
    const serializedState = localStorage.getItem("basketState");
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return initialState;
  } catch (e) {
    console.error("Could not load state", e);
    return initialState;
  }
};

export const basket = createSlice({
  name: "basket",
  initialState: loadFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      let temItem = { ...action.payload };
      const findItem = state.items.find((element) => element.id === temItem.id);
      if (findItem) {
        const existingItem = state.items.map((item) => {
          if (item.id === temItem.id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        state.items = existingItem;
      } else {
        state.items.push(temItem);
      }
      saveToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItemIndex = state.items.findIndex(
        (element) => element.id === action.payload
      );
      if (findItemIndex > -1) {
        state.items.splice(findItemIndex, 1);
        saveToLocalStorage(state);
      }
    },
    removeBasket: (state) => {
      state = { ...initialState };
      return state;
    },
    updateProductCount: (state, action: PayloadAction<IAddCount>) => {
      const { id, count } = action.payload;
      const findItemIndex = state.items.findIndex(
        (element) => element.id === id
      );
      state.items[findItemIndex].count = count;
      saveToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, removeBasket, updateProductCount } =
  basket.actions;

export const BasketReducer = basket.reducer;

export { initialState as BasketInitialState };
