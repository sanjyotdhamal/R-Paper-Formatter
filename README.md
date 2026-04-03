# 📄 R-Paper Formatter

> AI-powered research paper formatter — convert your raw PDF into IEEE, Springer, or any journal format instantly.

![Status](https://img.shields.io/badge/Status-Under%20Development-yellow)
![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## 🚧 Project Status

This project is currently **under active development**.

| Module | Status |
|--------|--------|
| Frontend UI | ✅ Complete |
| Backend API | 🔄 In Progress |
| AI Integration | 🔄 In Progress |
| Frontend-Backend Connection | ⏳ Pending |
| Deployment | ⏳ Pending |

---

## 🎯 What It Does

Upload your raw research paper as a PDF and instantly convert it to your desired format — whether for a **Conference** (IEEE, Springer) or any **Journal** — using the power of AI.

---

## ✨ Features

- 📂 **Drag & Drop PDF Upload**
- 🎤 **Conference Formats** — IEEE, Springer, and custom templates
- 📰 **Journal Formats** — 17+ journal formats with searchable dropdown
- 🤖 **AI Powered** — Google Gemini AI extracts and structures content
- 🎨 **Modern UI** — Clean, professional design with dark mode
- 📊 **Real-time History** — Track all your formatted papers
- ⬇️ **Download** — Get your formatted paper as a Word document

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS |
| Backend | Python + FastAPI |
| AI | Google Gemini AI |
| Database | MongoDB |
| Icons | Lucide React |
| Font | Inter |

---

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --reload
```

---

## 📁 Project Structure
```
r-paper-formatter/
├── frontend/                 # React.js frontend
│   └── src/
│       ├── components/       # UI components
│       └── context/          # Theme context
└── backend/                  # FastAPI backend
    ├── ai/                   # Google Gemini AI
    ├── database/             # MongoDB connection
    ├── parser/               # PDF extractor
    ├── formatter/            # Format engines
    ├── output/               # DOCX generator
    └── templates/            # IEEE, Springer templates
```

---

---

## 👨‍💻 Developer

**Sanjyot Dhamal**

[![Portfolio](https://img.shields.io/badge/Portfolio-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://sanjyot-portfolio.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-sanjyotdhamal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sanjyotdhamal)

---

> ⭐ Star this repo if you find it useful!
