import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    content: {
      display: "flex",
      justifyContent: "center",
    },
  }));

const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <div className={`page ${classes.content}`}>
            <img width={600} alt="not found" src={`${process.env.PUBLIC_URL}/assets/background/error404.jpg`} />
        </div>
    )
}

export default NotFoundPage;