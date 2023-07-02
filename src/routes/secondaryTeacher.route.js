const { Router } = require("express");
const fileUpload = require("../middlewares/fileUpload");
const {
  teacherAdd,
  teacherDelete,
  teacherEdit,
  teacherGetAll,
  teacherGetOne,
  teacherSelfGet,
  teacherSelfEdit,
  teacherSearch,
  teacherGet,
} = require("../controllers/secondaryTeacher.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");

const router = new Router();

router.post("/teacher", isAuth, fileUpload, isAdmin, teacherAdd);
router.get("/teacher/:skip/:limit", isAuth, isAdmin, teacherGetAll);
router.get("/teacherAll", isAuth,  teacherGet);
router.get("/teacher/:id", isAuth, isAdmin, teacherGetOne);
router.put("/teacher/:id", isAuth, isAdmin, fileUpload, teacherEdit);
router.delete("/teacher/:id", isAuth, isAdmin, teacherDelete);
router.get("/teacher/self", isAuth, isTeacher, teacherSelfGet);
router.put("/teacher/self", isAuth, isTeacher, fileUpload, teacherSelfEdit);
router.get("/searchTeacher/:search", isAuth, isAdmin, teacherSearch);


module.exports = router;
