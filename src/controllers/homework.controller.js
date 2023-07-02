const Groupes = require('../models/Group');
const SecondaryTeachers = require('../models/SecondaryTeacher');
const Students = require('../models/Stundent');
const Homeworks = require('../models/Homework');

exports.homeworkPost = async (req, res) => {
	const role = req.verified;

	if (!role.role) {
		const { title, lesson } = req.body;
		const { imageName: image } = req;
		const studentId = role.id;

		const allData = await Groupes.find();
		const students = await Students.find();
		const a = students.filter((el) => el._id == studentId);
		const groupId = a[0].groupId;

		const b = allData.filter((el) => {
			if (el.id == groupId) {
				return el;
			}
		});
		const secondaryTeacherId = b[0].secondaryTeacherId;
		Homeworks.create({
			title,
			lesson,
			studentId,
			image,
			groupId,
			secondaryTeacherId,
		});
		res.status(201).json({ message: 'Homework posted Successfully' });
	} else {
		res.status(400).json({ message: 'You are not student' });
	}
};

exports.allHomeworks = async (req, res) => {
	const { id: studentId } = req.verified;

	if (!req.verified.role) {
		const homeworks = await Homeworks.find({ studentId }).populate(
			'studentId groupId secondaryTeacherId'
		);
		res.status(200).json({ data: homeworks });
	} else {
		res.status(400).json({ message: 'You are not student' });
	}
};

exports.oneHomework = async (req, res) => {
	const { id } = req.params;
	const { id: studentId } = req.verified;
	if (!req.verified.role) {
		const homework = await Homeworks.findById(id)
			.find({ studentId })
			.populate('studentId groupId secondaryTeacherId');
		res.status(200).json({ data: homework });
	} else {
		res.status(400).json({ message: 'You are not student' });
	}
};

exports.editOneHomework = async (req, res) => {
	const { id } = req.params;
	const { id: studentId } = req.verified;
	console.log(req.body);
	if (!req.verified.role) {
		const { title, lesson } = req.body;
		const { imageName: image } = req;
		await Homeworks.findByIdAndUpdate(id, {
			$set: {
				title,
				lesson,
				image,
			
				studentId,
			},
		});
		res.status(200).json({ message: 'Updated homework' });
	} else {
		res.status(400).json({ message: 'You are not student' });
	}
};

exports.getHomeworksForTeacher = async (req, res) => {
	const { id: secondaryTeacherId } = req.verified;
	console.log(secondaryTeacherId, '649bc412e3fd7bddf4fb03db');

	const homeworks = await Homeworks.find({ secondaryTeacherId }).populate(
		'studentId groupId secondaryTeacherId'
	);
	res.status(200).json({ data: homeworks });
};

exports.getOneHomeworkForTeacher = async (req, res) => {
	const { id } = req.params;
	const { id: secondaryTeacherId } = req.verified;
	const homework = await Homeworks.findById(id)
		.find({ secondaryTeacherId })
		.populate('studentId groupId secondaryTeacherId');
	res.status(200).json({ data: homework });
};
