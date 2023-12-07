'use client'

import { useSelector, selectAuth, useDispatch } from "@/lib/redux";
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
import { toast } from "react-toastify";
import { appSlice, selectApp } from "@/lib/redux/slices/appSlice";
import Loading from "./home/components/Loading";

export default function HomePage() {
  const dispatch = useDispatch();
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

  // Schedule ctn
  const [isSemester, setIsSemester] = useState("20231");
  const handleInputSemesterChange = (data: any) => {
    setIsSemester(data.target.value);
  }
  const handleScheduleOnClick = async () => {
    toast.success("Click schedule btn");
    console.log("CHeck semester: ", isSemester);
    // try {
    //   await
    // }
  }

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
              size="large"
              placeholder="Semester"
              defaultValue={"20231"}
              className={styles.scheinput}
              required
              onChange={handleInputSemesterChange}
            />
            <Button
              type="primary"
              className={styles.schebutton}
              size="large"
              onClick={handleScheduleOnClick}
            >Schedule</Button>
          </div>
        </div>
      </div>
    </>
  )
}
