import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/mentorDashboard/sidebar";
import Profile from "../../components/mentorDashboard/profile";
import Sessions from "../../components/mentorDashboard/sessions";
import Calendar from "../../components/mentorDashboard/calendar";
import Queries from "../../components/mentorDashboard/queries";
import Home from "../../components/mentorDashboard/home";
import Bookings from "../../components/mentorDashboard/Bookings";
import Payments from "../../components/mentorDashboard/Payment";
import ViewProfile from "../../components/mentorDashboard/ViewProfile";
import ComingSoon from "../../components/basic/ComingSoon";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import PreLoader from "../../components/mentorDashboard/PreLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MentorDashboardTour } from "./dashboardTour";

function MentorDashboard() {
  const initialState = {
    status: false,
    message: "",
  };
  const [loadingState, setLoadingState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialState);
  // getting page name on change in tab
  const [component, setComponent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mentor, setMentor] = useState({});
  const { isMentorLoggedIn, setIsMentorLoggedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const checkMentorData = async () => {
      try {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const redirectURL = params.get("redirectURL");
        const decodedURL = redirectURL ? decodeURIComponent(redirectURL) : null;
        console.log("Hello", decodedURL);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/mentorDetail`,
          { withCredentials: true },
        );

        const mentorData = res.data.mentorDetail;

        if (mentorData && mentorData.email) {
          const localStorageMentorData = {
            mentor_picture: mentorData.image,
            mentor_email: mentorData.email,
            mentor_name: mentorData.name,
          };
          localStorage.setItem(
            "mentorData",
            JSON.stringify(localStorageMentorData),
          );
          setMentor(mentorData);
          setIsMentorLoggedIn(true);
          if (decodedURL && !decodedURL.includes("null")) {
            router.replace(decodedURL);
          }
        } else {
          const storedMentorData = JSON.parse(
            localStorage.getItem("mentorData"),
          );
          if (storedMentorData) {
            setMentor(storedMentorData);
            setIsMentorLoggedIn(true);
            if (decodedURL && !decodedURL.includes("null")) {
              router.replace(decodedURL);
            }
          } else {
            router.push("/auth/login?entityType=mentor");
          }
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        router.push("/auth/login?entityType=mentor");
      }
    };

    checkMentorData();
  }, [router, setIsMentorLoggedIn]);

  useEffect(() => {
    // Handle query parameters for setting the component
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setComponent(params.get("tab") || "");
  }, [window.location.search]);

  MentorDashboardTour();

  if (!isMentorLoggedIn) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="tw-flex tw-w-full" id="mentorHome">
        <Sidebar
          mentor={mentor}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center ${
            isSidebarOpen
              ? "tw-transition-all tw-ease-in-out md:tw-ml-[265px]"
              : "tw-duration-200 tw-transition-all tw-ease-in-out md:tw-ml-[72px]"
          }`}
        >
          {(loadingState.status || errorState.status) && (
            <PreLoader loadingState={loadingState} errorState={errorState} />
          )}
          {component === "" && (
            <Home
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
              mentor={mentor}
              setMentor={setMentor}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component === "profile" && (
            <Profile
              setMentor={setMentor}
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}

          {component === "view-profile" && (
            <ViewProfile
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component === "calendar" && (
            <Calendar
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component === "sessions" && (
            <Sessions
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component == "queries" && (
            <Queries
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component == "bookings" && (
            <Bookings
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {component == "payments" && (
            <Payments
              isSidebarOpen={isSidebarOpen}
              setLoadingState={setLoadingState}
              setErrorState={setErrorState}
            />
          )}
          {["services", "new", "referral", "rewards"].includes(component) && (
            <ComingSoon isSidebarOpen={isSidebarOpen} />
          )}
        </div>
      </div>
    </>
  );
}

export default MentorDashboard;
