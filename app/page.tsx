'use client'

import { useSelector, selectAuth } from "@/lib/redux";
import HomeNotLogin from "./components/home/homeNotLogin";
import Header from "./home/components/Header";

import styles from "./home/components/styles/home.module.scss";
import NavbarMenu from "./components/navbar/navbar";

export default function HomePage() {
  const useAppSelector = useSelector(selectAuth);
  const isAuth = useAppSelector.isAuth;

  if (!isAuth) {
    return <HomeNotLogin />;
  }

  return (
    <>
      <Header />
      <NavbarMenu menuItem="navmenu1" />
      <div className={styles.bodyctn}>
        <div className={styles.contentctn}>
          <h2>Home</h2>
        </div>
      </div>
    </>
  )
}
