import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthSignin, IGetAccountInfo } from "./model";
import { ReduxState, useDispatch } from "../../store";
import { accountApi, signInApi } from "./api";
import { toast } from "react-toastify";
import { authSlice } from "./authSlice";

export const infoUserAuth = createAsyncThunk<
    IGetAccountInfo,
    "",
    {
        state: ReduxState;
    }
>("auth/infoUser", async (_, thunkAPI) => {
    try {
        const isAuth = thunkAPI.getState().auth.isAuth;
        if (isAuth) {
            const response = await accountApi();
            return response;
        } else {
            return thunkAPI.rejectWithValue({});
        }
    } catch (error) {
        if (error === "error.http.401") {
            thunkAPI.dispatch(authSlice.actions.logOutAction());
        }
        return thunkAPI.rejectWithValue(error);
    } finally {
        thunkAPI.dispatch(authSlice.actions.offAppLoading());
    }
});

export const signInThunk = createAsyncThunk(
    "auth/sign-in",
    async (body: IAuthSignin, thunkAPI) => {
        try {
            const { remember, ...rest } = body;
            thunkAPI.dispatch(authSlice.actions.onAppLoading());
            const response = await signInApi(rest);
            toast.success("Login successfully");
            if (remember === true) {
                localStorage.setItem("token", response.id_token);
            } else {
                sessionStorage.setItem("token", response.id_token);
            }
            return response.id_token;
        } catch (error) {
            toast.error("Wrong account information or password");
            return thunkAPI.rejectWithValue(error);
        } finally {
            thunkAPI.dispatch(authSlice.actions.offAppLoading());
        }
    }
);