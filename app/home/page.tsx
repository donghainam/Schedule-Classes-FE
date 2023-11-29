'use client'

import {
    authSlice,
    infoUserAuth,
    selectAuth,
    useDispatch,
    useSelector
} from "@/lib/redux";
import { useEffect } from "react";
import Header from "./components/Header";
import HomeBody from "./components/homeBody";
import Link from "next/link";

const RootLayoutComponent = () => {
    const useAppSelector = useSelector(selectAuth);
    const dispatch = useDispatch()
    const isAuth = useAppSelector.isAuth;

    useEffect(() => {
        dispatch(authSlice.actions.setToken());
        dispatch(infoUserAuth(""))
    }, [dispatch]);

    useEffect(() => {
        if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
            <Link href="/" ></Link>
        }
    }, [localStorage.getItem("token"), sessionStorage.getItem("token")]);

    // if (!isAuth) {
    //     return <HomeNotLogin />
    // }

    return (
        <>
            <Header />
            <HomeBody />
        </>
    )
}

export default RootLayoutComponent;