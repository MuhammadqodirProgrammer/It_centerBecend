const Groupes = require("../models/Group");
exports.groupAdd = async (req, res) => {
  const {
    profession,
    groupNumber,
    teacher,
    days,
    hours,
    roomName,
    secondaryTeacherId,
  } = req.body;
  const { imageName: image } = req;

  Groupes.create({
    profession,
    groupNumber,
    teacher,
    days,
    hours,
    roomName,
    secondaryTeacherId,
    image,
  });
  res.status(201).json({ message: "Group added successfully" });
};

exports.groupGetAll = async (req, res) => {
  const skip = req.params["skip"].split("=")[1];
  const limit = req.params["limit"].split("=")[1];
  const s = (skip - 1) * limit
  const groupes = await Groupes.find()
    .skip(s)
    .limit(limit)
    .populate("secondaryTeacherId");

    const allData = await Groupes.find()
const total_page = Math.ceil(allData.length/limit)

  res.status(200).json({ data: groupes,total_page });
};
exports.groupGet = async (req, res) => {


    const allData = await Groupes.find()

  res.status(200).json({ data: allData });
};
exports.groupGetOne = async (req, res) => {
  const { id } = req.params;
  const group = await Groupes.findById(id).populate("secondaryTeacherId");

  res.status(200).json({ data: group });
};

exports.groupEdit = async (req, res) => {
  const { id } = req.params;
  const {
    profession,
    groupNumber,
    teacher,
    days,
    hours,
    roomName,
    secondaryTeacherId,
  } = req.body;
  const { imageName: image } = req;
  await Groupes.findByIdAndUpdate(id, {
    $set: {
      profession,
      groupNumber,
      teacher,
      days,
      hours,
      roomName,
      image,
      secondaryTeacherId,
    },
  });

  res.status(200).json({ message: "Updated group" });
};

exports.groupDelete = async (req, res) => {
  const { id } = req.params;
  await Groupes.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted group" });
};

exports.groupsOfTeacher = async (req, res) => {
  const { id: secondaryTeacherId } = req.verified;
  const skip = req.params["skip"].split("=")[1];
  const limit = req.params["limit"].split("=")[1];
  const s = (skip - 1) * limit
  const groupes = await Groupes.find({ secondaryTeacherId })
    .skip(s)
    .limit(limit)
    .populate("secondaryTeacherId");
    const allData = await Groupes.find()
const total_page = Math.ceil(allData.length/limit)
  if (!groupes.length) res.status(404).json({ message: "No groups" });

  res.status(200).json({ data: groupes  ,total_page});
};

exports.groupOfTeacherGetOne = async (req, res) => {
  const { id } = req.params;
  const { id: secondaryTeacherId } = req.verified;

  const group = await Groupes.findById(id)
    .find({ secondaryTeacherId })
    .populate("secondaryTeacherId");
  if (!group.length) res.status(404).json({ message: "No such group" });

  res.status(200).json({ data: group });
};


exports.groupSearch = async (req, res) => {
  const search = req.params["search"].split("=")[1];
  console.log(search);
  const groupes = await Groupes.find({});
  console.log(groupes);

 const searchedGroupes = groupes.filter((group) => group.groupNumber.toString().includes(search));
  console.log(searchedGroupes);

  res.status(200).json({ data: searchedGroupes });
};