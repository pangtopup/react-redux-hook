import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import Slider from "react-slick";

import SlideArrow from "../../shared/slideArrow";
import CardCourse from "../../shared/cardCourse";

import { getAllCourses } from "./../../../../actions/course";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    ["@media only screen and (max-width: 600px)"]: {},
    ["@media only screen and (min-width:600px)"]: {},
    ["@media only screen and (min-width:768px)"]: {},
    ["@media only screen and (min-width:992px)"]: {
      maxWidth: 1280,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  divider: {
    margin: "12px 0",
  },
  section: {
    margin: 20,
    marginBottom: 50,
  },
  slider: {
    flexGrow: 1,
  },
}));

const ApprovedPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: courseList } = useSelector((state) => state.course);

  const [setting] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    nextArrow: <SlideArrow icon={<KeyboardArrowRightIcon />} />,
    prevArrow: <SlideArrow icon={<KeyboardArrowLeftIcon />} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <div className={`page ${classes.root}`}>
      <div className={classes.section}>
        <Typography variant="h4">Waiting Approve</Typography>
        <Divider className={classes.divider} />
        <Container className={classes.slider} maxWidth={false}>
          {courseList && (
            <Slider {...setting}>
              {courseList.map((value) => (
                <div>
                  <CardCourse value={value} tagType={"wait"} />
                </div>
              ))}
            </Slider>
          )}
        </Container>
      </div>
      <div className={classes.section}>
        <Typography variant="h4">Approved</Typography>
        <Divider className={classes.divider} />
        <Container maxWidth="lg">
          {courseList && (
            <Slider {...setting}>
              {courseList.map((value) => (
                <div>
                  <CardCourse value={value} tagType={"approved"} />
                </div>
              ))}
            </Slider>
          )}
        </Container>
      </div>
      <div className={classes.section}>
        <Typography variant="h4">Reject</Typography>
        <Divider className={classes.divider} />
        <Container maxWidth="lg">
          {courseList && (
            <Slider {...setting}>
              {courseList.map((value) => (
                <div>
                  <CardCourse value={value} tagType={"reject"} />
                </div>
              ))}
            </Slider>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ApprovedPage;
