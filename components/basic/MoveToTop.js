import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 15);
  };

  return (
    <div
      id="top-btn"
      className={`tw-fixed tw-bottom-8 tw-right-8 tw-z-50 tw-cursor-pointer tw-text-[#845ec2] hover:tw-text-blue-500 tw-opacity-0 transition-opacity duration-300 ${isVisible ? "tw-opacity-100" : ""
        }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <FaArrowCircleUp
        onClick={scrollToTop}
        className="tw-bg-white tw-rounded-full"
        fontSize={45}
      />
    </div>
  );
};

export default ScrollButton;
