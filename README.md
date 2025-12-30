# Pastebin Lite

A lightweight paste-sharing application that allows users to create text pastes with optional expiration time (TTL) and view limits. Pastes automatically become unavailable once constraints are met.

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `/server`:
```env
PORT=3000
MONGODB_URI=your-mongo-db-url
BASE_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

Server runs at: `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `/client`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Start frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🗄️ Persistence Layer

This application uses **MongoDB** for data persistence. Each paste is stored with:
- Content (text)
- Optional expiration timestamp (TTL)
- Optional maximum view count
- Current view count

TTL and view limits are enforced at the application level. Pastes are automatically marked unavailable once they expire or reach their view limit.

## 📡 Key API Endpoints

**Create Paste**
```
POST /api/pastes
Body: { "content": "text", "ttl_seconds": 60, "max_views": 5 }
```

**View Paste**
```
GET api/p/:id
```
**Get a Paste**
```
GET api/pastes/:id
```

## 🛠️ Tech Stack

**Frontend:** React (Vite), Fetch API, CSS  
**Backend:** Node.js, Express, MongoDB (Mongoose)

---

**Author:** Jishad Ali | GitHub: [@Jishadaly](https://github.com/Jishadaly)