const Idea = require("../models/Startup.model");

const getAllIdeasServices = async (filters, queries) => {
  const idea = await Idea.find(filters).sort(queries.sortBy);
  return idea;
};

const createNewIdeaServices = async (data) => {
  console.log("creator",data)
  const createrId = data.email;
  console.log("creatorId",createrId)
  const idea = await Idea.create(data);
//   await User.findOneAndUpdate(
//     { _id: createrId },
//     { $push: { ideas: idea._id } }
//   );
  return idea;
};


// const updateIdeaServices = async (id, data) => {
//   const idea = await Idea.findOneAndUpdate({ _id: id }, data);
//   return idea;
// };

const getIdeaByIdServices = async (id) => {
  return await Idea.findById(id);
};

module.exports = {
  createNewIdeaServices,
//   updateIdeaServices,
  getAllIdeasServices,
  getIdeaByIdServices,
};