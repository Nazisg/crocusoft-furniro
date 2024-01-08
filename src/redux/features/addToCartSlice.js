import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/addToCart", async (product) => {
  try {
    const response = await axios.post(
      "http://immutable858-001-site1.atempurl.com/api/Cart/addToCart",
      product
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getAllCartItems = createAsyncThunk(
    "cart/getAllCartItems",
    async (userId) => {
    try {
      const response = await axios.get(
        `http://immutable858-001-site1.atempurl.com/api/Cart/getAllCartItems/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItem = createAsyncThunk(
    'cart/deleteItem',
    async (deletebody, { rejectWithValue }) => {
      try {
        await axios.delete(`http://immutable858-001-site1.atempurl.com/api/Cart/remove`, {
          data: deletebody
        });
      } catch (error) {
        console.error('Error deleting item:', error.message);
        return rejectWithValue(error.message); 
      }
    }
  );

const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    items: [],
    item:{},
    favorites: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
      })
      //getCartItems
      .addCase(getAllCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.status = "failed";
      })
       //delete Item
       .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.items = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default cartSlice.reducer;
