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
import { Button, Input, InputNumber } from "antd";
import { toast } from "react-toastify";
import Loading from "./home/components/Loading";
import { getSchedule } from "@/lib/redux/slices/scheduleSlice/api";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const useAppSelector = useSelector(selectAuth);
  const [isNumberClassroom, setIsNumberClassroom] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNumClassroom();
        setIsNumberClassroom(data.num);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);;

  const [isNumberSubject, setIsNumberSubject] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNumSubject();
        setIsNumberSubject(data.num);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  // Schedule ctn
  const [isSemester, setIsSemester] = useState("20232");
  const [isNumberDayPerWeek, setIsNumberDayPerWeek] = useState(5);
  const handleInputSemesterChange = (data: any) => {
    setIsSemester(data.target.value);
  };
  const handleInputNumberDayPerWeek = (value: number | null) => {
    if (value !== null) {
      setIsNumberDayPerWeek(value);
    }
  };
  const handleScheduleOnClick = async () => {
    setIsLoading(true);
    try {
      const response = await getSchedule(isSemester, isNumberDayPerWeek);

      // Create a Blob URL from the response data
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      // Create a hidden link and simulate a click to trigger file download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Schedule_' + isSemester + '.xlsx'; // Specify the file name
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // Clean up - remove the link and revoke the Blob URL after download
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  }

  const isAuth = useAppSelector.isAuth;
  const router = useRouter();

  if (!isAuth) {
    return <HomeNotLogin />;
  }

  const handleClickClassroomBox = () => {
    setIsLoading(true);
    router.push("/classroom");
  }

  const handleClickSubjectBox = () => {
    setIsLoading(true);
    router.push("/classes");
  }

  return (
    <>
      <Loading show={isLoading} />
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
            <div className={styles.titlesche}>Scheduling algorithm</div>
            <div className={styles.scheinput}>
              Enter the semester to schedule:
              <Input
                size="large"
                placeholder="Semester"
                defaultValue={"20232"}
                className={styles.scheinputbox}
                required
                onChange={handleInputSemesterChange}
              />
            </div>
            <div className={styles.scheinputnumber}>
              Enter the number of school days per week:
              <InputNumber
                min={1}
                max={6}
                defaultValue={5}
                className={styles.scheinputnumberbox}
                onChange={handleInputNumberDayPerWeek}
              />
            </div>
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
