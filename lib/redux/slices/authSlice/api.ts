import { getService, postService } from "@/lib/axios/api";
import { IAuthInput, IAuthSignin, IGetAccountInfo } from "./model";

export const signUpApi = ({ email, password }: IAuthInput) => {
    return postService("/register", { email, password });
};

export const signInApi = ({ username, password }: IAuthSignin) => {
    return postService("/authenticate", { username, password });
};

export const accountApi = (): Promise<IGetAccountInfo> => {
    return getService("/account");
};

export const forgotPassword = (email: string) => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    return fetch("/api/account/reset-password/init/customer", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + (localToken || sessionToken),
        },
        body: email,
    });
};
export const resetPassword = (currentPassword: string, newPassword: string) => {
    return postService("/account/change-password", {
        newPassword,
        currentPassword,
    });
};
