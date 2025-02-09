import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type intialStateProp = {
  folders: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

const intialState: intialStateProp = {
  folders: [],
};

export const Folders = createSlice({
  name: "folder",
  intialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<intialStateProp>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = Folders.actions;
export default Folders.reducer;
