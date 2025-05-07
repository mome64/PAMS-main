import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendar,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { MdDashboard, MdSchool, MdBusinessCenter } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.4rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { path: "/admin/collage", label: "Collage", icon: <MdSchool /> },
  {
    path: "/admin/department",
    label: "Department",
    icon: <HiOutlineCalendar />,
  },
  { path: "/admin/company", label: "Company", icon: <FaBuilding /> },
  { path: "/admin/user", label: "Admin", icon: <HiOutlineUser /> },
  { path: "/admin/account", label: "Profile", icon: <HiOutlineCog /> },
];

function MainNav() {
  return (
    <nav>
      <NavList>
        {navItems.map(({ path, label, icon }) => (
          <li key={path}>
            <StyledNavLink to={path}>
              {icon}
              <span>{label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
