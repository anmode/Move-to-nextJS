import React, { useState, useEffect } from "react";
import Card from "./CalendarComponent/card";
import axios from "axios";
import { BsTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";
import Button from "../UI/Button/Button";

const Calender = ({ setLoadingState, setErrorState }) => {
  const [showDefault, setShowDefault] = useState(false);
  const [schedule, showSchedule] = useState(false);
  const [calender, showCalender] = useState(true);
  const [listSchedules, setListSchedules] = useState([]);
  const [meetLink, setMeetLink] = useState("");
  const [checkedDays, setCheckedDays] = useState([]);
  const [key, setKey] = useState(0);
  const [loader, setLoader] = useState(false);
  const [scheduleBtnVariant, setScheduleBtnVariant] = useState("secondary");
  const [calendarBtnVariant, setCalendarBtnVariant] = useState("Primary");

  const weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const timeOptions = {
    "07:00 AM": "08:00 AM",
    "08:00 AM": "09:00 AM",
    "09:00 AM": "10:00 AM",
    "10:00 AM": "11:00 AM",
    "11:00 AM": "12:00 PM",
    "12:00 PM": "01:00 PM",
    "01:00 PM": "02:00 PM",
    "02:00 PM": "03:00 PM",
    "03:00 PM": "04:00 PM",
    "04:00 PM": "05:00 PM",
    "05:00 PM": "06:00 PM",
    "06:00 PM": "07:00 PM",
    "07:00 PM": "08:00 PM",
    "08:00 PM": "09:00 PM",
    "09:00 PM": "10:00 PM",
    "10:00 PM": "11:00 PM",
    "11:00 PM": "12:00 AM",
  };

  const fetchSchedule = async () => {
    try {
      setLoadingState({ status: true });
      setErrorState({ status: false });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/getSchedule`,
        {
          withCredentials: true,
        },
      );
      setMeetLink(response.data.meetLink);
      setCheckedDays(response.data.schedules.map((data) => data.day));
      setListSchedules(response.data.schedules);
      setLoadingState({ status: false });
      return;
    } catch (error) {
      setLoadingState(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleLinkUpdate = (link) => {
    setMeetLink(link);
  };

  const generateTimeOptions = () => {
    const options = [];
    options.push(
      <option key="default" value="▼">
        ▼
      </option>,
    );
    for (let i = 1; i <= 24; i++) {
      const time = i < 10 ? `0${i}:00` : `${i}:00`;
      options.push(
        <option key={time} value={time}>
          {time}
        </option>,
      );
    }
    return options;
  };

  const handleDayChange = (day) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter((d) => d !== day));
      setListSchedules(
        listSchedules.filter((schedule) => schedule.day !== day),
      );
    } else {
      setCheckedDays([...checkedDays, day]);
      setListSchedules([
        ...listSchedules,
        {
          day,
          startsAt: "09:00",
          endsAt: "10:00",
          timezone: "(GMT-11:00) Pacific/Midway",
        },
      ]);
    }
  };

  const handleTimeStartChange = (day, time) => {
    let findSchedule = listSchedules.find((schedule) => schedule.day === day);
    let findIndexNum = listSchedules.findIndex(
      (schedule) => schedule.day === day,
    );
    let newSchedule = {
      ...findSchedule,
      startsAt: time,
    };
    listSchedules[findIndexNum] = newSchedule;
    setKey(key + 1);
  };

  const handleTimeEndChange = (day, time) => {
    let findSchedule = listSchedules.find((schedule) => schedule.day === day);
    let findIndexNum = listSchedules.findIndex(
      (schedule) => schedule.day === day,
    );
    let newSchedule = {
      ...findSchedule,
      endsAt: time,
    };
    listSchedules[findIndexNum] = newSchedule;
    setKey(key + 1);
  };

  const updateSchedules = async () => {
    setLoader(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/updateSchedules`;
      console.log(listSchedules);
      const res = await axios.put(
        url,
        {
          link: meetLink,
          schedules: listSchedules,
        },
        { withCredentials: true },
      );

      // Check if the response indicates success
      if (res.status === 200) {
        toast.success("Update successful 👌");
      } else {
        toast.error("Sorry! Couldn't update");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error("An error occurred while updating schedules.");
    }
  };

  const handleCalender = () => {
    showSchedule(false);
    showCalender(true);
    setCalendarBtnVariant("Primary");
    setScheduleBtnVariant("secondary");
  };
  const handleSchedule = () => {
    showSchedule(true);
    showCalender(false);
    setScheduleBtnVariant("Primary");
    setCalendarBtnVariant("secondary");
  };

  // create new schedule
  const [components, setComponents] = useState([]); // array of components (store all schedules)
  const [showNewSchedule, setShowNewSchedule] = useState(false); // show new schedule form

  const createSchedule = () => {
    const newComp = {
      props: {
        id: components.length,
        deleteSchedule: deleteSchedule,
      },
      componentHidden: (
        <div
          key={components.length}
          className="tw-mt-8 tw-flex tw-flex-col tw-rounded-md tw-p-10 tw-border-2 tw-w-full"
        >
          <div className="tw-flex tw-justify-between tw-justify-start">
            <h2 className="tw-font-semibold tw-text-lg">
              Schedule {components.length + 1}
            </h2>
            <div className="tw-flex tw-gap-4">
              <button
                onClick={() => setShowNewSchedule(true)}
                className=" tw-bg-black tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
              >
                Show
              </button>
              <button
                onClick={() => deleteSchedule(components.length)}
                className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-bg-black tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
              >
                <BsTrash3Fill /> Delete
              </button>
            </div>
          </div>
        </div>
      ),
      componentShow: (
        <div
          key={components.length}
          className="tw-mt-8 tw-flex tw-flex-col tw-rounded-md tw-p-10 tw-border-2 max-[512px]:tw-border-0 tw-gap-2 tw-w-full"
        >
          <div className="tw-flex tw-justify-between max-[512px]:tw-flex-col">
            <h2 className="tw-font-semibold tw-text-lg">
              Schedule {components.length + 1}
            </h2>
            <div className="tw-flex tw-gap-4">
              <button className=" tw-bg-black tw-ease-in-out tw-duration-200 tw-transition-all tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base">
                Save
              </button>
              <button
                onClick={() => {
                  setShowNewSchedule(false);
                }}
                className=" tw-bg-black tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
              >
                Hide
              </button>
            </div>
          </div>

          {weekdays.map((day, index) => (
            <div
              key={index}
              className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-between tw-items-center max-[708px]:tw-flex-col max-[708px]:tw-items-start max-[512px]:tw-gap-2"
            >
              <div className="tw-flex tw-items-center tw-gap-2 tw-justify-center tw-text-center">
                <input
                  id={index}
                  type="checkbox"
                  checked={checkedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="tw-w-5 tw-h-5 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400"
                />
                <label
                  for={index}
                  className="tw-flex tw-justify-center tw-text-center tw-items-center"
                >
                  <span className="tw-font-medium tw-text-center tw-items-center tw-justify-center tw-flex tw-relative tw-top-1">
                    {day}
                  </span>
                </label>
              </div>

              {checkedDays.includes(day) ? (
                <div className="tw-flex tw-gap-5">
                  <div className="tw-flex tw-justify-center tw-items-center">
                    {/* <h3>Select Time:</h3> */}
                    <select
                      value={selectedTimes[day] || ""}
                      onChange={(e) =>
                        handleTimeStartChange(day, e.target.value)
                      }
                      className="tw-w-28 tw-h-10 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 max-[512px]:tw-w-20 max-[512px]:tw-h-8 max-[512px]:tw-text-xs max-[512px]:tw-px-1 max-[512px]:tw-py-1 max-[512px]:tw-text-center max-[512px]:tw-rounded-sm max-[512px]:tw-border-2 max-[512px]:tw-border-gray-400"
                    >
                      <option value="" className="" selected>
                        9:00AM
                      </option>
                      {Object.values(timeOptions).map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                          {timeOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="tw-text-center tw-items-center tw-justify-center tw-flex">
                    -
                  </span>
                  <div className="tw-flex tw-justify-center tw-items-center">
                    {/* <h3>Select Time:</h3> */}
                    <select
                      value={selectTime[day] || ""}
                      onChange={(e) => handleTimeEndChange(day, e.target.value)}
                      className="tw-w-28 tw-h-10 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 max-[512px]:tw-w-20 max-[512px]:tw-h-8 max-[512px]:tw-text-xs max-[512px]:tw-px-1 max-[512px]:tw-py-1 max-[512px]:tw-text-center max-[512px]:tw-rounded-sm max-[512px]:tw-border-2 max-[512px]:tw-border-gray-400"
                    >
                      <option value="" className="tw-text-gray-200">
                        8:00PM
                      </option>
                      {Object.values(timeOptions).map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                          {timeOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="">
                  <p> &nbsp; &nbsp; &nbsp; Unavailable</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    };
    setComponents([...components, newComp]);
  };

  const deleteSchedule = (idToDelete) => {
    const updatedSchedules = components.filter(
      (schedule) => schedule.props.id !== idToDelete,
    );
    setComponents(updatedSchedules);
  };

  return (
    <div
      key={key}
      className="tw-text-black tw-flex tw-justify-center text-center tw-p-6 tw-items-center tw-flex-col tw-w-full"
    >
      <div className="tw-font-semibold tw-text-4xl tw-pb-6">Availability</div>
      <div className="tw-flex tw-gap-6">
        <Button
          onClick={handleCalender}
          className=""
          variant={calendarBtnVariant}
          text="Calendar"
        />

        <Button
          onClick={handleSchedule}
          className=""
          variant={scheduleBtnVariant}
          text="Schedule"
        />
      </div>
      <hr className="tw-h-px tw-my-5 tw-bg-gray-300 tw-border-0 tw-flex tw-justify-center tw-items-center tw-dark:bg-gray-700 tw-flex-wrap" />
      <div className="tw-flex tw-flex-col tw-flex-wrap tw-pt-6 max-md:tw-w-full">
        {calender && (
          <div>
            <Card updateMeetLink={handleLinkUpdate} />
          </div>
        )}
        {schedule && (
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-flex tw-gap-6 mx-auto">
              <button
                onClick={() => setShowDefault(true)}
                className="tw-bg-gray-200 tw-rounded-md tw-p-3 tw-font-semibold hover:tw-bg-gray-300 tw-ease-in-out tw-duration-150 tw-transition-all"
              >
                Default
              </button>
              <button
                onClick={createSchedule}
                className="tw-bg-gray-200 tw-rounded-md tw-p-3 tw-font-semibold hover:tw-bg-gray-300 tw-ease-in-out tw-duration-150 tw-transition-all"
                disabled
              >
                + New Schedule
              </button>
            </div>

            {showDefault ? (
              <div className="tw-mt-8 tw-flex tw-flex-col tw-rounded-md tw-p-10 tw-border-2 tw-w-full">
                <div className="tw-flex tw-justify-between tw-gap-4 tw-w-full">
                  <h2 className="tw-font-semibold tw-text-lg">Default</h2>
                  <div className="tw-flex tw-gap-4">
                    {!loader ? (
                      <button
                        className=" tw-bg-black tw-ease-in-out tw-duration-200 tw-transition-all tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
                        onClick={() => updateSchedules()}
                      >
                        Save
                      </button>
                    ) : (
                      <Loader />
                    )}
                    <button
                      onClick={() => setShowDefault(false)}
                      className=" tw-bg-black tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
                    >
                      Hide
                    </button>
                  </div>
                </div>

                {weekdays.map((day, index) => (
                  <div
                    key={index}
                    className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-between tw-items-center max-[708px]:tw-flex-col max-[708px]:tw-items-start tw-gap-4"
                  >
                    <div className="tw-flex tw-items-center tw-gap-2 tw-justify-center tw-text-center">
                      <input
                        id={index}
                        type="checkbox"
                        checked={checkedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="tw-w-5 tw-h-5 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 "
                      />
                      <label
                        for={index}
                        className="tw-flex tw-justify-center tw-text-center tw-items-center"
                      >
                        <span className="tw-font-medium tw-text-center tw-items-center tw-justify-center tw-flex tw-relative tw-top-1">
                          {day}
                        </span>
                      </label>
                    </div>

                    {listSchedules.filter((obj) => obj.day === day).length >
                    0 ? (
                      listSchedules
                        .filter((obj) => obj.day === day)
                        .map((schedule) => {
                          return (
                            <div className="tw-flex tw-gap-5">
                              <div className="tw-flex tw-justify-center tw-items-center">
                                {/* <h3>Select Time:</h3> */}
                                {/* <select
                                  value={schedule.startsAt}
                                  onChange={(e) =>
                                    handleTimeStartChange(day, e.target.value)
                                  }
                                  className="tw-w-28 tw-h-10 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 max-[512px]:tw-w-20 max-[512px]:tw-h-8 max-[512px]:tw-text-xs max-[512px]:tw-px-1 max-[512px]:tw-py-1 max-[512px]:tw-text-center max-[512px]:tw-rounded-sm max-[512px]:tw-border-2 max-[512px]:tw-border-gray-400"
                                >
                                  {Object.values(timeOptions).map(
                                    (timeOption) => (
                                      <option
                                        key={timeOption}
                                        value={timeOption}
                                        selected={
                                          schedule.startsAt === timeOption
                                        }
                                      >
                                        {timeOption}
                                      </option>
                                    ),
                                  )}
                                </select> */}
                                {/* <div className="tw-flex tw-gap-5">
                                  <div className="tw-flex tw-justify-center tw-items-center">
                                    <div className="tw-flex tw-items-center">
                                      <input
                                        type="text"
                                        value={schedule.startsAt}
                                        onChange={(e) =>
                                          handleTimeStartChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-20 tw-h-10 tw-rounded-l-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div> */}
                                <div className="tw-flex tw-gap-5">
                                  <div className="tw-flex tw-justify-center tw-items-center">
                                    <div className="tw-flex tw-items-center">
                                      <select
                                        value="▼"
                                        onChange={(e) =>
                                          handleTimeStartChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-7 tw-h-10 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      >
                                        {generateTimeOptions()}
                                      </select>
                                      <input
                                        type="text"
                                        value={schedule.startsAt}
                                        onChange={(e) =>
                                          handleTimeStartChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-14 tw-h-10 tw-border-2 tw-border-l-0 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className="tw-text-center tw-items-center tw-justify-center tw-flex">
                                -
                              </span>
                              <div className="tw-flex tw-justify-center tw-items-center tw-text-center">
                                {/* <h3>Select Time:</h3> */}
                                {/* <select
                                  value={schedule.endsAt || ""}
                                  onChange={(e) =>
                                    handleTimeEndChange(day, e.target.value)
                                  }
                                  className="tw-w-28 tw-h-10 tw-rounded-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 max-[512px]:tw-w-20 max-[512px]:tw-h-8 max-[512px]:tw-text-xs max-[512px]:tw-px-1 max-[512px]:tw-py-1 max-[512px]:tw-text-center max-[512px]:tw-rounded-sm max-[512px]:tw-border-2 max-[512px]:tw-border-gray-400"
                                >
                                  {Object.values(timeOptions).map(
                                    (timeOption) => (
                                      <option
                                        key={timeOption}
                                        value={timeOption}
                                        selected={
                                          schedule.endsAt === timeOption
                                        }
                                      >
                                        {timeOption}
                                      </option>
                                    ),
                                  )}
                                </select> */}
                                {/* <div className="tw-flex tw-gap-5">
                                  <div className="tw-flex tw-justify-center tw-items-center">
                                    <div className="tw-flex tw-items-center">
                                      <input
                                        type="text"
                                        value={schedule.endsAt}
                                        onChange={(e) =>
                                          handleTimeEndChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-20 tw-h-10 tw-rounded-l-md tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div> */}
                                <div className="tw-flex tw-gap-5">
                                  <div className="tw-flex tw-justify-center tw-items-center">
                                    <div className="tw-flex tw-items-center">
                                      <select
                                        value="▼"
                                        onChange={(e) =>
                                          handleTimeEndChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-7 tw-h-10 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      >
                                        {generateTimeOptions()}
                                      </select>
                                      <input
                                        type="text"
                                        value={schedule.endsAt}
                                        onChange={(e) =>
                                          handleTimeEndChange(
                                            day,
                                            e.target.value,
                                          )
                                        }
                                        className="tw-w-14 tw-h-10 tw-border-2 tw-border-l-0 tw-flex tw-justify-center tw-items-center tw-border-gray-400 tw-text-xs tw-px-1 tw-text-center tw-rounded-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p>Unavailble</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="tw-mt-8 tw-flex tw-flex-col tw-rounded-md tw-p-10 tw-border-2 tw-w-full">
                <div className="tw-flex tw-justify-between">
                  <h2 className="tw-font-semibold tw-text-lg">Default</h2>
                  <button
                    onClick={() => setShowDefault(true)}
                    className="tw-bg-black tw-text-center tw-text-white tw-rounded-md tw-px-4 tw-py-2 hover:tw-bg-gray-700 tw-font-semibold tw-text-base"
                  >
                    Show
                  </button>
                </div>
              </div>
            )}
            {/* New Schedule */}
            <div>
              {components.map((component, index) => (
                <div key={index}>
                  {showNewSchedule
                    ? component.componentShow
                    : component.componentHidden}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender;
