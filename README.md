# ReportLens-AI 📄🔍

> An AI-powered document analysis platform that extracts intelligent insights and summaries from uploaded reports.

---

## 1. Description
ReportLens-AI automates the laborious task of reading and comprehending lengthy reports. By leveraging Optical Character Recognition (OCR) combined with advanced Generative AI capabilities, it extracts raw text from document images/PDFs and synthesizes structured insights, summaries, and key takeaways down to the finest detail.

## 2. Problem It Solves
Organizations and individuals often deal with exhaustive volumes of documentation—financial reports, legal contracts, technical manuals, and business proposals. Manually reading and analyzing such documents is time-consuming and prone to human error. ReportLens-AI bridges this gap by automatically parsing the text and intelligently highlighting the core information required for rapid decision-making.

## 3. Key Features
- **Intelligent OCR Extraction**: Accurately pulls text from uploaded document formats using Tesseract.js.
- **AI-Powered Analysis**: Generates comprehensive structured insights and summaries via the Google Gemini API.
- **Robust Storage**: Securely stores generated insights using PostgreSQL and Prisma ORM for future reference.
- **RESTful API Architecture**: Decoupled backend enabling flexible consumption across any frontend or third-party service.
- **Production-Ready Deployment**: Containerized with Docker and fully automated CI/CD pipelines targeting Oracle Virtual Machines.

## 4. System Architecture

```text
  +-------------+       +-------------------+       +-----------------------+
  |             |       |                   |       |                       |
  |    User     | ----> | Frontend (React / | ----> | Backend API (Node.js /|
  | (Upload)    |       | Next.js Client)   |       | Express.js Server)    |
  |             |       |                   |       |                       |
  +-------------+       +-------------------+       +-----------+-----------+
                                                                |
                                                                | (Image/PDF context)
                                                                v
                                                    +-----------+-----------+
                                                    |                       |
                                                    |  OCR Processing       |
                                                    |  (Tesseract.js)       |
                                                    |                       |
                                                    +-----------+-----------+
                                                                |
                                                                | (Extracted Text)
                                                                v
                                                    +-----------+-----------+
                                                    |                       |
                                                    |  AI Analysis          |
                                                    |  (Google Gemini API)  |
                                                    |                       |
                                                    +-----------+-----------+
                                                                |
                                                                | (Structured Insights)
                                                                v
                                                    +-----------+-----------+
                                                    |                       |
                                                    |  Database             |
                                                    |  (PostgreSQL/Prisma)  |
                                                    |                       |
                                                    +-----------------------+
```

## 5. Technology Stack
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **OCR Engine**: Tesseract.js
- **AI Integration**: Google Gemini API
- **Database / ORM**: PostgreSQL, Prisma
- **DevOps / Infrastructure**: Docker, GitHub Actions (CI/CD), Oracle Virtual Machine

## 6. Project Structure
```text
repo/
├─ client/                  # Frontend application (Next.js)
│
├─ server/                  # Backend application (Node.js/Express)
│  ├─ Dockerfile            # Container definition for the backend
│  ├─ src/
│  │  ├─ app.js             # Express application & entry point
│  │  ├─ routes/            # API Route definitions
│  │  ├─ controllers/       # Application logic & request handling
│  │  ├─ services/
│  │  │  ├─ ocr.service.js  # Tesseract.js execution logic
│  │  │  └─ ai.service.js   # Gemini API interaction logic
│  │  └─ prisma/            # Database schema and migrations
│  │
│  └─ package.json          # Server dependencies
│
├─ .github/
│  └─ workflows/
│     ├─ ci.yml             # Continuous Integration pipeline
│     └─ cd.yml             # Continuous Deployment pipeline
│
└─ README.md                # Project documentation
```

## 7. Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ReportLens-AI.git
   cd ReportLens-AI
   ```

2. **Install Client Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Setup Prisma Database:**
   Ensure PostgreSQL is running, then populate your schema:
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

## 8. Running Locally

Ensure your PostgreSQL database is running and environment variables are set correctly in `server/.env`.

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend server (in a separate terminal):**
```bash
cd client
npm run dev
```

## 9. Running with Docker

You can easily spin up the backend leveraging Docker for localized testing:
```bash
cd server
docker build -t reportlens-ocr:latest .
docker run -d --name reportlens-backend \
  -p 8080:8080 \
  -e PORT=8080 \
  -e BACKEND_PORT=8080 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e GEMINI_API_KEY="your-api-key" \
  -e GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  reportlens-ocr:latest
```

## 10. Environment Variables
Create a `.env` file in the `server/` directory and configure the following parameters:

```env
# Server Port Configuration
BACKEND_PORT=8080

# PostgreSQL Connection String
DATABASE_URL="postgresql://username:password@localhost:5432/reportlens"

# Google Gemini Credentials
GEMINI_API_KEY="your_google_gemini_api_key"
GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
```

## 11. CI Pipeline Explanation
Configured via GitHub Actions (`.github/workflows/ci.yml`), the Continuous Integration (CI) workflow systematically triggers on every push or pull request targeting the `main` branch. 
- **Build**: Compiles the Node.js source and constructs the Docker image.
- **Run**: Spins up the container leveraging injected environment secrets.
- **Verification**: Requests the `/health` endpoint to assert the server has initialized gracefully. If the server crashes or the endpoint is unreachable, the pipeline intentionally fails to prevent merging broken code.

## 12. CD Pipeline Explanation
Triggered automatically upon the successful completion of the CI pipeline on the `main` branch.
- **Build & Push**: Builds the production Docker image and pushes it to an established container registry (e.g., DockerHub or GitHub Container Registry).
- **Deploy**: Connects to the Oracle Virtual Machine over SSH, pulls the latest registry image, and smoothly restarts the backend container.

## 13. Oracle VM Deployment Explained
The production application is securely hosted on an Oracle Virtual Machine environment. The CD Pipeline manages updates directly by running remote commands. The VM executes standard Docker container footprints. The frontend communicates with the exposed backend port, which is securely whitelisted via configured Oracle Virtual Cloud Network (VCN) security rules.

## 14. Example API Endpoints

- **`GET /health`**
  Returns the server operational status to confirm availability.
  ```json
  { "message": "Server is running" }
  ```

- **`POST /api/upload`** *(Example)*
  Accepts a `multipart/form-data` file for ongoing OCR and semantic AI analysis processing.
  Returns structured analytical insights derived from Gemini.

## 15. Future Improvements
- **Multi-Page PDFs**: Expand OCR robustness to seamlessly process parallel parsing of immense manual volumes.
- **WebSockets / Server-Sent Events**: Stream insights continuously in real-time as the AI analyzes document chunks, avoiding HTTP timeouts on huge files.
- **Authentication Setup**: Implement organizational constraints and robust JWT strategies.

## 16. Contributing
Contributions are highly encouraged!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 17. License
Distributed under the MIT License. See `LICENSE` for more information.
