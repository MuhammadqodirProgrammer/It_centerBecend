const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lesson: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
    secondaryTeacherId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Secondary Teacher",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Homework", schema);
