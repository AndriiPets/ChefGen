import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChefState {
  chef: string;
}

const initialState: ChefState = {
  chef: "top",
};

export const ChefSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {
    changeChef: (state, action: PayloadAction<string>) => {
      state.chef = action.payload;
    },
  },
});

export const { changeChef } = ChefSlice.actions;

export default ChefSlice.reducer;
