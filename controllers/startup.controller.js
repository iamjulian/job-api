const {
    createNewIdeaServices,
    updateIdeaServices,
    getAllIdeasServices,
    getIdeaByIdServices,
  } = require("../services/startup.services");
  
  const getAllIdeas = async (req, res) => {
    try {
      let filters = { ...req.query };
      
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach((field) => delete filters[field]);
  
      let filtersString = JSON.stringify(filters);
      
      filtersString = filtersString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
      
  
      filters = JSON.parse(filtersString);
      
  
      const queries = {};
  
      if (req.query.sort) {
        // price,qunatity   -> 'price quantity'
        const sortBy = req.query.sort.split(",").join(" ");
        
        queries.sortBy = sortBy;
      }
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        
        queries.fields = fields;
      }

      
  
      const ideas = await getAllIdeasServices(filters, queries);
  
      if (!ideas) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't get ideas",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "get all ideas",
        data: ideas,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get ideas",
        error: error.message,
      });
    }
  };
  
  const getIdeaById = async (req, res) => {
    try {
      const { id } = req.params;
      const idea = await getIdeaByIdServices(id);
  
      if (!idea) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't get idea with this id",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: idea,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't get idea with this id",
        error: error.message,
      });
    }
  };
  
  const createNewidea = async (req, res, next) => {
    console.log("body",req.body);
    
    try {
      const idea = await createNewIdeaServices(req.body);
  
      if (!idea) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't create idea",
          error: error.message,
        });
      }
  
      res.status(201).json({
        status: "success",
        message: "successfully created idea",
        data: idea,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't create idea",
        error: error.message,
      });
    }
  };
  
//   const updateIdeaById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const data = req.body;
//       const idea = await updateIdeaServices(id, data);
//       if (!idea) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Couldn't get idea with this id",
//           error: error.message,
//         });
//       }
  
//       res.status(201).json({
//         status: "ok",
//         message: "successfully updated idea",
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: "Couldn't get idea with this id",
//         error: error.message,
//       });
//     }
//   };

  module.exports = {
    createNewidea,
    // updateIdeaById,
    getAllIdeas,
    getIdeaById,
  };