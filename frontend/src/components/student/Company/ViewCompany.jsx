import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "../../../styles/GlobalStyles";

const CompanyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CompanyRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const companiesData = [
  { company_id: 1, company_name: "Company 1" },
  { company_id: 2, company_name: "Company 2" },
  { company_id: 3, company_name: "Company 3" },
  { company_id: 4, company_name: "Company 4" },
  { company_id: 5, company_name: "Company 5" },
  { company_id: 6, company_name: "Company 6" },
  // Add more companies as needed
];

const ViewCompany = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCheckboxChange = (companyId) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <h1 style={{ textAlign: "center" }}>View Companies</h1>
      <CompanyContainer>
        {companiesData.map((company) => (
          <CompanyRow key={company.company_id}>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                value={company.company_id}
                checked={selectedCompanies.includes(company.company_id)}
                onChange={() => handleCheckboxChange(company.company_id)}
              />
              {company.company_name}
            </CheckboxLabel>
          </CompanyRow>
        ))}
      </CompanyContainer>
    </div>
  );
};

export default ViewCompany;
