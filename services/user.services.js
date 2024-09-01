const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUpServices = async (data) => {
  console.log("data",data);
  console.log("password",data.password);
  //   const password = this.password;

  //   const hashedPassword = bcrypt.hashSync(password);

  //   this.password = hashedPassword;
  //   this.confirmPassword = undefined;
  if (data.password !== data.confirmPassword) {
    return "confirmPassword Passwords don't match!";
  }
  const password = data.password;
  console.log('passwords',password);
  const hashedPassword = bcrypt.hashSync(password);
  data.password = hashedPassword;
  const user = await User.create(data);
  
  return user;
};

const verifyEmailServices = async (token) => {
  return await User.findOne({ confirmationToken: token });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).populate("createdJobs");
};

module.exports = { signUpServices, verifyEmailServices, findUserByEmail };