import { createSlice } from '@reduxjs/toolkit';

const menuModalSlice = createSlice({
  name: 'menuModal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModalMenu: (state) => {
      state.isOpen = true;
    },
    closeModalMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalMenu, closeModalMenu } = menuModalSlice.actions;
export const selectIsModalOpenMenu = (state) => state.modal.isOpenMenu;
export default menuModalSlice.reducer;

