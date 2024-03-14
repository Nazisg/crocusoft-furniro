import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    try {
      const token = getJwtToken();
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(`${baseUrl}/Cart/addToCart`, product, {
        headers,
      });
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async (userId, thunkAPI) => {
    try {
      const token = getJwtToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${baseUrl}/Cart/getAllCartItems/${userId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (deletebody, { rejectWithValue, getState }) => {
    try {
      const token = getJwtToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${baseUrl}/Cart/remove`, {
        headers,
        data: deletebody,
      });
    } catch (error) {
      console.error("Error deleting item:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "addToCart",
  initialState: {
    items: [],
    item: {},
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
