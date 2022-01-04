import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    content: {
      display: "flex",
      justifyContent: "center",
    },
  }));

const UnauthorizedPage = () => {
    const classes = useStyles();
    return (
        <div className={`page ${classes.content}`}>
            <img width={600} alt="unauthorized" src={`${process.env.PUBLIC_URL}/assets/background/error401.png`} />
        </div>
    )
}

export default UnauthorizedPage;