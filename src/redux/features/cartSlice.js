import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + parseFloat(item.price), 0);
};

export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  try {
    const response = await axios.post('https://immutable858-001-site1.atempurl.com/api/Cart/addToCart', product);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

export const UserData = createAsyncThunk("user/UserData", async (userId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/ApplicationUser/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    favorites: [],
    subtotal: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: 1,
      };
      state.items.push(newItem);
      state.subtotal = calculateSubtotal(state.items);
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";     });
    }
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removefromCart,
  addToFavorites,
  removeFromFavorites,
} = cartSlice.actions;
export default cartSlice.reducer;
