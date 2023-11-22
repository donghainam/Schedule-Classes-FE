'use client'

import {
  authSlice,
  infoUserAuth,
  selectAuth,
  useDispatch,
  useSelector
} from "@/lib/redux";
import { useEffect } from "react";
import HomeNotLogin from "../home/homeNotLogin";
import Header from "../home/header";
import Navbar from "./Navbar";

const RootLayoutComponent = () => {
  const useAppSelector = useSelector(selectAuth);
  const dispatch = useDispatch()
  const isAuth = useAppSelector.isAuth;

  useEffect(() => {
    dispatch(authSlice.actions.setToken());
    dispatch(infoUserAuth(""))
  }, [dispatch]);

  // useEffect(() => {
  //   if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
  //     <Link href="/" />
  //   }
  // }, [localStorage.getItem("token"), sessionStorage.getItem("token")]);

  if (!isAuth) {
    return <HomeNotLogin />
  }

  return (
    <>
      <Navbar />
      {/* <Header /> */}
      <h1>Roor Layout component</h1>
    </>
  )
}

export default RootLayoutComponent;