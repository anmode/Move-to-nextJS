import React, { useEffect, useState } from "react";
import axios from "axios";
import { encryptData, decryptData } from "../../hook/encryptDecrypt";
import { divide } from "lodash";
function Profile({ mentorDetail }) {
  const initialFormData = {
    name: mentorDetail?.name || "", // Make sure to handle null/undefined case
    username: mentorDetail?.username || "",
    email: mentorDetail?.email || "",
    mobile: mentorDetail?.mobile || "",
    internAt: mentorDetail?.internAt || "",
    currentStatus: mentorDetail?.currentStatus || "",
    social: {
      linkedin: mentorDetail?.social?.linkedin || "",
      twitter: mentorDetail?.social?.twitter || "",
    },
    description: mentorDetail?.description || "",
    image: mentorDetail?.mentorImg || "",
    bookSession: mentorDetail?.bookSession || [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [msg, setMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  // normal input onChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to fetch mentor profile
  const getMentorProfile = async () => {
    const mentorData = localStorage.getItem("mentorData");
    const mentorToken = decryptData(mentorData).mentorToken;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/getprofile/${mentorToken}`;

    try {
      const response = await axios.get(url);
      const data = decryptData(response.data);
      setFormData(data);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  //fetching mentor profile onload
  useEffect(() => {
    getMentorProfile();
  }, []);

  // converting image to base64 function
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // onChange function for socials input
  const handleSocialChange = (e) => {
    setFormData({
      ...formData,
      social: { ...formData.social, [e.target.name]: e.target.value },
    });
  };

  // onChange function for image input
  const handleUploadImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setFormData({ ...formData, image: base64 });
  };

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const mentorData = localStorage.getItem("mentorData");
      const mentorToken = decryptData(mentorData).mentorToken;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentors/updateprofile`;

      const encryptedData = encryptData({
        mentorLoginToken: mentorToken,
        ...formData,
      });

      const response = await axios.put(url, { token: encryptedData }); // Send the updated data to the backend
      setformData(decryptData(response.data));

      alert(response); // Display the response message from the backend

      setModalOpen(false);
      setMsg("Changes saved successfully."); // Set success message
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while saving changes.");
      }
    }
  };
  return (
    <div className="tw-border-2 tw-h-full tw-flex tw-justify-center">
      <form className="tw-w-full tw-max-w-2xl" onSubmit={handleSubmit}>
      <h2 className="tw-text-center tw-font-semibold tw-text-5xl tw-mt-7">Edit your Profile</h2>
      {step === 1 ? (
      <><div class="tw-grid md:tw-grid-cols-2 md:tw-gap-6 md:tw-m-[1rem] tw-mb-6">
            <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
              <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="grid-first-name">
                NAME
              </label>
              <input
                type="text"
                name="name"
                class="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                onChange={(e) => handleChange(e)}
                placeholder={mentorDetail?.name}
                value={formData.name} />
            </div>
            <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
              <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="grid-first-name">
                USERNAME
              </label>
              <input
                class="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                type="text"
                name="username"
                onChange={(e) => handleChange(e)}
                placeholder={mentorDetail?.username}
                value={formData.username} />
            </div>
          </div>
          <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-6 md:tw-m-[1rem]">
              <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="grid-first-name">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                  placeholder={mentorDetail?.email}
                  value={formData.email} />
              </div>
              <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="grid-first-name">
                  Phone
                </label>
                <input
                  type="number"
                  name="mobile"
                  onChange={(e) => handleChange(e)}
                  className="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                  placeholder={mentorDetail?.mobile}
                  value={formData.mobile} />
              </div>
            </div><div className="tw-grid md:tw-grid-cols-2 md:tw-gap-6 md:tw-m-[1rem]">
              <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="linkedin">LINKEDIN</label>

                <input
                  type="text"
                  name="linkedin"
                  className="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                  onChange={(e) => handleSocialChange(e)}
                  placeholder={mentorDetail?.linkedin}
                  value={formData.social.linkedin} />
              </div>
              <div class="tw-relative tw-z-0 tw-w-full tw-mb-6 tw-group">
                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="twitter">TWITTER</label>
                <input
                  type="text"
                  name="twitter"
                  className="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                  onChange={(e) => handleSocialChange(e)}
                  placeholder={mentorDetail?.twitter}
                  value={formData.social.twitter} />
              </div>
            </div><div className="tw-grid md:tw-m-[1rem]">
              <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2" for="description">DESCRIPTION</label>
              <textarea
                cols="10"
                rows="7"
                name="description"
                className="tw-appearance-none tw-block tw-w-full tw-bg-gray-200 tw-text-gray-700 tw-border tw-border-[#845ec2] tw-rounded tw-py-3 tw-px-4 tw-mb-3 tw-leading-tight focus:tw-outline-none focus:tw-bg-white"
                onChange={(e) => handleChange(e)}
                placeholder={mentorDetail?.description}
                value={formData.description} />
            </div>
          </>
      ): (
        <>{error && <div style={{ color: "red" }}>{error}</div>}</>
      )}
      {msg && (
        <div style={{ color: "green", gridColumn: "1/3" }}>{msg}</div>
      )}
      <div className="tw-flex tw-justify-center">
      <button
        style={{
          color: "white",
          width: "fit-content",
          padding: "15px 25px",
          backgroundColor: "#845ec2",
          cursor: "pointer",
          boxShadow: "6px 4px 13px -2px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s", // Add a transition for smooth color change
          // Responsive styles
          fontSize: "14px", // Adjust font size for mobile view
          whiteSpace: "nowrap", // Prevent button text from wrapping
          overflow: "hidden", // Hide overflowing text
          textOverflow: "ellipsis", // Show ellipsis (...) for overflow
          maxWidth: "100%", // Ensure the button doesn't exceed container width
        }}
        type="submit"
        onClick={handleSubmit}
      >
        Save changes
      </button>
      </div>
    </form>
    </div>
  );
}

export default Profile;
