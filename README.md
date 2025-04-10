# 📚 SnapNotes – AI-Powered Syllabus Key Notes Generator

SnapNotes is a web application that uses **AI + OCR** to help students automatically generate **concise key notes** from their syllabus.  
Upload an image of your syllabus (photo, scan, or PDF), and SnapNotes will:

- Extract the text using OCR
- Understand the subject and syllabus structure
- Ask you which unit/topic you need
- Generate clean, study-ready bullet-point notes using AI

Perfect for students, teachers, and academic content creators. ✨

---

## 🚀 Features

- 📸 Upload syllabus as image (JPG/PNG) or PDF
- 🔍 Text extraction using Tesseract.js / Vision API
- 🧠 AI identifies subject + syllabus layout
- ✍️ Pick a unit → Get instant key points
- 📤 Export generated notes as PDF or copy as text
- 💬 Clean, interactive UI for easy use

---

## 🛠 Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| Frontend      | React / Next.js + Tailwind CSS    |
| OCR           | Tesseract.js / Google Vision API  |
| AI            | OpenAI GPT-4 API (or Claude AI)   |
| Export        | jsPDF, html2pdf.js                |
| Backend (optional) | Node.js + Express             |

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Joerakesh/ai-syllabus-notes
cd snapnotes-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup .env
Create a .env file and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the development server
Create a .env file and add your API keys:

```bash
npm run dev
```
Visit http://localhost:3000 in your browser.
