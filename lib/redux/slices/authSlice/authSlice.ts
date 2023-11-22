import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { infoUserAuth, signInThunk } from "./thunks";
import { IAuthState } from "./model";

const initialState: IAuthState = {
    loading: false,
    isAuth: false,
    id_token: "",
    infoUser: {
        activated: false,
        authorities: [],
        createdBy: "",
        createdDate: "",
        email: "",
        firstName: "",
        id: 0,
        imageUrl: "",
        langKey: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        lastName: "",
        login: "",
        phoneNumber: "",
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onAppLoading: (state) => {
            state.loading = true;
        },
        offAppLoading: (state) => {
            state.loading = false;
        },
        setToken: (state) => {
            state.id_token =
                localStorage.getItem("token") !== null
                    ? localStorage.getItem("token") || ""
                    : sessionStorage.getItem("token") || "";
            try {
                const decoded = jwt_decode(state.id_token);
                if (!decoded) {
                    state.isAuth = false;
                } else {
                    state.isAuth = true;
                }
            } catch (error) {
                state.isAuth = false;
            }
        },
        clearToken: (state) => {
            state.isAuth = false;
        },
        logOutAction: (state) => {
            localStorage.getItem("token") !== null
                ? localStorage.removeItem("token")
                : sessionStorage.removeItem("token");
            state.isAuth = false;
            state.id_token = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
            state.isAuth = true;
            state.id_token = payload;
        });
        builder.addCase(signInThunk.rejected, (state) => {
            state.isAuth = false;
        });

        builder.addCase(infoUserAuth.fulfilled, (state, { payload }) => {
            state.infoUser = payload;
        });
    },
});