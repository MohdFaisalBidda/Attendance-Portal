import React, { useEffect, useState } from "react";
import { getToken } from "../utils/localstorage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar"
import "../Calendar.css";
import { toast } from "react-toastify";

function Home() {
  const token = getToken();
  const [attendanceData, setAttendanceData] = useState({});
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/attendance/${token._id}`,
          {
            headers: {
              token: `Bearer ${token.token}`,
            },
          }
        );
        const data = res.data;
        setAttendanceData(prevAttendanceData => {
          const updatedAttendanceData = { ...prevAttendanceData };
          data.forEach((record) => {
            const date = new Date(record.date).toISOString().split("T")[0];
            updatedAttendanceData[date] = record.status;
          });
          return updatedAttendanceData;
        });
        console.log(attendanceData);
      } catch (error) {
        console.log("Error fetching attendance data", error);
      }
    };
    fetchAttendance();
  }, [token._id, dateState]);

  const markAttendance = async () => {
    const today = new Date();
    const formattedDate = formatDate(dateState);

    if (formattedDate === formatDate(today)) {
      const status =
        attendanceData[formattedDate] === "present" ? "absent" : "present";
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/attendance`,
          {
            userId: token._id,
            date: formattedDate,
            status,
          },
          {
            headers: {
              token: `Bearer ${token.token}`,
            },
          }
        );
        setDateState(formattedDate);
        toast.success("Attendance marked for today!");
        setAttendanceData((prevState) => ({
          ...prevState,
          [formattedDate]: status,
        }));
      } catch (error) {
        console.error("Error marking attendance:", error);
        toast.error(error.response.data.error);
      }
    } else {
      console.log("You can only mark attendance for today.");
      toast.error("You can only mark attendance for today.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDate(date);
    const status = attendanceData[formattedDate];
    console.log("Formatted Date:", formattedDate);
    console.log("Status:", status);
    if (status === "present" && formattedDate === formatDate(new Date())) {
      return "present-date";
    } else if (status === "absent") {
      return "absent-date";
    }
    return null;
  };

  return (
    <>
          <Navbar/>
      <div className="flex flex-col gap-y-12 justify-center items-center h-screen">
        <Calendar
          onChange={setDateState}
          value={dateState}
          maxDate={new Date()}
          tileClassName={tileClassName}
        />
        <div className="">
          <button
            className="w-full text-white bg-[#db2777] hover:bg-pink-500 disabled:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={markAttendance}
          >
            Mark Today's Attendance
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Home;
