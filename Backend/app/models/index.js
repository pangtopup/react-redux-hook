const db = {};

db.users = require("../models/user.model.js");
db.courses = require("../models/course.model.js");
db.departments = require("../models/department.model.js")

module.exports = db;
