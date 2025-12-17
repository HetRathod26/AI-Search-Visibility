# AI Search Visibility Grader - Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Edit `backend/.env` and add your API credentials:
```
DATAFORSEO_LOGIN=your_actual_login
DATAFORSEO_PASSWORD=your_actual_password
OPENAI_API_KEY=sk-your_actual_key
```

### 3. Start Backend Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 4. Test API
Open browser or Postman:
```
GET http://localhost:5000/api/report
```

## API Endpoints

### `GET /api/report`
Returns combined data from DataForSEO and OpenAI for brand "OpenAI"

**Response:**
```json
{
  "brand": "OpenAI",
  "serpData": { ... },
  "aiInsights": "..."
}
```

## Architecture

```
Frontend (React) → Backend (Node/Express) → DataForSEO + OpenAI
```

## Feature Mapping

| Feature | Source |
|---------|--------|
| Brand Ranking | DataForSEO |
| Competitor Visibility | DataForSEO |
| SERP Presence | DataForSEO |
| AI Brand Overview | OpenAI |
| Sentiment Analysis | OpenAI |
| Information Depth | OpenAI |
| Recommendations | OpenAI |
| AI Visibility Score | Backend (formula) |

## Development Phases

**Phase 1 (Current):** Fixed brand, static API calls
**Phase 2:** Accept company name + URL from frontend
**Phase 3:** Add scoring formulas

## Security

⚠️ **NEVER** commit `.env` file to GitHub
⚠️ **NEVER** expose API keys to frontend
✅ Backend controls all API calls and scoring
