"use strict";

const { Course } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const CourseId = +req.params.CourseId;
    const course = await Course.findByPk(CourseId);
    if (!Number(CourseId)) {
      throw new Error("Bad Request");
    }
    if (!course) {
      throw new Error("Data Error");
    }
    if (role === "admin") {
      if (id !== course.UserId) {
        throw new Error("Forbidden");
      }
    }
    next();
  } catch (err) {
    const { name } = err;
    if (name === "Forbidden") {
      res.status(403).json({
        status: "failed",
        code: 403,
        message: "You do not have access",
      });
    } else {
      res.status(500).json({
        status: "Failed",
        code: 500,
        message: err,
      });
    }
  }
};

module.exports = authorization;
