const Admins = require("../models/Admin");
const Teachers = require("../models/SecondaryTeacher");
const Students = require("../models/Stundent");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admins.findOne({ username });
  if (!admin)
    return res.status(403).json({ message: "Invalid username or password" });

  const compare = await bcrypt.compare(password, admin.password);
  if (!compare)
    return res.status(403).json({ message: "Invalid username or password" });

  const token = jwt.sign({ id: admin.id, role: admin.role });
  res.status(200).json({ token: token, role: admin.role });
};

exports.loginTeacher = async (req, res) => {
  const { username: telegramUsername, password: phoneNumber } = req.body;

  const teacher = await Teachers.findOne({
    telegramUsername,
    phoneNumber,
  });
  if (!teacher)
    return res.status(403).json({ message: "Invalid username or password" });

  const token = jwt.sign({ id: teacher.id, role: teacher.role });

  res.status(200).json({ token: token, role: teacher.role });
};

exports.loginStudent = async (req, res) => {
  const { username: telegramUsername, password: phoneNumber } = req.body;

  const student = await Students.findOne({ telegramUsername, phoneNumber });
  if (!student)
    return res.status(403).json({ message: "Invalid username or password" });

  const token = jwt.sign({ id: student.id });
  res.status(200).json({ token: token });
};
