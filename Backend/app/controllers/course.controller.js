const db = require("../models");
const Courses = db.courses;

exports.allCourses = (req, res) => {
  try {
    res.status(200).send(Courses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
