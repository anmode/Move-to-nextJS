import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Header = React.lazy(() => import("../layout/Header"));
import axios from "axios";
import Head from "next/head";
import SessionCard from "../newMentorProfile/SessionCard";
import SharePageModal from "../mentorProfile/components/SharePageModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Testimonial } from "../homePage";
import MentorAbout from "../newMentorProfile/mentorAbout";
import { Section } from "../UI";
import PublishProfile from "./SideBarComponent/PublishProfile";

const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

const testimonialOptions = {
  margin: 40,
  items: 4,
  nav: true,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 2,
    },
    1170: {
      items: 3,
    },
  },
};

function Index({ mentorDetail }) {
  const [showModal, setShowModal] = useState(false);
  const [carousel, setCarousel] = useState(true);
  console.log(mentorDetail.username);
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <h1 className="tw-text-2xl tw-mt-6 font-semibold tw-p-0">
          Preview of your profile
        </h1>
        <div className="tw-flex tw-gap-3 tw-w-full">
          <input
            type="text"
            name="username"
            style={{
              width: "300px",
              padding: "5px",
              marginLeft: "20px",

              backgroundColor: "#f0f0f0",
              color: "#999999",
              border: "1px solid #cccccc",
              opacity: 0.9,
            }}
            placeholder="http:www.grabtern.com"
            value={`http://localhost:3000/${mentorDetail.username}`}
            readOnly
            title="This field is not editable"
          />
          <PublishProfile isSidebarOpen={true} className="!tw-mt-0 " />
        </div>
        {/* Mentor Page */}
        <main className="tw-pt-4">
          <div className="align-div">
            <div className="btn-div tw-flex tw-justify-end">
              <button className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center">
                <a
                  href="/dashboard/mentor?tab=profile"
                  className="tw-font-semibold tw-text-white"
                >
                  Edit About
                </a>
              </button>
            </div>
            <MentorAbout
              mentorDetail={mentorDetail}
              onShare={() => setShowModal(false)}
            />
          </div>

          {/* session section */}
          <div>
            <div className="btn-div tw-flex tw-justify-end">
              <button className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center">
                <a
                  href="/dashboard/mentor?tab=sessions"
                  className="tw-font-semibold tw-text-white"
                >
                  Edit Session
                </a>
              </button>
            </div>
            <Section
              kicker="mentor schedule"
              heading="Available Sessions"
              subheading="Ignite your inner fire, embrace personalized guidance, and 
            unlock your true potential through transformative mentor sessions."
              align="center"
            >
              <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                {/* Session Cards for every session */}
                {mentorDetail?.sessions?.length !== 0 &&
                  mentorDetail?.sessions?.map((session, index) => (
                    <SessionCard
                      key={index}
                      type={session.type}
                      name={session.name}
                      description={session.description}
                      duration={session.duration}
                      price={session.price}
                    />
                  ))}
              </div>
            </Section>
          </div>

          {/* Share Mentor Page Modal */}
          {showModal && (
            <SharePageModal
              handleClose={() => setShowModal(false)}
              username={mentorDetail?.username}
            />
          )}
          {/* Error Display */}
          {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
          {/* Book Session Modal */}
          {/* {!error && modalPopup && (
            <BookSessionModal
              handleClose={() => setModalPopup(false)}
              handleCancel={() => setModalPopup(false)}
              handleConfirm={() => handleClick(selectedSession)}
            />
          )} */}
          {/* Successful Alert Message */}
          {/* {emailSent && (
          <div style={{ color: "green" }}>
            Your session has been booked! Check your inbox for payment details.
          </div>
        )} */}
        </main>
        {/* {isLoading && (
          <>
            <div className={styles.overlay}></div>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
            >
              <div className={styles.loader}></div>
            </div>
          </>
        )} */}
        <ToastContainer />
      </React.Suspense>
    </>
  );
}
function ViewProfile({ isSidebarOpen, setLoadingState, setErrorState }) {
  const [mentorData, setMentorData] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const storedMentorData = JSON.parse(localStorage.getItem("mentorData"));
        if (!storedMentorData || !storedMentorData["mentor_name"]) {
          setErrorState("No mentor data found in local storage");
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/mentorDetail/${storedMentorData["mentor_name"]}`;
        setLoadingState(true);

        const { data: res } = await axios.get(url);

        if (res.message === "Invalid link") {
          setErrorState("Invalid mentor name");
        } else {
          setMentorData(res);
        }
      } catch (error) {
        setErrorState("An error occurred while fetching mentor data");
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchMentorData();
  }, [setLoadingState, setErrorState]);

  if (!mentorData) {
    return <p>Loading...</p>;
  }
  console.log(mentorData);
  console.log(mentorData.mentorDetail.username);
  return <Index mentorDetail={mentorData.mentorDetail} />;
}

export default ViewProfile;
