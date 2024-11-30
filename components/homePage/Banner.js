import React, { useState } from "react";
import { ButtonLink } from "../UI";
import Loader from "../UI/Loader";

function Banner({ isMentorLoggedIn }) {
  const [loader, setLoader] = useState(0);
  return (
    <div className="tw-min-h-screen tw-w-full tw-overflow-hidden">
      <div className="tw-min-h-screen tw-w-full tw-max-w-7xl tw-mx-auto tw-flex tw-items-center tw-px-4">
        <div className="tw-w-full tw-grid tw-grid-cols-12">
          <div className="tw-col-span-12 lg:tw-col-span-5">
            <div className="tw-h-full tw-flex tw-items-center tw-mb-8 lg:tw-mb-0">
              {/* text box */}
              <div className="tw-mt-20 lg:tw-mt-12 tw-text-center lg:tw-text-left tw-font-sans tw-space-y-4">
                <h1 className="tw-font-medium tw-text-4xl lg:tw-text-5xl !tw-leading-[60px] tw-font-[Poppins]">
                  Grab your Intern with GrabTern
                </h1>
                <p className="tw-text-lg">
                  Book a meeting with a past intern to receive one-on-one
                  mentoring and enhance your chances of landing your ideal
                  intern.
                </p>
                <div className="tw-w-full tw-flex tw-items-center tw-justify-center lg:tw-justify-start tw-gap-2 tw-pt-6">
                  {loader == 1 ? (
                    <div className="tw-ml-16">
                      <Loader width="25px" />
                    </div>
                  ) : (
                    <div onClick={() => setLoader(1)}>
                      <ButtonLink
                        href="/mentor/list"
                        text="Find Mentor"
                        className="tw-min-w-[130px]"
                      />
                    </div>
                  )}
                  {loader == 2 ? (
                    <Loader width="25px" />
                  ) : isMentorLoggedIn ? (
                    <div onClick={() => setLoader(2)}>
                      <ButtonLink
                        href="/dashboard/mentor"
                        text="Dashboard"
                        variant="outline"
                        className="tw-min-w-[130px]"
                      />
                    </div>
                  ) : (
                    <div onClick={() => setLoader(2)}>
                      <ButtonLink
                        href="//mentor/register"
                        text="Be a Mentor"
                        variant="outline"
                        className="tw-min-w-[130px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* image and decoration */}
          <div className="tw-relative tw-col-span-12 lg:tw-col-span-7">
            <img
              src="./hero.svg"
              className="tw-block tw-w-full tw-max-w-[620px] tw-mx-auto"
              alt="Hero image"
            />
            {/* decoration */}
            <div className="tw-absolute tw-top-6 tw-left-0 tw-h-14 tw-w-14 tw-hidden md:tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-2xl tw-bg-base-100 dark:tw-bg-base-300 tw-shadow-xl tw-shadow-muted-300/30 ">
              📈
            </div>
            <div className="tw-absolute tw-top-24 tw-left-24 tw-h-10 tw-w-10 tw-hidden md:tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-2xl tw-bg-base-100 dark:tw-bg-base-300 tw-shadow-xl tw-shadow-muted-300/30">
              🚀
            </div>
            <div className="tw-absolute -tw-bottom-10 tw-right-0 tw-h-16 tw-w-16 tw-hidden md:tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-4xl tw-bg-base-100 dark:tw-bg-base-300 tw-shadow-xl tw-shadow-muted-300/30">
              🎓
            </div>
            <div className="tw-absolute -tw-top-12 tw-left-1/3 tw-h-16 tw-w-16 tw-hidden lg:tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-4xl tw-bg-base-100 dark:tw-bg-base-300 tw-shadow-xl tw-shadow-muted-300/30">
              💡
            </div>
            {/* 4 mentor card */}
            <div className="tw-hidden md:tw-block tw-absolute -tw-bottom-12 tw-left-8 tw-bg-base-100 tw-border tw-border-base-300 tw-rounded-xl tw-p-5 tw-shadow-xl tw-shadow-muted-400/10">
              <div className="tw-flex tw-justify-between tw-mb-4">
                <h3 className="tw-font-heading tw-font-medium">Mentors</h3>
                <span className="tw-font-sans tw-text-sm tw-text-base-500">
                  4 New
                </span>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
                <img
                  className="tw-object-cover tw-w-12 tw-h-12 tw-rounded"
                  src="https://media.cssninja.io/shuriken/avatars/2.svg"
                  alt="Avatar"
                  width="48"
                  height="48"
                />
                <img
                  className="tw-object-cover tw-w-12 tw-h-12 tw-rounded"
                  src="https://media.cssninja.io/shuriken/avatars/4.svg"
                  alt="Avatar"
                  width="48"
                  height="48"
                ></img>
                <img
                  className="tw-object-cover tw-w-12 tw-h-12 tw-rounded"
                  src="https://media.cssninja.io/shuriken/avatars/3.svg"
                  alt="Avatar"
                  width="48"
                  height="48"
                ></img>
                <img
                  className="tw-object-cover tw-w-12 tw-h-12 tw-rounded"
                  src="https://media.cssninja.io/shuriken/avatars/6.svg"
                  alt="Avatar"
                  width="48"
                  height="48"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
