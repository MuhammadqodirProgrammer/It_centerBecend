const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    profession: {
      type: String,
      required: true,
    },
    groupNumber: {
      type: Number,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
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

module.exports = model("Group", schema);
