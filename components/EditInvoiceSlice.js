import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  claimNo: null, // Ensure this is initialized correctly
  searchByHeader: false,
  searchID: "",
  collapsed: false,
};

export const editSlice = createSlice({
  name: "editCase",
  initialState,
  reducers: {
    editCaseActive: (state) => {
      state.value = true;
    },
    editCaseDeactive: (state) => {
      state.value = false;
    },
    setClaimNumber: (state, action) => {
      state.claimNo = action.payload;
    },

    removeClaimNumber: (state) => {
      state.claimNo = null;
    },
    addClaimNumber: (state, action) => {
      state.claimNo = action.payload;
    },
    setSearchID: (state, action) => {
      state.searchID = action.payload;
    },
    deleteSearchID: (state, action) => {
      state.searchID = "";
    },
    HeaderSearchActive: (state, action) => {
      state.searchByHeader = true;
    },
    HeaderSearchDeactive: (state, action) => {
      state.searchByHeader = false;
    },
    collapsedActive: (state, action) => {
      state.collapsed = true;
    },
    collapsedDeactive: (state, action) => {
      state.collapsed = false;
    },
  },
});

export const {
  editCaseActive,
  editCaseDeactive,
  setClaimNumber,
  deleteSearchID,
  addClaimNumber,
  setSearchID,
  removeClaimNumber,
  HeaderSearchActive,
  HeaderSearchDeactive,
  collapsedActive,
  collapsedDeactive,
} = editSlice.actions;
export default editSlice.reducer;
