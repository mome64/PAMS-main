import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineAcademicCap,
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
} from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

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

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/acadamic/dashboard">
            <MdDashboardCustomize />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/acadamic/department">
            <HiOutlineOfficeBuilding />
            <span>Department</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/acadamic/placement">
            <FaProjectDiagram />
            <span>Assign List</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/acadamic/student">
            <GiGraduateCap />
            <span>Student</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="acadamic/DepartmentPayAmount">
            <HiOutlineCurrencyDollar />
            <span>DepartmentPay</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/acadamic/Profile">
            <HiOutlineUser />
            <span>Profile</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
