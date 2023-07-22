import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.name !== null || userData.token !== null) {
        router.push("/");
      }
    }
  }, [router]);
}

function Register({ handleLogPageToggle }) {
  useRedirectIfAuthenticated();

  const router = useRouter();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerificationSent(false);

    if (data.password !== data.confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userRegister`;
      await axios.post(url, data);
      setVerificationSent(true);
      setTimeout(() => {
        router.push("/");
      }, 5000); // Redirect after 5 seconds
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <>
      <form
        className="form-default mx-5"
        action="login-bg.mp4"
        onSubmit={handleSubmit}
        style={{ marginTop: "10vh" }}
      >
        <div className="d-flex flex-column justify-content-start tw-w-full  md:tw-py-[5vh] md:tw-px-[3vw]  tw-py-[4vh] tw-px-[5vw] tw-shadow-2xl">
          <h2 className="text-left tw-text-black tw-text-5xl  tw-font-bold">
            Registration
          </h2>
          <p className=" tw-text-gray-500 tw-mb-5">
            The faster you fill up, the faster you get a internship
          </p>
          <div className="tw-flex tw-flex-col  tw-mb-10">
            <label
              for="name"
              className="tw-text-3xl tw-text-left tw-font-medium "
            >
              Full name
            </label>
            <input
              type="text"
              placeholder="Full name"
              name="fullName"
              onChange={handleChange}
              value={data.fullName}
              className="tw-px-2 tw-border-b-[1px] tw-border-b-black tw-py-3 "
            />
          </div>
          <div className="tw-flex tw-flex-col  tw-mb-10">
            <label
              for="name"
              className="tw-text-3xl tw-text-left tw-font-medium tw-mr-10"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={data.email}
              className="tw-px-2 tw-border-b-[1px] tw-border-b-black tw-py-3 "
            />
          </div>
          <div className="tw-flex tw-flex-col  tw-mb-10">
            <label
              for="name"
              className="tw-text-3xl tw-text-left tw-font-medium tw-mr-10"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              className="tw-px-2 tw-border-b-[1px] tw-border-b-black tw-py-3 "
            />
          </div>
          <div className="tw-flex tw-flex-col  tw-mb-10">
            <label
              for="name"
              className="tw-text-3xl tw-text-left tw-font-medium tw-mr-10"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data.confirmPassword}
              className="tw-px-2 tw-border-b-[1px] tw-border-b-black tw-py-3 "
            />
          </div>
          {verificationSent && (
            <p style={{ color: "green" }}>
              An email has been sent to {data.email}. Please check your inbox to
              verify your account.
            </p>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div>
            <input
              type="submit"
              name="submit"
              value="Registration"
              style={{
                background:
                  "linear-gradient( to top, rgb(83, 116, 255) 0%, rgb(127, 102, 255) 40%, rgb(187, 85, 255) 95%, rgb(192, 84, 255) 100% )",
              }}
              className="tw-px-10 tw-font-semibold tw-py-[6px] tw-text-white tw-rounded-3xl tw-cursor-pointer tw-w-full"
            />
          </div>
          <div className="link-div tw-font-medium tw-mt-10">
            Already have an account?
            <button
              className="tw-ml-0 md:tw-ml-2 hover:tw-text-gray-400 tw-text-blue-700"
              style={{ textDecoration: "none" }}
              onClick={() => handleLogPageToggle()}
            >
              Login{" "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
