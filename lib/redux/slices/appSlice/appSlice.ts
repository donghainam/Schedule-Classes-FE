import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./model";

const initialState: AppState = {
    loading: false,
    nextPath: "",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        onAppLoading: (state) => {
            state.loading = true;
        },
        offAppLoading: (state) => {
            state.loading = false;
        },
        onIsShowPrompt: (state, { payload }: PayloadAction<string>) => {
            state.nextPath = payload;
        },
    },
    extraReducers: (builder) => {
    },
});