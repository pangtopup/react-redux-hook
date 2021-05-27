import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { useDropzone } from "react-dropzone";
import { Formik } from "formik";
import * as Yup from "yup";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

import {
  Paper,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  FormGroup,
  Checkbox,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 24,
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
  firstSection: {
    padding: "64px 24px",
  },
  secondSection: {
    padding: 24,
  },
  imageProfile: {
    marginBottom: 40,
  },
  wrapCaptionImage: {
    marginTop: 16,
    textAlign: "center",
  },
  captionImage: {
    color: "#212b36",
  },
  wrapSwitchActive: {
    flexDirection: "row-reverse",
    margin: 0,
    width: "100%",
    "& .MuiFormControlLabel-label": {
      marginRight: "auto",
    },
  },
  labelSwitchActive: {
    fontSize: 14,
  },
  row: {
    marginBottom: 16,
  },
  textField: {
    width: "100%",
  },
  buttonSave: {
    marginLeft: "auto",
  },
  uploadImage: {
    width: "105%",
    zIndex: 8,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgb(99, 115, 129)",
    backgroundColor: "rgb(244, 246, 248)",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  placeholderImageProfile: {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgba(22, 28, 36, .72)",
  },
  placeholderLabel: {
    color: "rgb(255, 255, 255)",
    
  },
}));

const EmployeeAddNew = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { result: departmentList } = useSelector((state) => state.department);
  const [fileSelected, setFileSelected] = useState([]);
  const [check, setCheck] = useState(true);

  const phoneRegExp = /^0\d\d-\d\d\d-\d\d\d\d$/;
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter firstname"),
    lastname: Yup.string().required("Please enter lastname"),
    position: Yup.string().required("Please enter position"),
    idDepartment: Yup.string().required("Please select department"),
    email: Yup.string().email().required("Enter valid email"),
    mobileNumber: Yup.string()
      .required("Please enter mobilephone")
      .matches(phoneRegExp, "Phone number is not valid"),
    site: Yup.string().required("Please select working location"),
  });

  const [dataEmployee, setDataEmployee] = useState({
    username: "",
    email: "",
    image: "",
    firstname: "",
    lastname: "",
    idDepartment: "",
    department: "",
    position: "",
    mobileNumber: "",
    workingLocation: "",
    site: "",
    status: true,
    company: "Thai Polyethylene Co., Ltd.",
    authorities: {
      user: true,
      manager: false,
      admin: false,
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      fileSelected.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [fileSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      let formData = new FormData();
      acceptedFiles.map((file) => formData.append("file", file));
      setFileSelected(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 1,
  });

  const thumbs = fileSelected.map((file) => (
    <img key={file.name} src={file.preview} className={classes.uploadImage} />
  ));

  const handleClickSave = () => {
    console.log("handleClickSave");
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleChangeActive = (event) => {
    setDataEmployee({
      ...dataEmployee,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeRole = (event) => {
    let tempDataEmployee = { ...dataEmployee };
    tempDataEmployee.authorities[event.target.name] = event.target.checked;
    setDataEmployee(tempDataEmployee);
  };

  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.row}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstname"
                name="firstname"
                label="Firstname"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.textField)}
                value={values.firstname}
                error={touched.firstname && Boolean(errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastname"
                name="lastname"
                label="Lastname"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.textField)}
                value={values.lastname}
                error={touched.lastname && Boolean(errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.row}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="position"
                name="position"
                label="Position"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.textField)}
                value={values.position}
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={clsx(classes.textField)}
                error={touched.idDepartment && Boolean(errors.idDepartment)}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Department"
                  name="idDepartment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(classes.textField)}
                  value={values.idDepartment}
                >
                  {departmentList &&
                    departmentList.map((dep) => (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.departmentName}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                  {touched.idDepartment && errors.idDepartment}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className={classes.row}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                value={dataEmployee.mobileNumber}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.textField)}
                value={values.mobileNumber}
                error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                helperText={touched.mobileNumber && errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(classes.textField)}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.row}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={clsx(classes.textField)}
                error={touched.site && Boolean(errors.site)}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Working Location
                </InputLabel>
                <Select
                  labelId="site"
                  id="site"
                  label="working Location"
                  name="site"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(classes.textField)}
                  value={values.site}
                >
                  <MenuItem value={1}>TPE - Rayong Site#1</MenuItem>
                  <MenuItem value={3}>TPE - Rayong Site#3</MenuItem>
                  <MenuItem value={7}>TPE - Rayong Site#7</MenuItem>
                </Select>
                <FormHelperText>{touched.site && errors.site}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="company"
                name="company"
                label="Company"
                value={dataEmployee.company}
                variant="outlined"
                className={clsx(classes.textField)}
                disabled
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.row}>
          <Grid container spacing={3}>
            <Grid item>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Role</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        checked={dataEmployee.authorities.user}
                        onChange={handleChangeRole}
                        name="user"
                        checked
                      />
                    }
                    label="User"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dataEmployee.authorities.mananger}
                        onChange={handleChangeRole}
                        name="manager"
                      />
                    }
                    label="Manager"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dataEmployee.authorities.admin}
                        onChange={handleChangeRole}
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonSave}
            startIcon={<SaveIcon />}
            onClick={handleClickSave}
            s
          >
            Create New Employee
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3} className={classes.firstSection}>
            {/* <div>{thumbs}</div> */}
            <div className={classes.imageProfile}>
              <div {...getRootProps({ className: "dropzone" })}>
                <div className="inner-dropzone">
                  <input {...getInputProps()} />
                  <Fragment>{thumbs}</Fragment>
                  <div
                    className={`placeholder ${classes.placeholder} ${
                      fileSelected.length != 0 && classes.placeholderImageProfile
                    }`}
                  >
                    <AddAPhotoIcon />
                    <Typography
                      style={{ marginTop: 8, backgroundColor:"transparent" }}
                      className={fileSelected != 0 && classes.placeholderLabel}
                      variant="body2"
                    >
                      Upload Photo
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.wrapCaptionImage}>
                <Typography variant="caption" className={classes.captionImage}>
                  Allowed *.jpeg, *.jpg, *.png
                  <br />
                  max size of 3 MB
                </Typography>
              </div>
            </div>
            <div>
              <FormControlLabel
                className={classes.wrapSwitchActive}
                control={
                  <Switch
                    checked={dataEmployee.status}
                    onChange={handleChangeActive}
                    name="status"
                    color="primary"
                  />
                }
                label={
                  <Fragment>
                    <Typography
                      variant="h6"
                      className={classes.labelSwitchActive}
                    >
                      Active Employee
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.labelSwitchActive}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been
                    </Typography>
                  </Fragment>
                }
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Paper elevation={3} className={classes.secondSection}>
            <Formik
              innerRef={formRef}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              initialValues={dataEmployee}
              validationSchema={validationSchema}
            >
              {(props) => showForm(props)}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeAddNew;
