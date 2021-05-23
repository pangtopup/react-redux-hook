import React, { useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";

import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";

import * as UserAction from "../../../../actions/user";
import Utils from "../../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
  },
  sectionOne: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "center",
  },
  wrapAvatar: {
    padding: 16,
    width: "fit-content",
    borderRadius: "50%",
  },
  wrapInnerAvatar: {
    padding: 8,
    width: "fit-content",
    borderRadius: "50%",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  sectionTwo: {
    marginTop: 16,
  },
  sectionTwoSkeleton: {
    maxWidth: 500,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textProfile: {
    fontWeight: 300,
  },
  divider: {
    margin: "10px 0",
    backgroundColor: "#00000021",
  },
  wrapFollow: {
    padding: 8,
    width: 350,
    borderRadius: 16,
    backgroundImage: "linear-gradient(87deg,#172b4d,#1a174d)",
  },
  innerFollow: {
    display: "flex",
    justifyContent: "center",
  },
  follow: {
    padding: 16,
  },
  followCount: {
    fontSize: 24,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  followLabel: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  dividerVertical: {
    margin: "16px 32px",
    backgroundColor: "#FFFFFF",
  },
  sectionThree: {
    maxWidth: 650,
    margin: "auto",
    marginTop: 24,
    display: "flex",
    justifyContent: "space-around",
  },
  wrapAbout: {},
  aboutTop: {
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
  },
  aboutBottom: {
    display: "flex",
    alignItems: "center",
  },
  innerAbout: {
    marginLeft: 8,
  },
  iconAbout: {
    opacity: 0.8,
  },
  sectionFour: {
    marginTop: 16,
    width: "100%",
    display: "inline-flex",
    justifyContent: "center",
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (currentUser) {
      dispatch(UserAction.getUserProfile(currentUser.id));
    }
  }, [currentUser]);

  return (
    <div className={`page ${classes.root}`}>
      {userProfile ? (
        <div>
          <div className={classes.sectionOne}>
            <Paper className={classes.wrapAvatar}>
              <Avatar
                alt="Remy Sharp"
                src={`${process.env.REACT_APP_URL}image/profile/${userProfile.image}`}
                className={classes.avatar}
              />
            </Paper>
          </div>
          <div className={classes.sectionTwo}>
            <Typography align="center" variant="h2">
              {`${userProfile.firstname} ${userProfile.lastname}`}
            </Typography>
            <Typography
              align="center"
              variant="h5"
              color="textSecondary"
              className={classes.textProfile}
            >
              {userProfile.position}
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="textSecondary"
              className={classes.textProfile}
            >
              {userProfile.department}
            </Typography>
          </div>
          <div className={classes.sectionThree}>
            <div className={classes.wrapAbout}>
              <div className={classes.aboutTop}>
                <PhoneIphoneOutlinedIcon fontSize="large" color="primary" />
                <div className={classes.innerAbout}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconAbout}
                  >
                    Mobile Number:{" "}
                  </Typography>
                  <Typography>{userProfile.mobileNumber}</Typography>
                </div>
              </div>
              <div className={classes.aboutBottom}>
                <PersonPinCircleOutlinedIcon fontSize="large" color="primary" />
                <div className={classes.innerAbout}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconAbout}
                  >
                    Work Location:{" "}
                  </Typography>
                  <Typography>{userProfile.workingLocation}</Typography>
                </div>
              </div>
            </div>
            <div className={classes.wrapAbout}>
              <div className={classes.aboutTop}>
                <AlternateEmailOutlinedIcon fontSize="large" color="primary" />
                <div className={classes.innerAbout}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconAbout}
                  >
                    Email:{" "}
                  </Typography>
                  <Typography>{userProfile.email}</Typography>
                </div>
              </div>
              <div className={classes.aboutBottom}>
                <BusinessCenterOutlinedIcon fontSize="large" color="primary" />
                <div className={classes.innerAbout}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconAbout}
                  >
                    Company:{" "}
                  </Typography>
                  <Typography>{userProfile.company}</Typography>
                </div>
              </div>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.sectionFour}>
            <Paper className={classes.wrapFollow}>
              <div className={classes.innerFollow}>
                <div className={classes.follow}>
                  <Typography align="center" className={classes.followCount}>
                  {Utils.numberWithCommas(userProfile.follower)}
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    className={classes.followLabel}
                  >
                    Follower
                  </Typography>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.dividerVertical}
                />
                <div className={classes.follow}>
                  <Typography align="center" className={classes.followCount}>
                  {Utils.numberWithCommas(userProfile.following)}
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    className={classes.followLabel}
                  >
                    Following
                  </Typography>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className={classes.sectionOne}>
            <Skeleton variant="circle" width={200} height={200} />
          </div>
          <div className={classes.sectionTwoSkeleton}>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="60%" />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProfilePage;
