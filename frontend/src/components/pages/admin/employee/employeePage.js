import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";

import HeaderPage from "./../../shared/header/headerPage";

import iconHeader from "./assets/teamwork.svg";

import EmployeeList from "./employeeList";

import "./index.css";

import {
  Container,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";

import ButtonBlue from "../../shared/general/ButtonBlue";

const StyledRoot = styled("div")({
  padding: 16,
});

const StyledWrapHeader = styled("div")({
  marginTop: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ["@media only screen and (max-width: 600px)"]: {
    "& .MuiTypography-root": {
      fontSize: 26,
    },
  },
  ["@media only screen and (min-width:600px)"]: {
    "& .MuiTypography-root": {
      fontSize: 26,
    },
  },
  ["@media only screen and (min-width:768px)"]: {
    "& .MuiTypography-root": {
      fontSize: 34,
    },
  },
  ["@media only screen and (min-width:992px)"]: {},

  "& .btn-add-new": {
    ["@media only screen and (max-width: 600px)"]: {
      display: "none",
    },
  },
  "& .btn-icon-add-new": {
    ["@media only screen and (min-width:600px)"]: {
      display: "none",
    },
  },
});

const StyledDivider = styled(Divider)({
  margin: "10px 0",
});

const EmployeesPage = (props) => {
  useEffect(() => {}, []);

  return (
    <StyledRoot className={`page`}>
      <Container maxWidth="lg">
        <StyledWrapHeader>
          <Fragment>
            <HeaderPage textLabel={"รายชื่อพนักงาน"} icon={iconHeader} />
            <div className="btn-add-new">
              <ButtonBlue
                variant="contained"
                startIcon={<AddIcon />}
                component={NavLink}
                to="/admin/employees/form"
              >
                Create Employee
              </ButtonBlue>
            </div>
            <div className="btn-icon-add-new">
              <IconButton aria-label="add" size="large">
                <AddIcon />
              </IconButton>
            </div>
          </Fragment>
        </StyledWrapHeader>
        <StyledDivider />
        <EmployeeList />
      </Container>
    </StyledRoot>
  );
};

export default EmployeesPage;
