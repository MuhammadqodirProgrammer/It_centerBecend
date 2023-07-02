const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const isTeacher = require("../middlewares/isTeacher");
const {
  absentPost,
  absentGet,
  absentEdit,
} = require("../controllers/absentment.controller");

const router = new Router();

router.post("/absent", isAuth, isTeacher, absentPost);
router.get("/absent", isAuth, isTeacher, absentGet);
router.put("/absent/:id", isAuth, isTeacher, absentEdit);

module.exports = router;
