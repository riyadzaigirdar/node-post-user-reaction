const moment = require("moment");

// logger middleware when new request comes

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } at ${moment().format()}`
  );
  next();
};

module.exports = logger;