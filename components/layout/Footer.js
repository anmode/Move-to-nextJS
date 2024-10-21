
import { Button, IconLink, Input } from "../UI";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import {
  RiFacebookFill,
  RiLinkedinFill,
  RiInstagramFill,
  RiGithubFill,
  RiTwitterXFill,
} from "react-icons/ri";
import FooterColumn from "./FooterColumn";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../UI/Loader";

export default function OptimizedFooter() {
  // Arrays for the list items
  const studentItems = [
    'One to One Mentorship',
    'Networking',
    'Live Sessions',
    'Resources',
  ];

  const mentorItems = [
    'Community Base',
    'Self Satisfaction',
    'Build Leadership Skills',
  ];

  const legalItems = [
    'Refund Policy',
    'Terms & Conditions',
    'Privacy Policy',
    'Contact Us',
  ];

  // State for email input and validation error
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle email input change and validate
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!emailPattern.test(value));
  };

  return (
    <Sheet
      variant="solid"
      sx={{
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: 'sm' },
        backgroundColor: 'white',
        color: '#6A0DAD',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Left - Logo Image and Text */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card
            variant="soft"
            size="sm"
            sx={{
              minWidth: { xs: '100%', md: 'auto' },
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image alt="Logo" src="/GrabternLogo.png" width={100} height={100} />
          </Card>
          <Typography level="h6" sx={{ textAlign: 'center', mt: 1 }}>
            Grabtern, Grab your internship
          </Typography>
        </Box>

        {/* Center - Sitemap and Products */}
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{
            flexGrow: 0,
            '--ListItem-radius': '8px',
            textAlign: 'center',
            width: { xs: '100%', md: 'auto' },
          }}
        >
          {/* Map Function for List Items */}
          {[{ title: 'For Students', items: studentItems }, { title: 'For Mentors', items: mentorItems }, { title: 'Legal', items: legalItems }]
            .map((section, idx) => (
              <ListItem key={idx} nested sx={{ width: { xs: '50%', md: 180 } }}>
                <ListSubheader sx={{ fontWeight: 'xl', color: 'black' }}>{section.title}</ListSubheader>
                <List>
                  {section.items.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemButton sx={{ color: '#6A0DAD', '&:hover': { textDecoration: 'underline' } }}>
                        {item}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
        </List>


          <FooterColumn
            heading="Services to Mentors"
            links={[
              { href: "#", text: "Community Base" },
              { href: "#", text: "Self Satisfaction" },
              { href: "#", text: "Build Leadership skills" },
              { href: "#", text: "Get Paid" },
            ]}
          />

          <FooterColumn
            heading="Grabtern"
            links={[
              { href: "/refundandcancellation", text: "Refund Policy" },
              { href: "/termsandcondition", text: "Terms and Condition" },
              { href: "/privacy", text: "Privacy Policy" },
              { href: "/contact", text: "Contact Us" },
            ]}
          />
        </div>
      </div>
      <hr className="tw-border-base-300" />
      {/* subscribe and socials */}
      <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-px-4">
        <div className="tw-py-8 tw-flex tw-items-center tw-flex-col md:tw-flex-row md:tw-justify-between">
          {/* subscribe form */}
          <div className="tw-flex tw-mb-4 md:tw-mb-0">
            {subscriptionSuccess ? (
              <div className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-h-full tw-animate-fade-in">
                <FaCheckCircle className="tw-text-primary-100 tw-text-2xl tw-text-center" />
                <p className="tw-text-xl tw-text-gray-500">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form className="md:tw-flex " onClick={handleSubmit}>
                <label htmlFor="email" className="tw-sr-only">
                  Please provide your email address to subscribe to our
                  newsletter
                </label>
                <div className="tw-mb-3   md:tw-mb-0 md:tw-mr-2">
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="tw-w-full md:tw-mb-0 md:tw-mr-2 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {showalert.length > 0 ? (
                    <h3 className="tw-text-red-400 tw-text-[2vh] tw-font-semibold tw-mt-[1vh] tw-ml-[1vh]">
                      {showalert}
                    </h3>
                  ) : (
                    ""
                  )}
                </div>
                {!loader ? (
                  <Button
                    text="Subscribe"
                    type="submit"
                    onClick={handleSubmit}
                    className="tw-w-full md:tw-w-max tw-h-fit"
                  />
                ) : (
                  <Loader width="25px" />
                )}
              </form>
            )}
          </div>
          {/* social links */}
          <div className="tw-flex tw-gap-1">
            <IconLink
              href="#"
              aria-label="Follow us on Facebook"
              title="Facebook (External Link)"
              rel="noopener noreferrer"
              Icon={RiFacebookFill}
              variant="secondary"
            />
            <IconLink
              href="#"
              aria-label="Follow us on Twitter"
              title="Twitter (External Link)"
              rel="noopener noreferrer"
              Icon={RiTwitterXFill}
              variant="secondary"
            />
            <IconLink
              href="#"
              aria-label="Follow us on Instagram"
              title="Instagram (External Link)"
              rel="noopener noreferrer"
              Icon={RiInstagramFill}
              variant="secondary"
            />
            <IconLink
              href="#"
              aria-label="Follow us on Linkedin"
              title="Linkedin (External Link)"
              rel="noopener noreferrer"
              Icon={RiLinkedinFill}
              variant="secondary"
            />
            {/* Display error message if email is invalid */}
            {emailError && (
              <Typography color="danger" sx={{ mt: 1, fontSize: 'sm', color: 'red' }}>
                Please enter a valid email address.
              </Typography>
            )}
          </Box>

          {/* Socials Section */}
          {/* Socials Section */}
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
  <Box sx={{ display: 'flex', gap: 2 }}>
    <IconButton variant="plain">
      <FacebookRoundedIcon />
    </IconButton>
    <IconButton variant="plain">
      <XIcon />
    </IconButton>
    <IconButton variant="plain">
      <InstagramIcon />
    </IconButton>
    <IconButton variant="plain">
      <LinkedInIcon />
    </IconButton>
    <IconButton
      variant="plain"
      component="a"
      href="https://github.com/anmode/grabtern-frontend"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </IconButton>
  </Box>
</Box>

        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Sheet>
  );
}
