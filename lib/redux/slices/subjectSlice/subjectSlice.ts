import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISubjectState, ISubjectOutputType } from "./model";
import { getAllSubjectThunk } from "./thunks";

const initialState: ISubjectState = {
    data: [],
    loading: false,
    page: 0,
    itemPerPage: 20,
    totalSubject: 0,
};

export const subjectSlice = createSlice({
    name: "subject",
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
            { payload }: PayloadAction<{ data: ISubjectOutputType[]; total: number }>
        ) => {
            state.data = payload.data;
            state.totalSubject = payload.total;
        },
        setClassroomPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        setClassroomItemPerPage: (state, { payload }: PayloadAction<number>) => {
            state.itemPerPage = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSubjectThunk.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.totalSubject = payload.total;
        });
        builder.addCase(getAllSubjectThunk.rejected, (state) => {
            state.data = [];
        });
    },
});