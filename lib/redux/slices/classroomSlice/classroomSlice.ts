import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClassroomOutputType, IClassroomState } from "./model";
import { getAllClassroomThunk } from "./thunks";

const initialState: IClassroomState = {
    data: [],
    loading: false,
    page: 0,
    itemPerPage: 20,
    totalClassroom: 0,
};

export const classroomSlice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        onAppLoading: (state) => {
            state.loading = true;
        },
        offAppLoading: (state) => {
            state.loading = false;
        },
        setClassroom: (
            state,
            { payload }: PayloadAction<{ data: ClassroomOutputType[]; total: number }>
        ) => {
            state.data = payload.data;
            state.totalClassroom = payload.total;
        },
        setClassroomPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        setClassroomItemPerPage: (state, { payload }: PayloadAction<number>) => {
            state.itemPerPage = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllClassroomThunk.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.totalClassroom = payload.total;
        });
        builder.addCase(getAllClassroomThunk.rejected, (state) => {
            state.data = [];
        });
    },
});