import { useState, useEffect } from "react";
import styled from "styled-components";
import adminService from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../../../backend/public/images/admin/default.jpg";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  position: relative;
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    outline: 2px solid var(--color-brand-500);
  }
`;

const UserInfoTooltip = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.2rem;
  box-shadow: var(--shadow-md);
  z-index: 1000;
  min-width: 20rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(-10px);

  ${StyledUserAvatar}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const UserInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-500);
  }
`;

function UserAvatar() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const { userId } = useAuth();

  const fetchAdminData = async () => {
    try {
      const response = await adminService.getAdminById(userId);

      if (response.ok) {
        const admin = await response.json();
        setUserData(admin.data);

        if (admin.data.photo) {
          const adjustedPhotoUrl = admin.data.photo.replace("/public", "");
          setPhotoUrl(adjustedPhotoUrl);
        } else {
          setPhotoUrl(defaultAvatar);
        }
      } else {
        throw new Error("Failed to fetch admin data");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setPhotoUrl(defaultAvatar);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [userId]);

  return (
    <StyledUserAvatar>
      <Avatar
        src={`http://localhost:8080/images/admin/${photoUrl || defaultAvatar}`}
        alt="Admin Avatar"
      />

      {userData && (
        <UserInfoTooltip>
          <UserInfoItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>
              {userData.first_name} {userData.last_name}
            </span>
          </UserInfoItem>
          <UserInfoItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{userData.email}</span>
          </UserInfoItem>
          <UserInfoItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Last login:{" "}
              {new Date(userData.last_login || Date.now()).toLocaleString()}
            </span>
          </UserInfoItem>
        </UserInfoTooltip>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
