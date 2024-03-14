import { createSlice } from "@reduxjs/toolkit";

const addModalSlice = createSlice({
  name: "addModal",
  initialState: {
    isOpenAddModal: false,
    product: {},
  },
  reducers: {
    openAddModal: (state, action) => {
      state.isOpenAddModal = true;
      state.product = action.payload;
    },
    closeAddModal: (state) => {
      state.isOpenAddModal = false;
      state.product = {};
    },
  },
});

export const { openAddModal, closeAddModal } = addModalSlice.actions;
export const selectIsModalOpen = (state) => state.addModal.isOpenAddModal;
export default addModalSlice.reducer;
