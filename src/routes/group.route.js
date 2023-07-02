const { Router } = require("express");
const fileUpload = require("../middlewares/fileUpload");
const {
  groupAdd,
  groupDelete,
  groupEdit,
  groupGetAll,
  groupGetOne,
  groupsOfTeacher,
  groupOfTeacherGetOne,
  groupSearch,
  groupGet,
} = require("../controllers/group.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");

const router = new Router();

router.post("/group", isAuth, fileUpload, isAdmin, groupAdd);
router.get("/group/:skip/:limit", isAuth, isAdmin, groupGetAll);
router.get("/groupAll", isAuth,  groupGet);
router.get("/group/:id", isAuth, isAdmin, groupGetOne);
router.put("/group/:id", isAuth, isAdmin, fileUpload, groupEdit);
router.delete("/group/:id", isAuth, isAdmin, groupDelete);
router.get("/tGroup/:skip/:limit", isAuth, isTeacher, groupsOfTeacher);
router.get("/tGroup/:id", isAuth, isTeacher, groupOfTeacherGetOne);
router.get("/searchGroup/:search", isAuth,  groupSearch);


module.exports = router;
