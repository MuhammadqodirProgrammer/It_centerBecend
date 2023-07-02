const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const isTeacher = require("../middlewares/isTeacher");
const { statisticsAll, teacherStatistics } = require("../controllers/statistics.controller");

const router = new Router();

router.get("/statistics", isAuth, isAdmin, statisticsAll);
router.get("/tStatistics", isAuth, isTeacher, teacherStatistics);

module.exports = router;
