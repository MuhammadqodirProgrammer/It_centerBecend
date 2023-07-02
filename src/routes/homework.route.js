const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");
const {
  homeworkPost,
  allHomeworks,
  oneHomework,
  editOneHomework,
  getHomeworksForTeacher,
  getOneHomeworkForTeacher,
} = require("../controllers/homework.controller");
const fileUpload = require("../middlewares/fileUpload");

const router = new Router();

router.post("/homework", isAuth, fileUpload, homeworkPost);
router.get("/homework", isAuth, allHomeworks);
router.get("/homework/:id", isAuth, oneHomework);
router.put("/editHomework/:id", isAuth, fileUpload, editOneHomework);
router.get("/check/homework", isAuth, isTeacher, getHomeworksForTeacher);
router.get("/check/homework/:id", isAuth, isTeacher, getOneHomeworkForTeacher);

module.exports = router;
