const { connect } = require("mongoose");
const config = require("config");
const Admins = require("../models/Admin");

const run = async (app) => {
  await connect(config.get("MONGO_URI"));

  const admin = await Admins.findOne();
  if (!admin)
    Admins.create({
      username: "admin",
      password: "$2a$10$4GFd8yGZjTjwiazICt3Us.UyvZwKEn9cyoN63ZJSkShYMMzGjxhr6",
      role: "admin",
    });

  const PORT = config.get("PORT");
  app.listen(PORT, () => {
    console.log(PORT);
  });
};

module.exports = run;
