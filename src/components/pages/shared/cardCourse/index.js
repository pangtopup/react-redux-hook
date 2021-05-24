import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  return (
    <div style={{ position: "relative" }}>
      <img
        width={35}
        src={`${process.env.PUBLIC_URL}/assets/tag-${tagType}.svg`}
        style={{ position: "absolute", top: -8, right: 24 }}
      />
      <Card className={classes.root}>
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
      </Card>
    </div>
  );
};

export default CardCourse;
