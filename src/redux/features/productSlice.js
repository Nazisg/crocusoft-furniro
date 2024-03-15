import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://immutable858-001-site1.atempurl.com/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (showProducts) => {
  try {
    const response = await axios.get(`${baseUrl}/UserProduct/Products?ShowMore.Take=${showProducts}`);
    return response.data[0].products;
  } catch (error) {
    throw error;
  }
});
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/UserProduct/getById/ProductPage?Id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    selectedProduct: null,
    showProducts: 8,
    status: "idle",
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setShowProducts: (state, action) => {
      state.showProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //detail
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.product;
export const { setProducts, setShowProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;