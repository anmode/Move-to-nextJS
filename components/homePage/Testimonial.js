import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IconCard, ProfileCard } from "../UI";

function Testimonial({
  testimonialUserName,
  testimonialUserHeadline,
  testimonialUserImage,
  testimonialRate,
  testimonialHeadline,
  testimonialDescription,
}) {
  return (
    <IconCard
      className="tw-w-auto tw-min-h-full tw-h-[320px] max-[599px]:tw-h-[320px] max-[863px]:tw-h-[480px] tw-flex tw-flex-col"
      Icon={FaQuoteLeft}
      heading={testimonialHeadline}
      body={testimonialDescription}
      intent="bg"
      size="lg"
    >
      <div className="tw-mt-auto">
        {/* user details */}
        <ProfileCard
          className="tw-mt-4"
          image={testimonialUserImage}
          heading={testimonialUserName}
          subheading={testimonialUserHeadline}
          size="sm"
        />
        {/* rating */}
        <div className="tw-text-yellow-400 tw-ml-12 -tw-mt-2">
          {Array(Math.floor(testimonialRate))
            .fill("")
            .map((_, index) => (
              <i key={index} className="fas fa-star"></i>
            ))}

          {testimonialRate.toString().includes(".") ? (
            <i className="fas fa-star-half"></i>
          ) : null}
        </div>
      </div>
    </IconCard>
  );
}

export default Testimonial;
