import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClassroomOutputType } from "./model";
import { PaginationRequest } from "../appSlice/model";
import { ReduxState } from "../../store";
import { getClassroom } from "./api";

export const getAllClassroomThunk = createAsyncThunk<
    // Return type of the payload creator
    { data: ClassroomOutputType[]; total: number },
    // First argument to the payload creator
    PaginationRequest,
    {
        // Optional fields for defining thunkApi field types
        state: ReduxState;
    }
>("getClassroom", async (req: PaginationRequest, thunkAPI) => {
    const isAuth =
        localStorage.getItem("token") || sessionStorage.getItem("token");
    if (isAuth) {
        return await getClassroom(req);
    } else {
        return thunkAPI.rejectWithValue({});
    }
});