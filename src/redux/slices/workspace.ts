import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type intialStateProp = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: intialStateProp = {
  workspaces: [],
};

export const WorkSpaces = createSlice({
  name: "workspace",
  initialState: initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<intialStateProp>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = WorkSpaces.actions;
export default WorkSpaces.reducer;
