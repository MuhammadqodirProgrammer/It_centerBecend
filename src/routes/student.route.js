const { Router } = require("express");
const fileUpload = require("../middlewares/fileUpload");
const {
  studentAdd,
  studentDelete,
  studentEdit,
  studentGetAll,
  studentGetOne,
  studentGetSelf,
  studentEditSelf,
  studentSearch,
  studentGetAllForTeacher,
} = require("../controllers/student.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");

const router = new Router();

router.post("/student", isAuth, fileUpload, isAdmin, studentAdd);
router.get("/student/:skip/:limit",  isAuth, isAdmin, studentGetAll);
router.get("/student/:id",  isAuth, isAdmin, studentGetOne);
router.put("/student/:id",  isAuth, isAdmin, fileUpload, studentEdit);
router.delete("/student/:id",  isAuth, isAdmin, studentDelete);
router.get("/student/self/:id", isAuth, studentGetSelf);
router.put("/student/self/:id", isAuth, fileUpload, studentEditSelf);
router.get("/searchStudent/:search", isAuth, isAdmin, studentSearch);
router.get("/student",  isAuth, isTeacher, studentGetAllForTeacher);

module.exports = router;
