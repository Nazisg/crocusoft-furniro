import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://immutable858-001-site1.atempurl.com/api";

export const fetchCategory = createAsyncThunk(
  "filter/fetchCategory",
  async () => {
    const response = await axios.get(`${baseUrl}/Category/getAll`);
    return response.data;
  }
);
export const fetchTags = createAsyncThunk("filter/fetchTags", async () => {
  const response = await axios.get(`${baseUrl}/Tag/getAll`);
  return response.data;
});

export const fetchSizes = createAsyncThunk("filter/fetchSizes", async () => {
  const response = await axios.get(`${baseUrl}/Size/getAll`);
  return response.data;
});

export const fetchColors = createAsyncThunk("filter/fetchColors", async () => {
  const response = await axios.get(`${baseUrl}/Color/getAll`);
  return response.data;
});
export const getFilterProducts = createAsyncThunk(
  "filter/getFilterProducts",
  async ({
    take,
    page,
    categoryName,
    isNew,
    productTags,
    productSizes,
    productColors,
    minPrice,
    maxPrice,
    orderBy,
  }) => {
    const response = await axios.get(
      `${baseUrl}/UserProduct/Products?Page=${page}${
        take > 0 ? `&ShowMore.TakeProduct=${take}` : ""
      }${
        categoryName.length > 0
          ? categoryName?.map((item) => `&CategoryNames=${item.value}`).join()
          : ""
      }${
        productTags.length > 0
          ? productTags?.map((item) => `&ProductTags=${item.value}`).join()
          : ""
      }${
        productSizes.length > 0
          ? productSizes?.map((item) => `&ProductSizes=${item.value}`).join()
          : ""
      }${
        productColors.length > 0
          ? productColors?.map((item) => `&ProductColors=${item.value.replace(/^#/, '%23')}`).join()
          : ""
      }${
        minPrice > 0 ? `&MinPrice=${minPrice}` : ""
      }${
        maxPrice > 0 ? `&MaxPrice=${maxPrice}` : ""
      }${
        typeof isNew === Boolean ? `&IsNew=${isNew}` : ""
      }${
        orderBy !== "select" ? `&OrderBy=${orderBy}` : ""
      }
      `
    );
    return response.data;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [],
    tags: [],
    sizes: [],
    colors: [],
    status: "idle",
    error: null,
    filterProducts: [],
    totalProductsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //categories
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //tags
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
      })
      //sizes
      .addCase(fetchSizes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizes = action.payload;
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //colors
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //getProducts
      .addCase(getFilterProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilterProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filterProducts = action.payload?.[0].products;
        state.totalProductsCount = action.payload?.[0].totalProductCount;
      })
      .addCase(getFilterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default filterSlice.reducer;
