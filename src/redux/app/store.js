import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import addModalReducer from "../features/addModalSlice";
import addToCartReducer from "../features/addToCartSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import contactReducer from "../features/contactSlice";
import filterReducer from "../features/filterSilce";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import menuModalReducer from "../features/menuModalSlice";
import modalReducer from "../features/modalSlice";
import productReducer from "../features/productSlice";
import searchReducer from "../features/searchSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    addToCart: addToCartReducer,
    modal: modalReducer,
    menuModal: menuModalReducer,
    addModal: addModalReducer,
    contact: contactReducer,
    product: productReducer,
    filter: filterReducer,
    search: searchReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    forgotPassword: forgotPasswordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
