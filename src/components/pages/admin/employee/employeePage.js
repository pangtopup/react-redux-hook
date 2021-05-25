import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import HeaderPage from "./../../shared/header/headerPage";

import iconHeader from "./assets/teamwork.svg";

import "./index.css";

import { getDepartment } from "./../../../../actions/department";

import {
  Button,
  Divider,
  Grid,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  MenuItem,
  Select,
  IconButton,
  Menu,
  List,
  ListItem,
  Avatar,
} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { getAllUsers } from "./../../../../actions/user";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapHeader: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 50,
    height: 50,
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
  iconAction:{
    marginRight: 16
  }
}));

const EmployeesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: departmentList } = useSelector((state) => state.department);
  const { result: employeeList } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterEmployee, setFilterEmployee] = useState({
    search: "",
    idDepartment: "all",
    site: "all",
    status: "all",
  });

  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getAllUsers());
  }, []);

  const handleChangeStatusEmployee = (event, newStatus) => {
    setFilterEmployee({
      ...filterEmployee,
      ["status"]: newStatus,
    });
  };

  const handleChangeFilterEmployee = (event) => {
    const name = event.target.name;
    setFilterEmployee({
      ...filterEmployee,
      [name]: event.target.value,
    });
  };

  const handleClickSearch = () => {
    console.log("handleClickSearch");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const rowsFilter = () => {
    if (
      filterEmployee.search == "" &&
      filterEmployee.idDepartment == "all" &&
      filterEmployee.site == "all" &&
      filterEmployee.status == "all"
    ) {
      return employeeList;
    } else {
      let resultFilter = [...employeeList];

      if (filterEmployee.status != "all") {
        resultFilter = resultFilter.filter((item) => {
          if (item.status == filterEmployee.status) return item;
        });
      }

      if (filterEmployee.search.length > 0) {
        resultFilter = resultFilter.filter((item) => {
          if (
            item.firstname
              .toUpperCase()
              .indexOf(filterEmployee.search.toUpperCase()) > 0 ||
            item.lastname
              .toUpperCase()
              .indexOf(filterEmployee.search.toUpperCase()) > 0
          )
            return item;
        });
      }

      if (filterEmployee.idDepartment != "all") {
        resultFilter = resultFilter.filter((item) => {
          if (item.idDepartment == filterEmployee.idDepartment) return item;
        });
      }

      if (filterEmployee.site != "all") {
        resultFilter = resultFilter.filter((item) => {
          if (item.site == filterEmployee.site) return item;
        });
      }
      return resultFilter;
    }
  };

  return (
    <div className="page">
      <div className={classes.wrapHeader}>
        <HeaderPage textLabel={"รายชื่อพนักงาน"} icon={iconHeader} />
        <div>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Employee
          </Button>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.wrapFilterStatusEmployee}>
        <ToggleButtonGroup
          value={filterEmployee.status}
          exclusive
          onChange={handleChangeStatusEmployee}
          aria-label="filter employee"
          size="small"
          className={classes.btnFilterStatusEmployee}
        >
          <ToggleButton value="all" aria-label="all" size="small">
            All Users
          </ToggleButton>
          <ToggleButton value="active" aria-label="active" size="small">
            Active Users
          </ToggleButton>
          <ToggleButton value="terminate" aria-label="terminate" size="small">
            Terminate Users
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={classes.wrapFilter}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">
                ค้นหาพนักงาน
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={filterEmployee.search}
                onChange={handleChangeFilterEmployee}
                name="search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={handleClickSearch}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                labelWidth={90}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                หน่วยงาน
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filterEmployee.idDepartment}
                onChange={handleChangeFilterEmployee}
                label="หน่วยงาน"
                name="idDepartment"
              >
                <MenuItem value="all">
                  <em>ทุกหน่วยงาน</em>
                </MenuItem>
                {departmentList &&
                  departmentList.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.departmentName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                สถานที่ทำงาน
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filterEmployee.site}
                onChange={handleChangeFilterEmployee}
                label="สถานที่ทำงาน"
                name="site"
              >
                <MenuItem value="all">
                  <em>ทุก Site</em>
                </MenuItem>
                <MenuItem value={1}>TPE - Rayong Site#1</MenuItem>
                <MenuItem value={3}>TPE - Rayong Site#3</MenuItem>
                <MenuItem value={7}>TPE - Rayong Site#7</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div>
        {employeeList && (
          <Fragment>
            <Typography variant="body2" color="textSecondary">
              {`รายการทั้งหมด (${rowsFilter().length})`}
            </Typography>
            <div>
              {rowsFilter().map((emp) => (
                <div key={emp.id}>
                  <List>
                    <ListItem>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={1}>
                          <Avatar
                            alt={emp.username}
                            src={`${process.env.REACT_APP_URL}image/profile/${emp.image}`}
                            className={classes.avatar}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography
                            variant="body1"
                            className={classes.textName}
                          >{`${emp.firstname} ${emp.lastname}`}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {emp.position}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.labelAbout}
                          >
                            Department:{" "}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.textAbout}
                          >
                            {emp.department}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.labelAbout}
                          >
                            Mobile Number:{" "}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.textAbout}
                          >
                            {emp.mobileNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.labelAbout}
                          >
                            Email:{" "}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.textAbout}
                          >
                            {emp.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.labelAbout}
                          >
                            Work Location:{" "}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.textAbout}
                          >
                            {emp.workingLocation}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <div
                            className={clsx(classes.statusTag, {
                              [classes.statusTagTerminate]:
                                emp.status === "terminate",
                              [classes.statusTagActive]:
                                emp.status === "active",
                            })}
                          >
                            <Typography className={classes.statusTagLabel}>
                              {emp.status}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={1}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickMenu}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            elevation={0}
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            TransitionComponent={Fade}
                          >
                            <MenuItem onClick={handleCloseMenu}>
                              <EditOutlinedIcon className={classes.iconAction} />
                              Edit
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu}>
                              <DeleteOutlineOutlinedIcon className={classes.iconAction} /> Delete
                            </MenuItem>
                          </Menu>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                  <Divider />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
