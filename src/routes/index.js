const auth = require("./auth.route");
const student = require("./student.route");
const secondaryTeacher = require("./secondaryTeacher.route");
const group = require("./group.route");
const statistics = require("./statistics.route");
const homeworks = require("./homework.route");
const grades = require("./grade.route");
const absentments = require("./absentment.route");

module.exports = [
  auth,
  student,
  secondaryTeacher,
  group,
  statistics,
  homeworks,
  grades,
  absentments,
];
