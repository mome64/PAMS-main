import { useState, useEffect } from "react";
import styled from "styled-components";
import adminService from "../../services/acadamic.service";
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
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    outline-color: var(--color-brand-500);
  }
`;

const UserInfoTooltip = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  box-shadow: var(--shadow-md);
  z-index: 1000;
  min-width: 24rem;
  display: none;
  flex-direction: column;
  gap: 0.8rem;

  ${StyledUserAvatar}:hover & {
    display: flex;
  }
`;

const UserInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const UserInfoLabel = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const UserInfoValue = styled.span`
  color: var(--color-grey-700);
`;

function UserAvatar() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const { userId } = useAuth();

  const fetchAdminPhoto = async () => {
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
    fetchAdminPhoto();
  }, [userId]);

  return (
    <StyledUserAvatar>
      <Avatar src={`/${photoUrl || "default.png"}`} alt="User Avatar" />

      {userData && (
        <UserInfoTooltip>
          <UserInfoItem>
            <UserInfoLabel>User Name:</UserInfoLabel>
            <UserInfoValue>{userData.username}</UserInfoValue>
          </UserInfoItem>

          <UserInfoItem>
            <UserInfoLabel>Email:</UserInfoLabel>
            <UserInfoValue>{userData.email}</UserInfoValue>
          </UserInfoItem>

          <UserInfoItem>
            <UserInfoLabel>Role:</UserInfoLabel>
            <UserInfoValue>{userData.college_name}</UserInfoValue>
          </UserInfoItem>

          {userData.phone_number && (
            <UserInfoItem>
              <UserInfoLabel>Phone:</UserInfoLabel>
              <UserInfoValue>{userData.phone_number}</UserInfoValue>
            </UserInfoItem>
          )}
        </UserInfoTooltip>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
