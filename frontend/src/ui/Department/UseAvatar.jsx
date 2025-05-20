import styled from "styled-components";
import { useState } from "react";
import avatar from "../../../public/yohanis.gif";
import { useAuth } from "../../context/AuthContext";

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
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    outline: 2px solid var(--color-brand-600);
    transform: scale(1.05);
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
  display: none;
  flex-direction: column;
  gap: 0.8rem;

  ${StyledUserAvatar}:hover & {
    display: flex;
  }
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const UserInfoLabel = styled.span`
  font-weight: 600;
  color: var(--color-grey-700);
  min-width: 8rem;
`;

const UserInfoValue = styled.span`
  color: var(--color-grey-600);
  flex: 1;
`;

function UserAvatar() {
  const { username, secondName, collage, email, role } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledUserAvatar
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${username || "user"}`}
      />

      {isHovered && (
        <UserInfoTooltip>
          <UserInfoRow>
            <UserInfoLabel>Name:</UserInfoLabel>
            <UserInfoValue>
              {username || "Not available"} {secondName && ` ${secondName}`}
            </UserInfoValue>
          </UserInfoRow>

          {email && (
            <UserInfoRow>
              <UserInfoLabel>Email:</UserInfoLabel>
              <UserInfoValue>{email}</UserInfoValue>
            </UserInfoRow>
          )}

          {role && (
            <UserInfoRow>
              <UserInfoLabel>Role:</UserInfoLabel>
              <UserInfoValue>{role}</UserInfoValue>
            </UserInfoRow>
          )}

          {collage && (
            <UserInfoRow>
              <UserInfoLabel>College:</UserInfoLabel>
              <UserInfoValue>{collage}</UserInfoValue>
            </UserInfoRow>
          )}
        </UserInfoTooltip>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
