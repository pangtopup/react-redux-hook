import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import "./index.css";

import { getDepartment } from "./../../../../actions/department";

import {
  Typography,
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
  Fade,
  TablePagination,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { getAllUsers } from "./../../../../actions/user";
import { Fragment } from "react";

const StyledWrapFilterStatusEmployee = styled("div")({
  marginTop: 16,
  "& .btn-filter-status-employee": {
    "& button": {
      borderRadius: 0,
    },
    "& .MuiToggleButton-root": {
      border: "none",
    },
  },
});

const StyledrapFilter = styled("div")({
  margin: "16px 0",
  "& .formControl": {
    width: "100%",
  },
});

const StyledDivider = styled(Divider)({
  margin: "10px 0",
});

const StyledWrapFirstColumn = styled("div")({
  display: "flex",
  alignItems: "center",
  "& .avatar": {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  "& .textName": {
    fontSize: 18,
  },
  "& .textOverFlow": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const StyledListItem = styled(ListItem)({
  "& .labelAbout": {
    fontSize: 12,
  },
  "& .textAbout": {
    fontSize: 14,
  },
  "& .iconAction": {
    marginRight: 16,
  },
});

const StyledStatusTag = styled("div")({
  height: 22,
  minWidth: 22,
  borderRadius: 8,
  alignItems: "center",
  whiteSpace: "nowrap",
  display: "inline-flex",
  justifyContent: "center",
  padding: "0px 8px",
  "& .statusTagLabel": {
    lineHeight: 0,
    fontWeight: 700,
    fontSize: 14,
    textTransform: "capitalize",
    "&.statusTagActive,": {
      color: "rgb(34, 154, 22)",
    },
    "&.statusTagTerminate": {
      color: "rgb(183, 33, 54)",
    },
  },
  "&.statusTagActive,": {
    backgroundColor: "rgba(84, 214, 44, 0.16)",
  },
  "&.statusTagTerminate": {
    backgroundColor: "rgba(255, 72, 66, 0.16)",
  },
});

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { result: departmentList } = useSelector((state) => state.department);
  const { result: employeeList } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedEmployee, setselectedEmployee] = useState(0);
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
    setPage(0);
    if (newStatus !== null) {
      setFilterEmployee({
        ...filterEmployee,
        ["status"]: newStatus,
      });
    }
  };

  const handleChangeFilterEmployee = (event) => {
    setPage(0);
    const name = event.target.name;
    setFilterEmployee({
      ...filterEmployee,
      [name]: event.target.value,
    });
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              .indexOf(filterEmployee.search.toUpperCase()) >= 0 ||
            item.lastname
              .toUpperCase()
              .indexOf(filterEmployee.search.toUpperCase()) >= 0
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
    <div>
      <StyledWrapFilterStatusEmployee>
        <ToggleButtonGroup
          value={filterEmployee.status}
          exclusive
          onChange={handleChangeStatusEmployee}
          aria-label="filter employee"
          size="small"
          className={`btn-filter-status-employee`}
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
      </StyledWrapFilterStatusEmployee>
      <StyledrapFilter>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl className={`formControl`} variant="outlined">
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
                    <IconButton aria-label="search" edge="end" size="large">
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
            <FormControl variant="outlined" className={`formControl`}>
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
            <FormControl variant="outlined" className={`formControl`}>
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
      </StyledrapFilter>
      <div>
        {employeeList && (
          <Fragment>
            <Typography variant="body2" color="textSecondary">
              {`รายการทั้งหมด (${rowsFilter().length})`}
            </Typography>
            <div>
              {rowsFilter()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((emp) => (
                  <div key={emp.id}>
                    <List>
                      <StyledListItem>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={4}>
                            <StyledWrapFirstColumn>
                              <Avatar
                                alt={emp.username}
                                src={`${process.env.REACT_APP_URL}image/profile/${emp.image}`}
                                className={`avatar`}
                              />
                              <div style={{ width: "80%" }}>
                                <Typography
                                  variant="body1"
                                  className={`textName`}
                                >{`${emp.id} ${emp.firstname} ${emp.lastname}`}</Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  className={`textOverFlow`}
                                >
                                  {" — "}
                                  {emp.position}
                                  {","}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  className={`textOverFlow`}
                                  style={{ fontSize: 12 }}
                                >
                                  {emp.department}
                                </Typography>
                              </div>
                            </StyledWrapFirstColumn>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Grid container>
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  className={`labelAbout`}
                                >
                                  Mobile Number:{" "}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={`textAbout`}
                                >
                                  {emp.mobileNumber}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  className={`labelAbout`}
                                >
                                  Email:{" "}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={`textAbout`}
                                >
                                  {emp.email}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  className={`labelAbout`}
                                >
                                  Work Location:{" "}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={`textAbout`}
                                >
                                  {emp.workingLocation}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <StyledStatusTag
                              className={clsx({
                                [`statusTagTerminate`]:
                                  emp.status === "terminate",
                                [`statusTagActive`]: emp.status === "active",
                              })}
                            >
                              <Typography
                                className={clsx(`statusTagLabel`, {
                                  [`statusTagTerminate`]:
                                    emp.status === "terminate",
                                  [`statusTagActive`]: emp.status === "active",
                                })}
                              >
                                {emp.status}
                              </Typography>
                            </StyledStatusTag>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={1}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              onClick={(event) => {
                                setselectedEmployee(emp.id);
                                handleClickMenu(event);
                              }}
                              size="large"
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
                              <MenuItem
                                onClick={handleCloseMenu}
                                component={NavLink}
                                to={`/admin/employees/form/${selectedEmployee}`}
                              >
                                <EditOutlinedIcon className={`iconAction`} />
                                Edit
                              </MenuItem>
                              <MenuItem onClick={handleCloseMenu}>
                                <DeleteOutlineOutlinedIcon
                                  className={`iconAction`}
                                />{" "}
                                Delete
                              </MenuItem>
                            </Menu>
                          </Grid>
                        </Grid>
                      </StyledListItem>
                    </List>
                    <StyledDivider />
                  </div>
                ))}
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rowsFilter().length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
