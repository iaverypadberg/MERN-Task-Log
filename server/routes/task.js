const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/users");
const Utils = require("../utils/errors");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

router.use(express.json()); //*****************THIS LINE IS HELLA IMPORTANT*******************//

router.post("/addtask", verifyUser, async (req, res, next) => {
  try {
    const { name, day, importance } = await req.body;
    const { _id } = req.user;
    const data = new Date();
    const time = data.getTime();

    // Make a new task and store it
    const user = await User.findOne(_id);
    // Push the task into the array of task ID's and save it
    user.tasks.push({
      name: name,
      day: day,
      importance: importance,
      time: time,
    });

    const newTask = {
      name: name,
      day: day,
      importance: importance,
      time: time,
    };
    await user.save();
    // Only want to return the newly added task
    res.json(newTask);
  } catch (err) {
    console.log(err);
  }
});

router.get("/tasks", verifyUser, async (req, res, next) => {
  try {
    const user = req.user;
    const confirmedUser = await User.findById(user._id);
    res.json(confirmedUser.tasks);
  } catch (err) {
    console.log(err);
  }
});

// Delete a task and remove the reference from the User array
router.delete("/delete", verifyUser, async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    const deletedTask = await User.findByIdAndUpdate(
      { _id },
      { $pull: { tasks: { _id: id } } }
    );
    await deletedTask.save();
    res.json({ deletedTask });
  } catch (err) {
    console.log({ err });
  }
});

// Handle errors n stuff
const handleValidationErr = (err) => {
  //In a real app, we would do a lot more here...
  return new Utils.AppError(`Validation Failed...${err.message}`, 400);
};

router.use((err, req, res, next) => {
  console.log(err.name);
  //We can single out particular types of Mongoose Errors:
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});

router.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

module.exports = router;
