import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";
import style from "../styles/contact.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { Section } from "../components/UI";
import { TfiHome, TfiTablet, TfiEmail } from "react-icons/tfi";
const Footer = dynamic(() => import("../components/layout/Footer"));
const Header = dynamic(() => import("../components/layout/Header"));

function Contact() {
  const form = useRef(null);
  //create a schema for a form
  const validForm = yup.object().shape({
    name: yup.string().required("Please enter your name!"),
    email: yup
      .string()
      .email("Please enter a valid Email!")
      .required("Please enter a email"),
    message: yup.string().required("Please enter a message!"),
    subject: yup.string().required("Please enter a subject!"),
  });

  //check value of forms
  const {
    values,
    touched,
    errors,
    action,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      message: "",
      name: "",
      email: "",
      subject: "",
    },

    validationSchema: validForm,
  });

  function showToast(message) {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
    });
  }

  //send mail after validation
  const sendEmail = async (e) => {
    e.preventDefault();

    handleSubmit;
    const NameRegex = /^[a-zA-Z\s]+$/;
    if (values.message === "") {
      showToast("Please enter a message!");
    } else if (values.name === "") {
      showToast("Please enter a name!");
    } else if (!NameRegex.test(values.name)) {
      showToast("Please enter a valid name");
    } else if (values.email === "") {
      showToast("Please enter a email!");
    } else if (values.subject === "") {
      showToast("Please enter a subject!");
    } else {
      const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
        subject: document.querySelector("#subject").value,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_US_KEY,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        )
        .then(
          (result) => {
            toast("Contact form sent successfully !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "success",
            });
            console.log(result.text);
          },
          (error) => {
            toast("Failed to send contact !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            });
            console.error(error.text);
          },

          (values.message = ""),
          (values.name = ""),
          (values.email = ""),
          (values.subject = ""),
          handleChange,
        );
    }
  };

  return (
    <>
      <Header />
      <Section
        kicker="Contact Us"
        heading="Talk to our management team"
        align="center"
        className="tw-mt-10 tw-pb-0"
      ></Section>

      <main className={style.main}>
        <div className={style.mainbody}>
          <div id="both">
            <section className={style.csection}>
              <div className="container">
                <div className="row tw-rlative ">
                  <div className="col-12"></div>
                  <div className={`${style.flexx}`}>
                    <div className={`${style.offsetlg} col-lg-3 bg-slate-100`}>
                      <div className={`${style.contactinfo} media`}>
                        <div className={style.media_head}>
                          <h3>Contact Information</h3>
                        </div>
                      </div>
                      <div class={style.centerr}>
                        <div className={`${style.contactinfo} media`}>
                          <span className={style.contactinfo__icon}>
                            <TfiHome className="tw-text-[27px]" />
                          </span>
                          <div className={style.media_body}>
                            <h3>Kishanpur</h3>
                            <p>Aligarh, Uttar Pradesh</p>
                          </div>
                        </div>
                        <div className={`${style.contactinfo} media`}>
                          <span className={style.contactinfo__icon}>
                            <TfiTablet className="tw-text-[27px]" />
                          </span>
                          <div className={style.media_body}>
                            <h3>9368086395</h3>
                            <p>Mon to Fri 9am to 6pm</p>
                          </div>
                        </div>
                        <div className={`${style.contactinfo} media`}>
                          <span className={style.contactinfo__icon}>
                            <TfiEmail className="tw-text-[27px]" />
                          </span>
                          <div className={style.media_body}>
                            <h3>contact.grabtern@gmail.com</h3>
                            <p>Send us your query anytime!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form
                      className="form-contact contact_form"
                      id="contactForm"
                      ref={form}
                      method="post"
                      aria-label="Contact form"
                    >
                      <ToastContainer limit={1} />
                      <div className={`${style.cf} row`}>
                        <h2 className={style.ctitle}>Get in Touch</h2>
                        <div className="col-12">
                          <div className={style.fgroup}>
                            <textarea
                              className={"form-control w-100"}
                              name="message"
                              id="message"
                              cols={30}
                              rows={5}
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Enter Message'"
                              placeholder=" Enter Message"
                              required
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "2px solid var(--base-300)",
                                color: "var(--base-400)",
                                outline: "none",
                                resize: "vertical",
                              }}
                              aria-required="true"
                              aria-label="Enter you message"
                              // value={userMessage}
                              // onChange={(e) => setUserMessage(e.value)}
                            />
                          </div>
                        </div>
                        {
                          //(errors.message!=='')?showToast(errors.message):errors.message=''
                        }
                        <div className="col-sm-6">
                          <div className={style.fgroup}>
                            <input
                              className={"form-control valid"}
                              name="name"
                              id="name"
                              type="text"
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Enter your name'"
                              placeholder="Enter your name"
                              required
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "2px solid var(--base-300)",
                                color: "var(--base-400)",
                                outline: "none",
                              }}
                              aria-required="true"
                              aria-label="Enter you name"
                              // onChange={(e) => setUserName(e.value)}
                            />
                          </div>
                        </div>

                        {
                          //(errors.name!=='')?showToast(errors.name):errors.name=''
                        }
                        <div className="col-sm-6">
                          <div className={style.fgroup}>
                            <input
                              className={"form-control valid"}
                              name="email"
                              id="email"
                              type="email"
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Enter email address'"
                              placeholder="Email"
                              required
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "2px solid var(--base-300)",
                                color: "var(--base-400)",
                                outline: "none",
                              }}
                              aria-required="true"
                              aria-label="Enter you email"
                              // value={userEmail}
                              // onChange={(e) => setUserEmail(e.value)}
                            />
                          </div>
                        </div>
                        {
                          //(errors.email!=='')?showToast(errors.email):errors.email=''
                        }
                        <div className="col-12">
                          <div className={style.fgroup}>
                            <input
                              className={"form-control valid"}
                              name="subject"
                              id="subject"
                              type="text"
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Enter Subject'"
                              placeholder="Enter Subject"
                              required
                              value={values.subject}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "2px solid var(--base-300)",
                                color: "var(--base-400)",
                                outline: "none",
                              }}
                              aria-required="true"
                              aria-label="Enter you subject"
                              // value={userSubject}
                              // onChange={(e) => setUserSubject(e.value)}
                            />
                          </div>
                        </div>
                        {
                          //(errors.subject!=='')?showToast(errors.subject):errors.subject=''
                        }
                        <div class="sendbtn">
                          <button
                            type="button"
                            class="md:tw-w-auto px-10 tw-h-16 tw-text-white tw-bg-[#845ec2] tw-border-0 tw-py-2 tw-px-6 focus:tw-outline-none hover:tw-bg-[#6b21a8] tw-rounded-lg tw-font-semibold"
                            onClick={sendEmail}
                            style={{
                              padding: "5px 15px",
                              width: "150px",
                              height: "50px",
                              marginLeft: "33vh",
                              align: "center",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "whitesmoke")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "#fff")
                            }
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
