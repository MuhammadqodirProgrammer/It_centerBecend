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
    rank: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    secondaryTeacherId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Secondary Teacher",
    },
    homeworkId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Homework",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Grade", schema);
