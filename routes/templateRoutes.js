const express = require("express");
const multer = require("multer");
const path = require("path");
const { createTemplate, getAllTemplates, getTemplateById ,fillTemplate,userinterface } = require("../controllers/templateController");

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("document"), createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);

// route for fill data
router.post("/:id/fill",fillTemplate);
module.exports = router;
