import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LangState {
  lang: string;
}

const initialState: LangState = {
  lang: "en",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
