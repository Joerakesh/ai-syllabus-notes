const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { buffer } = req.file;

    const {
      data: { text },
    } = await Tesseract.recognize(buffer, "eng");

    res.json({ extractedText: text });
  } catch (err) {
    console.error("OCR Error:", err);
    res.status(500).send("OCR failed");
  }
});

app.post("/generate", async (req, res) => {
  try {
    const { unitText } = req.body;

    // Use full model path with v1-compatible syntax
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const result = await model.generateContent([
      `Generate key notes for this syllabus content and full study material:\n${unitText}`,
    ]);

    const response = result.response;
    const notes = await response.text();

    res.json({ notes });
  } catch (err) {
    console.error("Gemini AI Error:", err);
    res.status(500).send("AI summarization failed");
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
