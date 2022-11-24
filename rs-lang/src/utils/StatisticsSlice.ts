import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStats } from "../interfaces/app";
import { defaultOptionalStats } from "./Statistics";

export const initialState: UserStats = {
  optional: { ...defaultOptionalStats },
  learnedWords: 0,
};

export const statSlice = createSlice({
  name: "userStats",
  initialState,
  reducers: {
    updateUserStats: (state, action: PayloadAction<UserStats>) => {
      const { learnedWords, optional } = action.payload;
      state.learnedWords = learnedWords;
      state.optional = optional;
    },
  },
});

export const { updateUserStats } = statSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

export default statSlice.reducer;
