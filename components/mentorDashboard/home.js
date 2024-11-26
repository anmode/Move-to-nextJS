import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidUser, BiTime, BiCalendar } from "react-icons/bi";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import {
  MdNotifications,
  MdPayment,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { logout } from "../layout/UserProfile";
import { useAuth } from "../../context/AuthContext";

const Home = ({
  isSidebarOpen,
  setIsSidebarOpen,
  mentor,
  setMentor,
  setLoadingState,
  setErrorState,
}) => {
  const { setIsMentorLoggedIn, setIsUserLoggedIn } = useAuth();
  const [Notification, setNotification] = useState(false);
  const [mobileNotification, setMobileNotification] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    const success = await logout(router);
    if (success) {
      localStorage.clear();
      setIsMentorLoggedIn(false);
      setIsUserLoggedIn(false);

      if (router.pathname === "/") {
        router.reload();
      } else {
        router.push("/");
      }
    }
  }, [router, setIsMentorLoggedIn, setIsUserLoggedIn]);

  const fetchMentorDetails = useCallback(async () => {
    if (!mentor.username) return; // Early exit if no username

    try {
      setLoadingState({ status: true });
      setErrorState({ status: false });
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/mentorDetail`,
        { withCredentials: true },
      );
      setMentor(res.data.mentorDetail);
    } catch (error) {
      setErrorState({
        status: true,
        message: error.response?.data.message || "An error occurred",
      });
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoadingState({ status: false });
    }
  }, [
    mentor.username,
    setMentor,
    setLoadingState,
    setErrorState,
    handleLogout,
  ]);

  useEffect(() => {
    fetchMentorDetails();
  }, [fetchMentorDetails]);

  const reference = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        Notification &&
        reference.current &&
        !reference.current.contains(e.target)
      ) {
        setNotification(false);
        setMobileNotification(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [Notification]);

  const cards = [
    {
      name: mentor?.name,
      icon: (
        <Image
          src={
            !mentor?.image
              ? "/assets/img/icon/no-profile-picture.webp"
              : mentor.image
          }
          width={100}
          height={100}
          className="tw-rounded-full"
        />
      ),
      path: "profile",
      socials: {
        linkedin: mentor?.social?.linkedin,
        twitter: mentor?.social?.twitter,
      },
      heading: "Edit Profile",
    },
    {
      icon: <BiTime className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "sessions",
      heading: "Your Sessions",
      session: {
        title: mentor?.sessions?.[0]?.name,
        type: mentor?.sessions?.[0]?.type,
        duration: mentor?.sessions?.[0]?.duration,
        desc: mentor?.sessions?.[0]?.description,
      },
    },
    {
      icon: <BiCalendar className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "calendar",
      heading: "View Calendar",
      schedule: {
        day: mentor?.schedules?.[0]?.day,
        start: mentor?.schedules?.[0]?.startsAt,
        end: mentor?.schedules?.[0]?.endsAt,
        timezone: mentor?.schedules?.[0]?.timezone,
      },
    },
    {
      name: "Payments",
      icon: <MdPayment className="tw-w-14 tw-h-14 tw-text-[#00C9A7]" />,
      path: "payments",
      heading: "View Payments",
    },
  ];

  return (
    <>
      <section>
        <header
          className={`tw-items-center tw-p-8 tw-flex tw-justify-between tw-flex-wrap tw-gap-4`}
        >
          <h1 className="tw-text-4xl tw-font-bold">
            Welcome <span>{mentor?.name?.split(" ")[0]}</span>!
          </h1>{" "}
          {/*  Mentor = MENTOR's NAME */}
          <div
            className={`tw-flex tw-justify-center tw-items-center tw-gap-2 ${
              isSidebarOpen
                ? "-tw-translate-x-40 tw-ease-in-out"
                : "tw-translate-x-0 tw-ease-in-out"
            }`}
          >
            {mentor ? (
              /* view profile  */
              <>
                <button className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center">
                  <a
                    href="/dashboard/mentor?tab=view-profile"
                    className="tw-font-semibold tw-text-white"
                  >
                    View profile
                  </a>
                </button>
                <p
                  className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center"
                  onClick={handleLogout}
                  id="mentorLogout"
                >
                  <h2 className="tw-font-semibold tw-text-white">Log out</h2>
                  <Image
                    src={
                      !mentor?.image
                        ? "/assets/img/icon/no-profile-picture.webp"
                        : mentor.image
                    }
                    alt="Picture of the mentor"
                    width={30}
                    height={30}
                    className="tw-rounded-full"
                  />
                </p>
              </>
            ) : (
              <p
                className="tw-flex tw-justify-center tw-gap-2 tw-bg-primary-100 hover:tw-bg-primary-200 tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-p-2 tw-rounded-md tw-items-center"
                onClick={handleLogout}
                id="mentorLogout"
              >
                <h2 className="tw-font-semibold tw-text-white">Mentor</h2>
                <BiSolidUser className="tw-w-7 tw-h-7 tw-text-[#FBEAFF]" />
              </p>
            )}

            {/* Notification */}
            <div
              title="Notifications"
              className="tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out hover:tw-bg-primary-200 tw-bg-primary-100 tw-justify-center tw-items-center tw-relative tw-p-2 tw-rounded-md"
              id="mentorNotifications"
            >
              {Notification || mobileNotification ? (
                <MdOutlineNotificationsNone
                  onClick={() => {
                    setNotification(false);
                    setMobileNotification(false);
                  }}
                  className="tw-w-[30px] tw-h-[30px] tw-text-[#FBEAFF]"
                />
              ) : (
                <MdNotifications
                  onClick={() => {
                    setNotification(true);
                    setMobileNotification(true);
                  }}
                  className="tw-w-[30px] tw-h-[30px] tw-text-[#FBEAFF]"
                />
              )}
            </div>
            {Notification && (
              // Notification Pop-up for devices with width > 512px
              <div
                ref={reference}
                className="tw-z-50 tw-absolute tw-top-[70px] tw-right-0 tw-w-[300px] tw-h-[500px] tw-bg-[#FBEAFF] tw-rounded-md tw-shadow-xl tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-overflow-y-scroll max-[512px]:tw-hidden"
              >
                <h2 className="tw-text-2xl tw-font-semibold tw-text-center tw-mb-5">
                  Notifications
                </h2>
                <p className="tw-text-lg tw-font-medium tw-text-center">
                  Coming Soon...
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Nnotification for mobile devices < 512px */}
        {mobileNotification && (
          <div
            ref={reference}
            className="tw-z-50 tw-w-full tw-h-[500px] tw-bottom-0 tw-fixed tw-bg-[#FBEAFF] tw-rounded-md tw-shadow-xl tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-overflow-y-scroll min-[513px]:tw-hidden"
          >
            <h2 className="tw-text-2xl tw-font-semibold tw-text-center tw-mb-5">
              Notifications
            </h2>
            <p className="tw-text-lg tw-font-medium tw-text-center">
              Coming Soon...
            </p>
          </div>
        )}

        <hr className="tw-h-px  tw-my-5 tw-bg-base-300 tw-border-0 tw-dark:bg-gray-700" />

        <main className="w-pb-14 tw-flex tw-flex-col">
          <p className="tw-flex tw-justify-start tw-items-center tw-text-center tw-text-lg tw-font-medium tw-px-8">
            Here you can view your sessions, edit your profile, and view your
            calendar.
          </p>
          <div className="tw-flex-wrap tw-mt-10 tw-flex tw-gap-10 max-[762px]:tw-justify-center max-[762px]:tw-items-center max-[600px]:tw-flex-col tw-px-8">
            {cards.map((card) => {
              return (
                <div className="tw-w-[300px] tw-flex-wrap tw-border tw-border-base-300  tw-gap-2 tw-p-6 tw-flex tw-justify-around tw-items-center tw-rounded-lg tw-bg-base-100 max-[752px]:tw-w-[500px] max-[686px]:tw-w-[400px] max-[512px]:tw-w-[300px]">
                  <div className="tw-justify-center tw-items-center tw-flex tw-flex-col tw-gap-2 tw-w-full">
                    {card.icon}
                    <h2 className="tw-font-semibold tw-text-xl">{card.name}</h2>
                    {card.socials && (
                      <div className="tw-flex tw-gap-8 tw-mt-2">
                        <a
                          href={card.socials?.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="tw-cursor-pointer hover:tw-scale-110 tw-ease-in-out tw-transition-all tw-duration-100"
                        >
                          <BsLinkedin className="tw-w-6 tw-h-6 tw-text-[#0072b1]" />
                        </a>
                        <a
                          href={card.socials?.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="tw-cursor-pointer hover:tw-scale-110 tw-ease-in-out tw-transition-all tw-duration-100"
                        >
                          <BsTwitter className="tw-w-6 tw-h-6 tw-text-[#1D9BF0]" />
                        </a>
                      </div>
                    )}
                    {card.session && (
                      <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
                        {card?.session?.type ? (
                          <div>
                            <h2 className="tw-font-semibold tw-text-md">
                              Title:{" "}
                              <span className="tw-text-sm tw-text-primary-200">
                                {card.session.title}
                              </span>
                            </h2>
                            <div className="tw-flex tw-flex-col tw-items-start pl-4 tw-gap-1">
                              <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                                {card.session.type}
                              </p>
                              <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                                {card.session.duration} minutes
                              </p>
                              <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                                {card.session.desc}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <h2>No Session found</h2>
                        )}
                      </div>
                    )}
                    {card.schedule && (
                      <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
                        {card.schedule?.day?.length > 0 ? (
                          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
                            <h2 className="tw-font-semibold tw-text-md">
                              Day:{" "}
                              <span className="tw-text-sm tw-text-primary-200">
                                {card.schedule.day}
                              </span>
                            </h2>
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
                              <p className="tw-text-sm tw-font-semibold tw-flex tw-gap-2  tw-items-center tw-justify-center tw-text-primary-200">
                                <span>
                                  <BiTime className="tw-text-slate-900 tw-text-xl" />
                                </span>
                                {card.schedule.start} - {card.schedule.end}
                              </p>
                              <p className="tw-text-sm tw-font-semibold tw-text-primary-200">
                                {card.schedule.timezone}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <h2>No Schedule found</h2>
                        )}
                      </div>
                    )}
                    {card.payment && (
                      <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
                        <h2 className="tw-font-semibold tw-text-md">
                          Payment:{" "}
                          <span className="tw-text-sm tw-text-primary-200">
                            {card.payment}
                          </span>
                        </h2>
                      </div>
                    )}
                  </div>
                  <div className="tw-p-2 tw-text-center tw-rounded-md tw-font-semibold tw-transition-all tw-duration-150 tw-cursor-pointer tw-ease-in-out tw-w-full tw-bg-primary-100 hover:tw-bg-primary-200">
                    <Link href={`/dashboard/mentor?tab=${card.path}`}>
                      <p className="tw-text-white">{card.heading}</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="tw-w-fit tw-mx-auto tw-my-8 tw-mb-20">
            {!isSidebarOpen ? (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="tw-rounded-full tw-bg-base-200 hover:tw-text-white tw-text-base-500 tw-border-2 tw-border-x-primary-100 tw-border-y-primary-200 hover:tw-bg-primary-100 tw-py-3 tw-px-6 tw-text-center tw-text-base tw-font-semibold"
              >
                View More
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="tw-rounded-full tw-bg-base-200 hover:tw-text-white tw-text-base-500 tw-border-2 tw-border-x-primary-100 tw-border-y-primary-200 hover:tw-bg-primary-100 tw-py-3 tw-px-6 tw-text-center tw-text-base tw-font-semibold"
              >
                View Less
              </button>
            )}
          </div>
        </main>
      </section>
    </>
  );
};

export default Home;
