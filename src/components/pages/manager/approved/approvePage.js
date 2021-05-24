import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { getAllCourses } from "./../../../../actions/course";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: 8,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const ApprovedPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: courseList } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <div className="page">
      <div>
        <Typography>Waiting Approve</Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseList ? (
            courseList.map((value) => (
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={`${process.env.REACT_APP_URL}image/course/${value.courseImage}`}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {value.courseName}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        <Typography>Approved</Typography>
      </div>
      <div>
        <Typography>Reject</Typography>
      </div>
    </div>
  );
};

export default ApprovedPage;
