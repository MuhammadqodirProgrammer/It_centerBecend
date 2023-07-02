const Groupes = require("../models/Group");
const SecondaryTeachers = require("../models/SecondaryTeacher");
const Students = require("../models/Stundent");

exports.statisticsAll = async (req, res) => {
  const allGroupes = await Groupes.find();
  const allTeachers = await SecondaryTeachers.find();
  const allStudents = await Students.find();
  const January = [];
  const February = [];
  const March = [];
  const April = [];
  const May = [];
  const June = [];
  const July = [];
  const August = [];
  const September = [];
  const October = [];
  const November = [];
  const December = [];
  const January2 = [];
  const February2 = [];
  const March2 = [];
  const April2 = [];
  const May2 = [];
  const June2 = [];
  const July2 = [];
  const August2 = [];
  const September2 = [];
  const October2 = [];
  const November2 = [];
  const December2 = [];
  const January3 = [];
  const February3 = [];
  const March3 = [];
  const April3 = [];
  const May3 = [];
  const June3 = [];
  const July3 = [];
  const August3 = [];
  const September3 = [];
  const October3 = [];
  const November3 = [];
  const December3 = [];
  allGroupes.forEach((element) => {
    const month = element.createdAt.toString().split(" ")[1];

    if (month == "Jan") January.push(month);
    if (month == "Feb") February.push(month);
    if (month == "Mar") March.push(month);
    if (month == "Apr") April.push(month);
    if (month == "May") May.push(month);
    if (month == "Jun") June.push(month);
    if (month == "Jul") July.push(month);
    if (month == "Aug") August.push(month);
    if (month == "Sep") September.push(month);
    if (month == "Oct") October.push(month);
    if (month == "Nov") Novermber.push(month);
    if (month == "Dec") December.push(month);
  });
  allTeachers.forEach((element) => {
    const month = element.createdAt.toString().split(" ")[1];

    if (month == "Jan") January2.push(month);
    if (month == "Feb") February2.push(month);
    if (month == "Mar") March2.push(month);
    if (month == "Apr") April2.push(month);
    if (month == "May") May2.push(month);
    if (month == "Jun") June2.push(month);
    if (month == "Jul") July2.push(month);
    if (month == "Aug") August2.push(month);
    if (month == "Sep") September2.push(month);
    if (month == "Oct") October2.push(month);
    if (month == "Nov") November2.push(month);
    if (month == "Dec") December2.push(month);
  });

  allStudents.forEach((element) => {
    const month = element.createdAt.toString().split(" ")[1];

    if (month == "Jan") January3.push(month);
    if (month == "Feb") February3.push(month);
    if (month == "Mar") March3.push(month);
    if (month == "Apr") April3.push(month);
    if (month == "May") May3.push(month);
    if (month == "Jun") June3.push(month);
    if (month == "Jul") July3.push(month);
    if (month == "Aug") August3.push(month);
    if (month == "Sep") September3.push(month);
    if (month == "Oct") October3.push(month);
    if (month == "Nov") November3.push(month);
    if (month == "Dec") December3.push(month);
  });
  const data = {
    Groups: [
      {
        all_groups: allGroupes.length,
      },
      {
        January: January.length,
        February: February.length,
        March: March.length,
        April: April.length,
        May: May.length,
        June: June.length,
        July: July.length,
        August: August.length,
        September: September.length,
        October: October.length,
        November: November.length,
        December: December.length,
      },
    ],
    Teachers: [
      {
        all_teachers: allTeachers.length,
      },
      {
        January: January2.length,
        February: February2.length,
        March: March2.length,
        April: April2.length,
        May: May2.length,
        June: June2.length,
        July: July2.length,
        August: August2.length,
        September: September2.length,
        October: October2.length,
        November: November2.length,
        December: December2.length,
      },
    ],
    Students: [
      {
        all_students: allStudents.length,
      },
      {
        January: January3.length,
        February: February3.length,
        March: March3.length,
        April: April3.length,
        May: May3.length,
        June: June3.length,
        July: July3.length,
        August: August3.length,
        September: September3.length,
        October: October3.length,
        November: November3.length,
        December: December3.length,
      },
    ],
  };
  res.status(200).json({ data: data });
};

exports.teacherStatistics = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const groupes = await Groupes.find({ secondaryTeacherId }).populate(
    "secondaryTeacherId"
  );
  data = groupes.length;
  if (!groupes.length) res.status(404).json({ message: "No groups" });

  res.status(200).json({ data: groupes, length: data });
};