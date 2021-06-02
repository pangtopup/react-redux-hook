import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";

import HeaderPage from "./../../shared/header/headerPage";

import iconHeader from "./assets/teamwork.svg";
import iconAddHeader from "./assets/add-employee.svg";
import iconEditHeader from "./assets/edit-employee.svg";

import EmployeeList from "./employeeList";

import "./index.css";

import { Typography, Button, Divider, IconButton } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { getAllUsers } from "./../../../../actions/user";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    marginTop: 50,
  },
  wrapHeader: {
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
  },
  btnAddNew: {
    ["@media only screen and (max-width: 600px)"]: {
      display: "none",
    },
    ["@media only screen and (min-width:600px)"]: {},
    ["@media only screen and (min-width:768px)"]: {},
    ["@media only screen and (min-width:992px)"]: {},
  },
  btnIconAddNew: {
    ["@media only screen and (max-width: 600px)"]: {},
    ["@media only screen and (min-width:600px)"]: {
      display: "none",
    },
    ["@media only screen and (min-width:768px)"]: {},
    ["@media only screen and (min-width:992px)"]: {},
  },

  divider: {
    margin: "10px 0",
  },
  wrapFilterStatusEmployee: {
    marginTop: 16,
  },
  btnFilterStatusEmployee: {
    "& button": {
      borderRadius: 0,
    },
    "& .MuiToggleButton-root": {
      border: "none",
    },
  },
  wrapFilter: {
    margin: "16px 0",
  },
  formControl: {
    width: "100%",
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  wrapName: {
    width: 350,
  },
  textName: {
    fontSize: 18,
  },
  textPosition: {},
  statusTag: {
    height: 22,
    minWidth: 22,
    borderRadius: 8,
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: "0px 8px",
  },
  statusTagActive: {
    color: "rgb(34, 154, 22)",
    backgroundColor: "rgba(84, 214, 44, 0.16)",
  },
  statusTagTerminate: {
    color: "rgb(183, 33, 54)",
    backgroundColor: "rgba(255, 72, 66, 0.16)",
  },
  statusTagLabel: {
    lineHeight: 0,
    fontWeight: 700,
    fontSize: 14,
    textTransform: "capitalize",
  },
  wrapFirstColumn: {
    display: "flex",
    alignItems: "center",
  },
  textOverFlow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  sectionAbout: {
    width: 420,
    display: "flex",
    justifyContent: "space-around",
  },
  labelAbout: {
    fontSize: 12,
  },
  textAbout: {
    fontSize: 14,
  },
  iconAction: {
    marginRight: 16,
  },
  smallScreen: {
    ["@media only screen and (max-width: 600px)"]: {},
    ["@media only screen and (min-width:600px)"]: {},
    ["@media only screen and (min-width:768px)"]: {},
    ["@media only screen and (min-width:992px)"]: {
      //display: "none",
    },
  },
}));

const EmployeesPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: departmentList } = useSelector((state) => state.department);
  const { result: employeeList } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState("list");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterEmployee, setFilterEmployee] = useState({
    search: "",
    idDepartment: "all",
    site: "all",
    status: "all",
  });

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className={`page ${classes.root}`}>
      <div className={classes.wrapHeader}>
        <Fragment>
          <HeaderPage textLabel={"รายชื่อพนักงาน"} icon={iconHeader} />
          <div className={classes.btnAddNew}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={NavLink}
              to="/admin/employees/form"
            >
              Create Employee
            </Button>
          </div>
          <div className={classes.btnIconAddNew}>
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
          </div>
        </Fragment>

        {/* {mode == "add" && (
          <HeaderPage textLabel={"เพิ่มพนักงานใหม่"} icon={iconAddHeader} />
        )}
        {mode == "edit" && (
          <HeaderPage textLabel={"แก้ไขข้อมูล"} icon={iconEditHeader} />
        )} */}
      </div>
      <Divider className={classes.divider} />
      {mode == "list" && <EmployeeList />}
    </div>
  );
};

export default EmployeesPage;
