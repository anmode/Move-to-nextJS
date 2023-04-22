import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));
const SimpleBanner = dynamic(() => import("../components/SimpleBanner"));

function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: document.querySelector("#name").value,
      to_name: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
      subject: document.querySelector("#subject").value,
    };
    console.log(templateParams);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_US_KEY,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert("Sent!");
          console.log(result.text);
        },
        (error) => {
          alert("Cannot send your message sorry!");
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Header />
      <SimpleBanner bannerTittle="Contact us" siteName="Contact" />
      <main>
        <section className="contact-section">
          <div className="container">
            <div className="d-none d-sm-block mb-5 pb-4"></div>
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Get in Touch</h2>
              </div>
              <div className="col-lg-8">
                <form
                  className="form-contact contact_form"
                  id="contactForm"
                  ref={form}
                  onSubmit={sendEmail}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control w-100"
                          name="message"
                          id="message"
                          cols={30}
                          rows={9}
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Message'"
                          placeholder=" Enter Message"
                          // value={userMessage}
                          // onChange={(e) => setUserMessage(e.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control valid"
                          name="name"
                          id="name"
                          type="text"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter your name'"
                          placeholder="Enter your name"
                          // value={userName}
                          // onChange={(e) => setUserName(e.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control valid"
                          name="email"
                          id="email"
                          type="email"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter email address'"
                          placeholder="Email"
                          // value={userEmail}
                          // onChange={(e) => setUserEmail(e.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="subject"
                          id="subject"
                          type="text"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Subject'"
                          placeholder="Enter Subject"
                          // value={userSubject}
                          // onChange={(e) => setUserSubject(e.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm boxed-btn"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-home" />
                  </span>
                  <div className="media-body">
                    <h3>Kishanpur</h3>
                    <p>Aligarh, Uttar Pradesh</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-tablet" />
                  </span>
                  <div className="media-body">
                    <h3>9368086395</h3>
                    <p>Mon to Fri 9am to 6pm</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-email" />
                  </span>
                  <div className="media-body">
                    <h3>contact.grabtern@gmail.com</h3>
                    <p>Send us your query anytime!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const PASSWORD = "!@SayyidMuhammad878@!";

export default Contact;
