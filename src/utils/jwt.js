const jwt = require("jsonwebtoken");
const config = require("config");

const sign = (payload) =>
  jwt.sign(payload, config.get("SECRET_KEY"), { expiresIn: "24h" });

const verify = (payload, err, data) => {
  jwt.verify(payload, config.get("SECRET_KEY"), err, data);
 
};

module.exports = {
  sign,
  verify,
};
