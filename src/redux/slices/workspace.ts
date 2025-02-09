import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type intialStateProp = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const intialState: intialStateProp = {
  workspaces: [],
};

export const WorkSpaces = createSlice({
  name: "workspace",
  intialState: intialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<intialStateProp>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = WorkSpaces.actions;
export default WorkSpaces.reducer;
