import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationRequest } from "../appSlice/model";
import { ReduxState } from "../../store";
import { ISubjectOutputType } from "./model";
import { getSubject } from "./api";

export const getAllSubjectThunk = createAsyncThunk<
    // Return type of the payload creator
    { data: ISubjectOutputType[]; total: number },
    // First argument to the payload creator
    PaginationRequest,
    {
        // Optional fields for defining thunkApi field types
        state: ReduxState;
    }
>("getClasses", async (req: PaginationRequest, thunkAPI) => {
    const isAuth =
        localStorage.getItem("token") || sessionStorage.getItem("token");
    if (isAuth) {
        return await getSubject(req);
    } else {
        return thunkAPI.rejectWithValue({});
    }
});