import makeStyles from '@mui/styles/makeStyles';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent"; 
import CardActionArea from "@mui/material/CardActionArea"; 
import Typography from "@mui/material/Typography";

import { getCourse } from "./../../../../actions/course";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 24,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const CardCourse = (props) => {
  const { value, tagType } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickLoadCourse = () => {
    dispatch(getCourse(value.id))
  }

  return (
    <div style={{ position: "relative" }}>
      <img
        width={35}
        src={`${process.env.PUBLIC_URL}/assets/tag-${tagType}.svg`}
        style={{ position: "absolute", top: -8, right: 24 }}
      />
      <Card className={classes.root}>
        <CardActionArea onClick={handleClickLoadCourse}>
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_URL}image/course/${value.courseImage}`}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {value.courseName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardCourse;
