# ✨ SnapNotes AI 📸📝

SnapNotes is a smart note generator that extracts text from syllabus images and generates structured study notes using AI.

## 🚀 Features

- 📸 Upload scanned syllabus or textbook images
- 🧠 Extract text using OCR
- 🔍 Enter any unit/topic
- ✨ Generate smart, summarized notes with AI
- 📄 Export AI notes as beautifully styled PDF
- 🎨 Funky UI with colorful buttons, emojis, and cool fonts

---

## 📦 Tech Stack

- **Frontend**: Next.js, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express.js, Gemini API (for AI note generation)
- **PDF Export**: jsPDF + html2canvas

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Joerakesh/ai-syllabus-notes.git
cd ai-syllabus-notes
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Set up Environment

Create a `.env` file in the `backend` folder:

```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Make sure your Gemini API key is correct.

---

## 💡 Running the App

### Start the Backend

```bash
cd backend
npm run dev
```

### Start the Frontend

```bash
cd ../frontend
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📥 Export to PDF

Click the `📥 Export to PDF` button after generating notes — it'll capture the notes section and download a styled PDF!

---

## 🛠️ To-Do / Improvements

- [ ] Add support for multiple image uploads
- [ ] History of generated notes
- [ ] User login for saving progress
- [ ] Better OCR post-processing

---

## 👨‍💻 Author

Made with ❤️ by Joe Rakesh

---

## 🧠 License

MIT License — feel free to use, share, and improve!
