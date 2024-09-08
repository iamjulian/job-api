const express = require("express");
const {
  createNewidea,
  updateIdeaById,
  getAllIdeas,
  getIdeaById,
} = require("../controllers/startup.controller");
const verifyToken = require("../middleware/verifyToken");
const auth = require("../middleware/auth");
const uploader = require("../middleware/uploader");
const router = express.Router();

router.get("/", getAllIdeas);
// router.get("/", verifyToken, getAllIdeas);

router.post(
  "/",
//   verifyToken,
//   (req, res, next) => auth(req, res, next, "invester"),
  createNewidea
);

// router.patch(
//   "/:id",
//   verifyToken,
//   (req, res, next) => auth(req, res, next, "admin", "invester"),
//   updateIdeaById
// );

router.get("/:id", getIdeaById);

module.exports = router;