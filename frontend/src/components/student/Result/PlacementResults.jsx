import { useState, useEffect } from "react";
import styled from "styled-components";
import placementService from "../../../services/placement.service";
import { useAuth } from "../../../context/AuthContext";
import Header from "../Header/Header";
import Spinner from "../../../ui/Spinner";

// Styled components
const Container = styled.div`
  margin: 20px;
  font-size: 20px;
  background-color: var(--color-grey-0);
  border-radius: 25px;
`;
// Styled components
const PlacementContainer = styled.div`
  background-color: var(--color-grey-100);
  min-height: 100vh;
  padding: 20px;
  margin-top: -5px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
  background-color: #079992;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
`;

const PlacementList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlacementItem = styled.li`
  margin-bottom: 10px;
`;

const PlacementCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardHeader = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h5`
  gap: 3rem;
  font-size: 20px;
  align-items: center;
  margin-bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: var(--color-grey-100);
`;

const CompanyDetails = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: var(--color-grey-100);
`;

const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  margin-left: 10px;
`;

// Placement Results Component
const PlacementResults = () => {
  const [placementResults, setPlacementResults] = useState([]);
  const { userId, secondName } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPlacementResults();
      setLoading(false);
    }, 1000);

    // Clean up function to clear timeout if component unmounts
    return () => clearTimeout(timeout);
  }, [userId]);

  const fetchPlacementResults = async () => {
    try {
      // Assuming studentId is available from props or context
      const results = await placementService.getPlacementResult(userId);
      setPlacementResults(results);
    } catch (error) {
      console.error("Error fetching placement results:", error);
    }
  };

  return (
    <>
      <Header />
      <br /> <br />
      <br />
      <PlacementContainer>
        {loading ? (
          <Spinner />
        ) : (
          <Container>
            {placementResults.length === 0 ? (
              <h2
                style={{
                  marginTop: "40px",
                  background: "var(--color-grey-300)",
                  textAlign: "center",
                  padding: "5px",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                We are currently processing placement results. Please check back
                later for updates.
              </h2>
            ) : (
              <PlacementList>
                <Title> Wellcome to see your placement Results</Title>
                {placementResults.map((result) => (
                  <PlacementItem key={result.placement_id}>
                    <PlacementCard>
                      <CardHeader>
                        <CardTitle>
                          <span>Student Name: {secondName}</span>
                        </CardTitle>
                      </CardHeader>
                      <CompanyDetails>
                        <DetailItem>
                          <DetailLabel>Company Name:</DetailLabel>
                          <DetailValue>
                            {result.company_details.company_name}
                          </DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Location:</DetailLabel>
                          <DetailValue>
                            {result.company_details.location}
                          </DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Industry Sector:</DetailLabel>
                          <DetailValue>
                            {result.company_details.industry_sector}
                          </DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Website:</DetailLabel>
                          <DetailValue>
                            {result.company_details.website}
                          </DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Contact Email:</DetailLabel>
                          <DetailValue>
                            {result.company_details.contact_email}
                          </DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <DetailLabel>Phone Number:</DetailLabel>
                          <DetailValue>
                            {result.company_details.phone_number}
                          </DetailValue>
                        </DetailItem>
                      </CompanyDetails>
                    </PlacementCard>
                  </PlacementItem>
                ))}
              </PlacementList>
            )}
          </Container>
        )}
      </PlacementContainer>
    </>
  );
};

export default PlacementResults;
