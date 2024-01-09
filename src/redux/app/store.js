import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import addModalReducer from "../features/addModalSlice";
import cartReducer from "../features/cartSlice";
import contactReducer from "../features/contactSlice";
import menuModalReducer from "../features/menuModalSlice";
import modalReducer from "../features/modalSlice";
import productReducer from '../features/productSlice'
import filterReducer from '../features/filterSilce'
import searchReducer from '../features/searchSlice'
import authReducer from '../features/authSlice'
import checkoutReducer from "../features/checkoutSlice";
import addToCartReducer from "../features/addToCartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    addToCart:addToCartReducer,
    modal: modalReducer,
    menuModal: menuModalReducer,
    addModal: addModalReducer,
    contact: contactReducer,
    product:productReducer,
    filter:filterReducer,
    search:searchReducer,
    auth:authReducer,
    checkout:checkoutReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
