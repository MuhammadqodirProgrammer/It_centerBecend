const Students = require("../models/Stundent");
exports.studentAdd = async (req, res) => {
  const { name, surname, age, phoneNumber, telegramUsername, jins, groupId } =
    req.body;
  const { imageName: image } = req;

  Students.create({
    image,
    name,
    surname,
    age,
    groupId,
    phoneNumber,
    telegramUsername,
    jins,
  });
  res.status(201).json({ message: "Student added successfully" });
};

exports.studentGetAll = async (req, res) => {
  const skip = req.params['skip'].split("=")[1]
  const limit = req.params['limit'].split("=")[1]
  const s = (skip - 1) * limit
  console.log(s ,"s");
  const students = await Students.find().skip(s).limit(limit).populate("groupId");

  const allData = await Students.find()
  const total_page = Math.ceil(allData.length/limit)
  console.log(total_page);
  res.status(200).json({ data: students ,total_page});
};

exports.studentGetOne = async (req, res) => {
  const { id } = req.params;
  const student = await Students.findById(id).populate("groupId");

  res.status(200).json({ data: student });
};

exports.studentEdit = async (req, res) => {
  const { id } = req.params;
  const { name, surname, age, phoneNumber, telegramUsername, jins, groupId } = req.body;
  const { imageName: image } = req;
  await Students.findByIdAndUpdate(id, {
    $set: {
      name,
      surname,
      age,
      phoneNumber,
      telegramUsername,
      jins,
      image,
      groupId
    },
  });

  res.status(200).json({ message: "Updated student" });
};

exports.studentDelete = async (req, res) => {
  const { id } = req.params;
  await Students.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted student" });
};

exports.studentGetSelf = async (req, res) => {
  const { id } = req.params;
  const { id: studentId } = req.verified;
  if (id == studentId) {
    const student = await Students.findById(id).populate("groupId");
    res.status(200).json({ data: student });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};

exports.studentEditSelf = async (req, res) => {
  const { id } = req.params;
  const { id: studentId } = req.verified;
  if (id == studentId) {
    const { name, surname, age, phoneNumber, telegramUsername, jins } = req.body;
  const { imageName: image } = req;
  await Students.findByIdAndUpdate(id, {
    $set: {
      name,
      surname,
      age,
      phoneNumber,
      telegramUsername,
      jins,
      image,
    },
  });

  res.status(200).json({ message: "Updated student" });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};


exports.studentSearch = async (req, res) => {
  const search = req.params["search"].split("=")[1].toLowerCase();;
  const students = await Students.find({});

 const searchedStudents = students.filter((student) => student.name.toLowerCase().includes(search)||student.surname.toLowerCase().includes(search));
  // console.log(searchedTeachers);

  res.status(200).json({ data: searchedStudents });
};

exports.studentGetAllForTeacher = async (req, res) => {
  const students = await Students.find().populate("groupId");
  res.status(200).json({ data: students });
};