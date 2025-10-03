const Template = require("../models/template");
const { parseOfficeAsync } = require("officeparser");
const path = require("path");
const extractPlaceholders = require("../utilities/placeholderExtractor");

// POST - Add template
exports.createTemplate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Document file required" });

    const filePath = path.join("uploads", req.file.filename);
    const text = await parseOfficeAsync(req.file.path);

    // auto detect placeholders
    const placeholders = extractPlaceholders(text.toString());

    const template = await Template.create({
      name: req.body.name,
      text: text.toString(),
      placeholders: placeholders,
      document: filePath
    });

    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create template" });
  }
};

// GET - All templates
exports.getAllTemplates = async (req, res) => {
  const templates = await Template.findAll();
  res.json(templates);
};

// GET - Single template by ID
exports.getTemplateById = async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) return res.status(404).json({ error: "Template not found" });
  res.json(template);
};


// POST - Fill template placeholders
exports.fillTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    const data = req.body.data; // { Name: "John", Date: "2025-10-01", ... }

    if (!data) return res.status(400).json({ error: "Data for placeholders required" });

    // Fetch template
    const template = await Template.findByPk(templateId);
    if (!template) return res.status(404).json({ error: "Template not found" });

    let filledText = template.text;

    // Replace placeholders
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, "g");
      filledText = filledText.replace(regex, value);
    }

    res.json({ filledText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fill template" });
  }
};
