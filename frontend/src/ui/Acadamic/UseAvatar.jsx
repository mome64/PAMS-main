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
`;

const Avatar = styled.img`
  display: block;
  width: 4rem; /* Set your desired width */
  height: 4rem; /* Set your desired height */
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const { userId } = useAuth();

  const fetchAdminPhoto = async () => {
    try {
      // Fetch admin data including photo URL
      const response = await adminService.getAdminById(userId);

      if (response.ok) {
        const admin = await response.json();
        if (admin.data.photo) {
          // Adjust the photo URL by removing '/public' if present
          const adjustedPhotoUrl = admin.data.photo.replace("/public", "");
          // Set the adjusted photo URL in state
          setPhotoUrl(adjustedPhotoUrl);
        } else {
          // If photo URL is not available, set default photo URL
          setPhotoUrl(defaultAvatar);
        }
      } else {
        throw new Error("Failed to fetch admin data");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      // If error occurs, set default photo URL
      setPhotoUrl(defaultAvatar);
    }
  };

  useEffect(() => {
    fetchAdminPhoto();
  }, [userId]);

  return (
    <>
      <StyledUserAvatar>
        <Avatar
          src={
            `http://localhost:8080/images/admin/` + photoUrl || defaultAvatar
          }
          alt="Admin Avatar"
        />
      </StyledUserAvatar>
    </>
  );
}

export default UserAvatar;
