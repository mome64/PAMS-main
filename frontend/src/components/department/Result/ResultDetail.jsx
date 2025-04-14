import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import resultService from "../../../services/result.service";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-item: center;
  margin: 10px auto;
`;

const ContentContainer = styled.div`
  max-height: 90vh;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin-bottom: 20px;
`;
const InputContainers = styled.div`
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const HeadingTwo = styled.h2`
  padding: 8px;
  border-radius: 4px;
  border: none;
  width: 100%;
  background: var(--color-grey-50);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 17px;
`;

const CancelButton = styled(Button)`
  background-color: #80c508;
`;

const SeeResultDetail = ({ studentId, onClose }) => {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const fetchStudentResults = async () => {
      try {
        const results = await resultService.getResultsByStudentId(studentId);

        setResultData(results);
      } catch (error) {
        console.error("Error fetching student results:", error);
        toast.error("Error fetching student results");
      }
    };

    if (studentId) {
      fetchStudentResults();
    }
  }, [studentId]);

  return (
    <Modal onClose={onClose}>
      <ContentContainer>
        <Form
          style={{
            boxShadow: "0 0 5px 2px var(--color-grey-100",
            padding: "20px",
            width: "95%",
            margin: "30px auto",
          }}
        >
          {resultData.map((result, index) => (
            <InputContainers key={index}>
              <h2
                style={{
                  textAlign: "center",
                  background: "var(--color-grey-100)",
                  fontSize: "25px",
                  borderRadius: "6px",
                  padding: "13px",
                  width: "100%",
                  marginBottom: "25px",
                }}
              >
                {result.student_first_name} {result.student_last_name}
              </h2>
              <h2 style={{ padding: "10px" }}>Student General information</h2>
              <InputContainer
                style={{
                  border: "1px solid var(--color-grey-200",
                  padding: "20px",
                }}
              >
                <div>
                  <Label>Student Name</Label>
                  <HeadingTwo>
                    <h2>
                      {`${result.student_first_name} ${result.student_last_name}`}
                    </h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Student ID</Label>
                  <HeadingTwo>
                    <h2>{result.student_id} </h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Company Name</Label>
                  <HeadingTwo>
                    <h2>{result.company_name}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Department Name</Label>
                  <HeadingTwo>
                    <h2>{result.department_name}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Advisor Name</Label>
                  <HeadingTwo>
                    <h2>{result.advisor_name}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Department Assigned </Label>
                  <HeadingTwo>
                    <h2>{result.department_assigned}</h2>
                  </HeadingTwo>
                </div>
              </InputContainer>

              <h2 style={{ padding: "10px" }}>
                Personality and Behavioral Traits (15%)
              </h2>
              <InputContainer
                style={{
                  border: "1px solid var(--color-grey-200",
                  padding: "20px",
                }}
              >
                <div>
                  <Label>Commitment (3%)</Label>
                  <HeadingTwo>
                    <h2>{result.commitment}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Courtesy (%)</Label>
                  <HeadingTwo>
                    <h2>{result.courtesy}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label>Conduct (2%)</Label>
                  <HeadingTwo>
                    <h2>{result.conduct}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Industriousness(2%) </Label>
                  <HeadingTwo>
                    <h2>{result.perseverance}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Teamwork (2%) </Label>
                  <HeadingTwo>
                    <h2>{result.teamwork}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Professional Ethics (2%) </Label>
                  <HeadingTwo>
                    <h2>{result.professional_ethics}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Creativity (2%) </Label>
                  <HeadingTwo>
                    <h2>{result.creativity} </h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Total out of (15%) </Label>
                  <HeadingTwo>
                    <h2>
                      {parseFloat(result.commitment) +
                        parseFloat(result.courtesy) +
                        parseFloat(result.conduct) +
                        parseFloat(result.perseverance) +
                        parseFloat(result.teamwork) +
                        parseFloat(result.professional_ethics) +
                        parseFloat(result.creativity)}
                    </h2>
                  </HeadingTwo>
                </div>
              </InputContainer>
              <h2 style={{ padding: "10px" }}>
                Work-Related Performance Indicator (25%){" "}
              </h2>
              <InputContainer
                style={{
                  border: "1px solid var(--color-grey-200",
                  padding: "20px",
                }}
              >
                <div>
                  <Label> Technical Knowledge (8%) </Label>
                  <HeadingTwo>
                    <h2>{result.technical_knowledge}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Efficiency (7%) </Label>
                  <HeadingTwo>
                    <h2>{result.efficiency}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Accept Professional Comments (5%) </Label>
                  <HeadingTwo>
                    <h2>{result.professional_comments}</h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label> Attendance and Punctuality (5%) </Label>
                  <HeadingTwo>
                    <h2>{result.attendance}</h2>
                  </HeadingTwo>
                </div>

                <div>
                  <Label> Total out of (25%) </Label>
                  <HeadingTwo>
                    <h2>
                      {parseFloat(result.technical_knowledge) +
                        parseFloat(result.efficiency) +
                        parseFloat(result.professional_comments) +
                        parseFloat(result.attendance)}
                    </h2>
                  </HeadingTwo>
                </div>
                <div>
                  <Label>Total out of (40%) </Label>
                  <HeadingTwo>
                    <h2>
                      {parseFloat(result.commitment) +
                        parseFloat(result.courtesy) +
                        parseFloat(result.conduct) +
                        parseFloat(result.perseverance) +
                        parseFloat(result.teamwork) +
                        parseFloat(result.professional_ethics) +
                        parseFloat(result.creativity) +
                        parseFloat(result.technical_knowledge) +
                        parseFloat(result.efficiency) +
                        parseFloat(result.professional_comments) +
                        parseFloat(result.attendance)}
                    </h2>
                  </HeadingTwo>
                </div>
              </InputContainer>
            </InputContainers>
          ))}

          <ButtonContainer>
            <CancelButton onClick={onClose}>Close</CancelButton>
          </ButtonContainer>
        </Form>
        <ToastContainer />
      </ContentContainer>
    </Modal>
  );
};

export default SeeResultDetail;
