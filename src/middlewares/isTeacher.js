const isTeacher = async (req, res, next) => {
  const data = req.verified;
  if (data.role != "teacher") {
    return res.status(400).json({ message: "You are not teacher" });
  }
  next();
};

module.exports = isTeacher;
