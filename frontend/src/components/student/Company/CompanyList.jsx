import React, { useState, useEffect } from "react";
import "./CompanyList.css";
import jobLogo from "../../../../public/company-logo@2x.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import Header from "../Header/Header";
import Button from "../../../ui/Button";
import companyService from "../../../services/company.service";
import Heading from "../../../ui/Heading";
import Spinner from "../../../ui/Spinner";
import styled from "styled-components";

const GeneralContainer = styled.div`
  background-color: var(--color-grey-200);
  min-height: 100vh;
  padding: 40px;
  border-radius: 30px;
`;

function FeaturedJobs() {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        // Simulate loading with a setTimeout
        setTimeout(async () => {
          const response =
            await companyService.getAllCompaniesWithoutPagination();
          console.log("gggggggg", response);

          if (response.ok) {
            const data = await response.json();

            setCompanyData(data.companies);
          } else {
            console.error("Failed to fetch data");
          }

          // After fetching data, set loading to false
          setLoading(false);
        }, 500); // Simulate loading for 1.5 seconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Clean up function
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <>
      <GeneralContainer>
        <Header />
        {loading ? (
          <Spinner />
        ) : (
          <div className="featured-jobs">
            <div className="featured-jobs-nav">
              <div className="nav-bar">
                <div className="ex-title">
                  <h1 className="features-title">
                    <Heading as="h2">
                      Explore and select from our list of available companies
                    </Heading>
                  </h1>
                </div>
              </div>
            </div>
            <div className="companies-shown">
              {companyData.map((company) => (
                <div className="company-list" key={company.id}>
                  <Company
                    companyName={company.company_name}
                    industrySector={company.industry_sector}
                    location={company.location}
                    email={company.contact_email}
                    studentLimit={company.accepted_student_limit}
                    website={company.website}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </GeneralContainer>
    </>
  );
}

function Company({
  companyName,
  industrySector,
  location,
  email,
  website,
  studentLimit,
}) {
  const redirectToWebsite = () => {
    const domain = website.replace(/^https?:\/\//i, "");
    window.open(`//${domain}`, "_blank");
  };
  return (
    <>
      <div className="the-company">
        <div className="company-details">
          <div className="company-logo">
            <img src={jobLogo} alt="Company Logo" />
          </div>
          <div className="company-info">
            <p className="company-name">
              Company Name: <name> {companyName}</name>
            </p>
            <h3 className="company-title">Sector: {industrySector}</h3>
            <div className="company-details">
              <span className="location">
                <i className="icons">
                  <FaLocationDot />
                </i>
                {location}
              </span>
              <span className="email">
                <i className="icons">
                  <MdOutlineEmail />
                </i>
                {email}
              </span>
              <span className="accept-student">
                <i className="icons">
                  <PiStudentFill />
                </i>
                Accepte <span>{studentLimit}</span> students
              </span>
            </div>
          </div>
        </div>
        <div className="company-detail-button">
          <Button
            onClick={redirectToWebsite}
            style={{ background: "#7DC400", fontWeight: "700" }}
            size="large"
          >
            Website
          </Button>
        </div>
      </div>
    </>
  );
}

export default FeaturedJobs;
