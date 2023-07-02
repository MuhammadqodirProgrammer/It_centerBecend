const SecondaryTeachers = require("../models/SecondaryTeacher");
exports.teacherAdd = async (req, res) => {
  const {
    name,
    surname,
    age,
    profession,
    phoneNumber,
    telegramUsername,
    jins,
  } = req.body;
  const { imageName: image } = req;

  const role = "teacher";

  SecondaryTeachers.create({
    image,
    name,
    surname,
    age,
    profession,
    phoneNumber,
    telegramUsername,
    jins,
    role,
  });
  res.status(201).json({ message: "Secondary Teacher added successfully" });
};

exports.teacherGetAll = async (req, res) => {
  const skip = req.params["skip"].split("=")[1];
  const limit = req.params["limit"].split("=")[1];
  const s = (skip - 1) * limit
  const teachers = await SecondaryTeachers.find().skip(s).limit(limit);
const allData = await SecondaryTeachers.find()
const total_page = Math.ceil(allData.length/limit)


  res.status(200).json({ data: teachers,total_page });

};
exports.teacherGet = async (req, res) => {

const allData = await SecondaryTeachers.find()


  res.status(200).json({ data: allData });

};

exports.teacherGetOne = async (req, res) => {
  const { id } = req.params;
  const teacher = await SecondaryTeachers.findById(id);

  res.status(200).json({ data: teacher });
};

exports.teacherEdit = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    surname,
    age,
    profession,
    phoneNumber,
    telegramUsername,
    jins,
  } = req.body;
  const { imageName: image } = req;
  const role = "teacher";
  await SecondaryTeachers.findByIdAndUpdate(id, {
    $set: {
      name,
      surname,
      age,
      profession,
      phoneNumber,
      telegramUsername,
      jins,
      image,
      role,
    },
  });

  res.status(200).json({ message: "Updated teacher" });
};

exports.teacherDelete = async (req, res) => {
  const { id } = req.params;
  await SecondaryTeachers.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted teacher" });
};

exports.teacherSelfGet = async (req, res) => {
  const { id: teacherId } = req.verified;
  if (teacherId) {
    const teacher = await SecondaryTeachers.findById(teacherId);
    res.status(200).json({ data: teacher });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};

exports.teacherSelfEdit = async (req, res) => {
  const { id: teacherId } = req.verified;
  if (teacherId) {
    const {
      name,
      surname,
      age,
      profession,
      phoneNumber,
      telegramUsername,
      jins,
    } = req.body;
    const { imageName: image } = req;
    const role = "teacher";
    await SecondaryTeachers.findByIdAndUpdate(teacherId, {
      $set: {
        name,
        surname,
        age,
        profession,
        phoneNumber,
        telegramUsername,
        jins,
        image,
        role,
      },
    });

    res.status(200).json({ message: "Updated teacher" });
  } else {
    res.status(400).json({ message: "You can not do this" });
  }
};

exports.teacherSearch = async (req, res) => {
  const search = req.params["search"].split("=")[1].toLowerCase();
  console.log(search);
  const teachers = await SecondaryTeachers.find({});

 const searchedTeachers = teachers.filter((teacher) => teacher.name.toLowerCase().includes(search) || teacher.surname.toLowerCase().includes(search));
  // console.log(searchedTeachers);

  res.status(200).json({ data: searchedTeachers });
};
