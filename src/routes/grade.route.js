const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");

const {
  gradePost,
  allGrades,
  oneGrade,
  editOneGrade,
  getGradesForStudent,
  getGradeForStudent,
} = require("../controllers/grade.controller");

const router = new Router();

router.post("/grade", isAuth, isTeacher, gradePost);
router.get("/grade", isAuth, isTeacher, allGrades);
router.get("/grade/:id", isAuth, isTeacher, oneGrade);
router.put("/editGrade/:id", isAuth, isTeacher, editOneGrade);
router.get("/check/grade", isAuth, getGradesForStudent);
router.get("/check/grade/:id", isAuth, getGradeForStudent);

module.exports = router;
