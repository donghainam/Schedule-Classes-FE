'use client'

import { useSelector, selectAuth } from "@/lib/redux";
import HomeNotLogin from "./components/home/homeNotLogin";
import Header from "./home/components/Header";

import styles from "./home/components/styles/home.module.scss";
import NavbarMenu from "./components/navbar/navbar";
import { CodeOutlined, ReadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNumClassroom } from "@/lib/redux/slices/classroomSlice/api";
import { getNumSubject } from "@/lib/redux/slices/subjectSlice/api";
import { Button, Input } from "antd";

export default function HomePage() {
  const useAppSelector = useSelector(selectAuth);
  const [isNumberClassroom, setIsNumberClassroom] = useState(0);
  useEffect(() => {
    getNumClassroom().then((data) => {
      setIsNumberClassroom(data.num);
    });
  }, []);

  const [isNumberSubject, setIsNumberSubject] = useState(0);
  useEffect(() => {
    getNumSubject().then((data) => {
      setIsNumberSubject(data.num);
    });
  }, []);
  const isAuth = useAppSelector.isAuth;
  const router = useRouter();

  if (!isAuth) {
    return <HomeNotLogin />;
  }

  const handleClickClassroomBox = () => {
    router.push("/classroom");
  }

  const handleClickSubjectBox = () => {
    router.push("/classes");
  }

  return (
    <>
      <Header />
      <NavbarMenu menuItem="navmenu1" />
      <div className={styles.bodyctn}>
        <div className={styles.contentctn}>
          <h2>Home</h2>

          <div className={styles.dashboard}>

            <div className={styles.boxdetail} onClick={handleClickSubjectBox}>
              <div className={styles.dashboardtitle}># subject</div>
              <div className={styles.dahboardicon}><ReadOutlined className={styles.iconch} /> {isNumberSubject} </div>
            </div>

            <div className={styles.boxdetail} onClick={handleClickClassroomBox}>
              <div className={styles.dashboardtitle}># classroom</div>
              <div className={styles.dahboardicon}><CodeOutlined className={styles.iconch} /> {isNumberClassroom} </div>
            </div>
          </div>

          <div className={styles.schedule}>
            Enter the semester to schedule: <Input
              placeholder="Semester"
              defaultValue={"20231"}
              className={styles.scheinput}
              required
            />
            <Button type="primary" className={styles.schebutton}>Schedule</Button>
          </div>
        </div>
      </div>
    </>
  )
}
