const Groupes = require("../models/Group");
const SecondaryTeachers = require("../models/SecondaryTeacher");
const Students = require("../models/Stundent");
const Homeworks = require("../models/Homework");
const Grades = require("../models/Grade");

exports.gradePost = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const { title, lesson, rank, description, homeworkId } = req.body;
  const homeworks = await Homeworks.find({
    _id: homeworkId,
    secondaryTeacherId,
  });
  console.log(homeworks);
  if (homeworks.length) {
    Grades.create({
      title,
      lesson,
      homeworkId,
      rank,
      description,
      secondaryTeacherId,
    });
    const isChecked = true;
    await Homeworks.findByIdAndUpdate(homeworkId, {
      $set: {
        isChecked,
      },
    });
    res.status(201).json({ message: "Grade posted Successfully" });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};

exports.allGrades = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const grades = await Grades.find({ secondaryTeacherId }).populate(
    "homeworkId"
  );
  res.status(200).json({ data: grades });
};

exports.oneGrade = async (req, res) => {
  const { id } = req.params;
  const { id: secondaryTeacherId } = req.verified;
  const grade = await Grades.findById(id)
    .find({ secondaryTeacherId })
    .populate("homeworkId");
  if (grade.length) {
    res.status(200).json({ data: grade });
  } else {
    res.status(403).json({ message: "There is no data" });
  }
};

exports.editOneGrade = async (req, res) => {
  const { id: searchedGrade } = req.params;
  const { id: secondaryTeacherId } = req.verified;
  const { title, lesson, rank, description, homeworkId } = req.body;
  const homeworks = await Homeworks.find({
    _id: homeworkId,
    secondaryTeacherId,
  });
  console.log(searchedGrade);
  console.log(homeworks);

  if (homeworks.length) {
    await Grades.findByIdAndUpdate(searchedGrade, {
      $set: {
        title,
        lesson,
        rank,
        description,
        secondaryTeacherId,
        homeworkId,
      },
    });

    const isChecked = true;
    await Homeworks.findByIdAndUpdate(homeworkId, {
      $set: {
        isChecked,
      },
    });
    res.status(200).json({ message: "Updated grade" });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};

exports.getGradesForStudent = async (req, res) => {
  const { id: studentId } = req.verified;
  const homeworks = await Homeworks.find({
    studentId,
  });

  if (!req.verified.role) {
    const grades = await Grades.find().populate("homeworkId");
    if (homeworks.length) {
      res.status(200).json({ data: grades });
    } else {
      res.status(400).json({ message: "There is no data" });
    }
  } else {
    res.status(403).json({ message: "You are not student" });
  }
};

exports.getGradeForStudent = async (req, res) => {
  const { id } = req.params;
  const { id: studentId } = req.verified;
  const homeworks = await Homeworks.find({
    studentId,
  });
  if (!req.verified.role) {
    const grade = await Grades.findById(id).find().populate("homeworkId");
    if (homeworks.length) {
      res.status(200).json({ data: grade });
    }
  } else {
    res.status(403).json({ message: "You are not student" });
  }
};
