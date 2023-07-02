const isAdmin = async (req, res, next) => {
  const data = req.verified;
  if (data.role != "admin") {
    return res.status(400).json({ message: "You are not admin" });
  }
  next();
};

module.exports = isAdmin;
