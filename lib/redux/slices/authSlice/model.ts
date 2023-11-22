export type IAuthInput = {
    email?: string;
    password: string;
    rePassword?: string;
    username?: string;
};
export interface IAuthState {
    isAuth: boolean;
    id_token: string;
    loading: boolean;
    infoUser: IGetAccountInfo;
}
export type IAuthSignin = {
    username: string;
    password: string;
    remember?: boolean;
};

export interface IGetAccountInfo {
    activated: boolean;
    authorities: string[];
    createdBy: string;
    createdDate: string;
    email: string;
    firstName: string;
    id: number;
    imageUrl: string;
    langKey: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    lastName: string;
    login: string;
    phoneNumber: string;
}
