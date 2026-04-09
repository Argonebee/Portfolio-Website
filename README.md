# Full-Stack Developer Portfolio

Modern single-page portfolio with a React (Vite) frontend and minimal Node.js/Express backend.

## Tech Stack

- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Font: IBM Plex Sans
- Deploy targets: Vercel (frontend), Render or Railway (backend)

## Project Structure

- `frontend/`: Single-page portfolio UI
- `backend/`: Contact API server

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

Environment variable:

- `VITE_API_BASE_URL`: backend URL, e.g. `http://localhost:5000`

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

Environment variables:

- `PORT` (optional): server port (default `5000`)
- `CLIENT_ORIGIN` (optional): allowed CORS origin (default `http://localhost:5173`)

## API

### `POST /contact`

Request body:

```json
{
  "name": "Aromal",
  "email": "aromal@example.com",
  "message": "Hello from portfolio form"
}
```

Response:

```json
{
  "message": "Message received successfully."
}
```

## Content Data Files

Update these files to edit portfolio content quickly:

- `frontend/src/data/projects.js`
- `frontend/src/data/skills.js`
- `frontend/src/data/achievements.js`

## Resume

- Place your real resume PDF at `frontend/public/resume.pdf`.
- A placeholder PDF is included and can be replaced directly.

## Deployment

### Frontend (Vercel)

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_BASE_URL` in Vercel env vars (your backend URL)

### Backend (Render/Railway)

- Root directory: `backend`
- Start command: `npm start`
- Add `CLIENT_ORIGIN` = your deployed frontend URL

## Deployment-Ready Checklist (Tailored)

Use this as your go-live checklist.

### 1. Final URL Values

- [ ] GitHub profile: `https://github.com/Argonebee`
- [ ] Repository URL: `https://github.com/Argonebee/<repo-name>`
- [ ] Frontend URL (Vercel): `https://<your-vercel-project>.vercel.app`
- [ ] Backend URL (Render/Railway): `https://<your-backend-service>.onrender.com` or `https://<your-backend-service>.up.railway.app`

### 2. Backend Deployment (First)

- [ ] Deploy backend from `backend` folder
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Set env var `CLIENT_ORIGIN` = your Vercel URL
- [ ] Confirm health endpoint works: `GET <BACKEND_URL>/health`

### 3. Frontend Deployment (Vercel)

- [ ] Import GitHub repo in Vercel
- [ ] Set Root Directory to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Set env var `VITE_API_BASE_URL` = `<BACKEND_URL>`
- [ ] Redeploy frontend after env var is set

### 4. CORS + Connectivity

- [ ] Backend `CLIENT_ORIGIN` exactly matches frontend domain (including `https`)
- [ ] Frontend `VITE_API_BASE_URL` points to deployed backend (not localhost)
- [ ] No CORS errors in browser console

### 5. Production Smoke Test

- [ ] Open homepage and verify sections load correctly
- [ ] Navbar active indicator works on click and scroll
- [ ] Submit Contact form successfully
- [ ] Confirm backend log receives contact message
- [ ] Resume download button works

### 6. Post-Deploy Cleanup

- [ ] Add custom domain (optional)
- [ ] Update `CLIENT_ORIGIN` if domain changes
- [ ] Keep secrets only in deployment platform env settings

## Notes

- Uses smooth scroll + sticky glass navbar
- Contact form is connected to backend API
- Messages are currently stored in-memory and logged on server
