const crypto = require("crypto");
const { User } = require("../models");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");
const { sendToken } = require("../utils/jwtHandler");
const sendMail = require("../utils/sendMail");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  const message = `Hi, ${name}.\nThanks for registering in Lunch Time. Hope to serve you best food for your lunch.🙂`;
  await sendMail({
    email: user.email,
    subject: "Successful registration.",
    message,
  });

  sendToken(user, 201, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given both
  if (!email || !password) {
    return next(
      new ErrorHandler("Please provide both email and password.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password.", 401));
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid email or password."), 401);
  }

  sendToken(user, 200, res);
});

// exports.logoutUser = asyncHandler(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully.",
//   });
// });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/ums/resetPassword/${resetToken}`;

  const message = `Reset your password at :- \n\n ${resetURL} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendMail({
      email: user.email,
      subject: "Reset your password - (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset mail sent successfully.",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetTokenExpiresIn: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset token is not valid or expired.", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password didn't match.", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.getSelfDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const passwordMatched = await user.comparePassword(req.body.oldPassword);

  if (!passwordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match.", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const newDetails = req.body;

  await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const newDetail = req.body;

  await User.findByIdAndUpdate(req.params.id, newDetail, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
