# ⚙️ Local Development Setup for LoL Edge

This guide walks you through how to run both the frontend and backend locally for development and testing.

---

## 1. Clone the Repository

```bash
git clone https://github.com/Nobody-O/lol-edge.git
cd lol-edge
```

---

## 🖥️ 2. Run the Backend (Flask API)

```bash
cd backend
pip install -r requirements.txt
```

Then create a `.env` file in the `backend/` folder:

```
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Then start the backend server:

```bash
python app.py
```

This will start the backend at:  
➡️ `http://localhost:5000`

---

## 💻 3. Run the Frontend (React + Vite)

```bash
cd ../frontend
npm install
```

Then create a `.env.local` file in the `frontend/` folder:

```
VITE_API_URL=http://localhost:5000
```

Then start the frontend dev server:

```bash
npm run dev
```

The frontend will run at:  
➡️ `http://localhost:5173`

---

## Local Test Flow

1. Go to `http://localhost:5173`
2. Search for a summoner like `Faker#KR1`
3. Backend and frontend will communicate through local environment
4. Profile, match history, and live data will load if the Riot API key is valid

---

## 📁 Project Folder Structure

```
lol-edge/
├── backend/       # Flask backend API
│   └── .env       # Contains RIOT_API_KEY
├── frontend/      # React frontend (Vite + Tailwind)
│   └── .env.local # Contains VITE_API_URL
```

---

## Notes

- Keep your `.env` files **out of GitHub** by listing them in `.gitignore`
- Your Riot API key must be active and tied to your developer account
- Vercel (frontend) and Render (backend) use **separate** environment variable dashboards
- Don’t expose your API key in frontend code or console logs

---

## Production Links

| Type     | URL                                   |
| -------- | ------------------------------------- |
| Frontend | https://lol-edge.vercel.app           |
| Backend  | https://lol-edge-backend.onrender.com |

---

## 🎯 Built by Nobody-O

Final Year BSc Computer Science Project  
GitHub: [https://github.com/Nobody-O](https://github.com/Nobody-O)
