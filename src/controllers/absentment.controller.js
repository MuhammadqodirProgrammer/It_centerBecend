const Groupes = require("../models/Group");
const SecondaryTeachers = require("../models/SecondaryTeacher");
const Students = require("../models/Stundent");
const Homeworks = require("../models/Homework");
const Grades = require("../models/Grade");
const Absents = require("../models/Absentment");

exports.absentPost = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const { lesson, isAbsent, studentId, groupId } = req.body;
  Absents.create({
    lesson,
    isAbsent,
    studentId,
    groupId,
    secondaryTeacherId,
  });
  res.status(201).json({ message: "Absentment posted Successfully" });
};

exports.absentGet = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const absents = await Absents.find({ secondaryTeacherId }).populate(
    "secondaryTeacherId studentId groupId"
  );
  res.status(200).json({ data: absents });
};

exports.absentEdit = async (req, res) => {
  const { id } = req.params;
  const { id: secondaryTeacherId } = req.verified;
  const { lesson, isAbsent, studentId, groupId } = req.body;
  await Absents.findByIdAndUpdate(id, {
    $set: {
      lesson,
      isAbsent,
      studentId,
      groupId,
      secondaryTeacherId,
    },
  });
  res.status(200).json({ message: "Updated absentment" });
};
