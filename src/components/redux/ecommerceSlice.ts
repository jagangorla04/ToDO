import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../EcommerceHome";

export interface CartItem extends Product {
  quantity: number;
}

export interface EcommerceState {
  data: Product[];
  cart: CartItem[];
  status: boolean;
  favorites: CartItem[];
}

const initialState: EcommerceState = {
  data: [],
  cart: [],
  favorites: [],
  status: false,
};

export const fetchProductData = createAsyncThunk(
  "ecommerce/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

export const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex((p) => p.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          quantity: state.cart[itemIndex].quantity + 1,
        };
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((p) => p.id !== action.payload);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },

    addToFavorites: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favorites.push({ ...action.payload, quantity: 1 });
      }
    },

    //incrementFavoriteQuantity: (state, action: PayloadAction<number>) => {
    //  const item = state.favorites.find((p) => p.id === action.payload);
    //  if (item) {
    //    item.quantity += 1;
    //  }
    //},

    //decrementFavoriteQuantity: (state, action: PayloadAction<number>) => {
    //  const item = state.favorites.find((p) => p.id === action.payload);
    //  if (item) {
    //    if (item.quantity > 1) {
    //      item.quantity -= 1;
    //    } else {
    //      state.favorites = state.favorites.filter(
    //        (p) => p.id !== action.payload
    //      );
    //    }
    //  }
    //},

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.pending, (state) => {
      state.status = true;
    });
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = false;
    });
    builder.addCase(fetchProductData.rejected, (state, action) => {
      console.error("Error fetching data:", action.payload);
      state.status = false;
    });
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  addToFavorites,
  //incrementFavoriteQuantity,
  //decrementFavoriteQuantity,
  removeFromWishlist,
  clearCart,
} = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
