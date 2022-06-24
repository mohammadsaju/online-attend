const User = require("../models/User");
const error = require("../utils/error");

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createUser = ({ name, email, password, roles, accountStatus }) => {
  const newUser = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["student"],
    accountStatus: accountStatus ? accountStatus : "PENDING"
  });
  return newUser.save();
};

const updateUser = async (id, data) => {
    const user = await findUserByProperty('email', data.email);

    if(user) {
        throw error('user email is already used', 400)
    }
    
    return User.findByIdAndUpdate(id, {...data}, {new: true});
}


module.exports = {
  findUserByProperty,
  createUser,
  findUsers,
  updateUser,
};
