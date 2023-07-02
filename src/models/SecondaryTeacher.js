const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    telegramUsername: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    jins: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Secondary Teacher", schema);
