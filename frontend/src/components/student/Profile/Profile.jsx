import React, { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import { useAuth } from "../../../context/AuthContext";
import avatar from "../../../../../backend/public/images/admin/default.jpg";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
  background-color: var(--color-grey-300);
  width: 100%;
  border-radius: 3px;
  color: white;
  margin-top: -20px;
  padding: 7px;
  font-size: 40px;
`;

const ProfileInfo = styled.div`
  padding: 7px 20px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  padding-right: 200px;
`;

const Label = styled.span`
  font-weight: bold;
  width: 120px;
`;

const Value = styled.span`
  color: #333;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: -80px;
`;

const UserProfile = () => {
  const [student, setStudent] = useState(null);
  const { userId, secondName } = useAuth();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchStudentPhoto = async () => {
      try {
        // Fetch student data including photo URL
        const response = await studentService.getStudent(userId);

        if (response) {
          const student = await response.json();

          console.log("hello", student);

          console.log("hhhhhh", student.photoUrl);
          if (student.students.photo) {
            const adjustedPhotoUrl = student.students.photo.replace(
              "/public",
              ""
            );

            // Set the adjusted photo URL in state
            setPhotoUrl(adjustedPhotoUrl);
          } else {
            // If photo URL is not available, set default photo URL
            setPhotoUrl(defaultAvatar);
          }
        } else {
          throw new Error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        // If error occurs, set default photo URL
        setPhotoUrl(defaultAvatar);
      }
    };

    fetchStudentPhoto();

    // Fetch student photo every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchStudentPhoto, 30000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await studentService.getStudent(userId);

        if (response.ok) {
          const data = await response.json();
          const studentData = data.students;
          setStudent(studentData);
        } else {
          console.error("Failed to fetch student data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [userId]);

  return (
    <ProfileContainer>
      <ProfileHeader
        style={{ position: "absolute", top: "90px", padding: "20px" }}
      >
        Wellcome {secondName} to see detail about yourself.
      </ProfileHeader>
      {student && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <ProfileImage
              src={`http://localhost:8080/images/student/` + photoUrl || avatar}
              alt="Admin Avatar"
            />
            <div>
              <ProfileInfo>
                <Label style={{ marginRight: "20px" }}>Your Name:</Label>
                <Value>
                  {student.first_name} {student.last_name}
                </Value>
              </ProfileInfo>

              <ProfileInfo>
                <Label style={{ marginRight: "20px" }}>Username:</Label>
                <Value>{student.username}</Value>
              </ProfileInfo>
              <ProfileInfo>
                <Label style={{ marginRight: "20px" }}>Phone Number:</Label>
                <Value>{student.phone_number}</Value>
              </ProfileInfo>
              <ProfileInfo>
                <Label style={{ marginRight: "20px" }}>Contact Email:</Label>
                <Value>{student.contact_email}</Value>
              </ProfileInfo>
            </div>
          </div>
        </>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
