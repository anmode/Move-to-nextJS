import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import CommunityCard from "../components/Community/CommunityCard";
import { Section } from "../components/UI";
import Footer from "../components/layout/Footer";
const Header = dynamic(() => import("../components/layout/Header"));

function Community() {
  const [contributors, setContributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search input
  const [filteredContributors, setFilteredContributors] = useState([]); // State for filtered contributors

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/anmode/grabtern-frontend/contributors")
      .then((response) => {
        setContributors(response.data);
        setFilteredContributors(response.data); // Initially set filtered data to all contributors
      })
      .catch((error) => {
        console.error("Got error in fetching contributors detail ", error);
      });
  }, []);

  // Filter contributors based on the search term
  useEffect(() => {
    const filtered = contributors.filter((contributor) =>
      contributor.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContributors(filtered);
  }, [searchTerm, contributors]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <Section
          kicker="Grabtern team"
          heading="Our Community"
          subheading="Meet the members of Grabtern Community"
          align="center"
          className="tw-mt-10"
        >
          {/* Search Bar */}
          <div className="tw-mb-6 tw-flex tw-justify-center">
            <input
              type="text"
              placeholder="Search for contributors..."
              value={searchTerm}
              onChange={handleSearch}
              className="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-w-full md:tw-w-1/3 tw-text-center"
            />
          </div>

          {/* Display contributors filtered by search */}
          <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3">
            {filteredContributors.length > 0 ? (
              filteredContributors.map((data, index) => (
                <a
                  href={`https://github.com/${data.login}`}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  <CommunityCard
                    image={data?.avatar_url}
                    name={data.login}
                    description={data?.contributions}
                    commits={data?.contributions}
                  ></CommunityCard>
                </a>
              ))
            ) : (
              <p className="tw-text-center">No contributors found</p>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Community;
