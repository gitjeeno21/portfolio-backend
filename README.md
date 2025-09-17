### README (Backend)

### Portfolio Backend (Express + MongoDB)

A minimal REST API for handling portfolio contact messages. Built with Express and Mongoose, designed for easy deployment on Railway/Render and integration with a Vite/React frontend.

### Tech Stack

- Express 4
- Mongoose 8
- CORS
- dotenv
- Nodemon (dev)

### Requirements

- Node.js 18+ and npm
- MongoDB (Atlas recommended)

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in `backend/`:

```bash
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=5000
# Either a single URL or comma-separated URLs
FRONTEND_URL=https://your-frontend.vercel.app
# or
FRONTEND_URLS=https://your-frontend.vercel.app,https://staging-frontend.vercel.app
```

Notes:
- `FRONTEND_URLS` (comma-separated) or `FRONTEND_URL` (single) is used to build the CORS allowlist alongside sensible local defaults.

### Scripts

- Development:
```bash
npm run dev
```
- Production:
```bash
npm start
```

### API

Base URL:
- Local: `http://localhost:<PORT>` (default `5000`)
- Production: your Railway/Render URL

Health Check
- GET `/`
- 200 OK, returns "API is running"

Messages
- POST `/api/messages`
  - Body (JSON):
    ```json
    {
      "name": "Your Name",
      "email": "you@example.com",
      "message": "Hello!"
    }
    ```
  - Responses:
    - 201: `{ "success": true, "id": "<mongoId>", "message": "Message stored." }`
    - 400: `{ "success": false, "error": "All fields are required." }`
    - 400: `{ "success": false, "error": "Invalid email." }`
    - 500: `{ "success": false, "error": "Server error." }`

- GET `/api/messages` (optional/admin)
  - Returns array of messages sorted by `createdAt` desc
  - Each message schema:
    ```json
    {
      "_id": "...",
      "name": "string",
      "email": "string",
      "message": "string",
      "status": "unread" | "read",
      "createdAt": "ISO",
      "updatedAt": "ISO",
      "__v": 0
    }
    ```

### Quick Test (local)

Start server:
```bash
npm run dev
```

Send a message:
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

List messages:
```bash
curl http://localhost:5000/api/messages
```

### CORS

- Allowed origins are built from:
  - Local defaults: `http://localhost|127.0.0.1` on ports `8080`, `5500`, `3000`
  - `FRONTEND_URLS` (comma-separated) or `FRONTEND_URL`
- Non-browser tools (curl/Postman) without an Origin header are allowed.

### Data Model

`Message` (`backend/models/Message.js`)
- `name`: string, required, trimmed, max 120
- `email`: string, required, trimmed, lowercased
- `message`: string, required, trimmed, max 5000
- `status`: "unread" | "read" (default: "unread")
- Timestamps enabled

### Deployment

Railway (recommended)
- Root: `backend`
- Build: install automatically
- Start command: `npm start`
- Health check path: `/` (configured in `railway.json`)
- Env vars to set:
  - `MONGO_URI`
  - `PORT` (e.g., `5000`)
  - `FRONTEND_URL` or `FRONTEND_URLS`

Render (alternative)
- Environment: Node
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Env vars: same as above

Frontend integration
- Set `VITE_API_URL` in the frontend to your deployed backend URL.
- Ensure backend CORS allows your Vercel domain (`FRONTEND_URL`/`FRONTEND_URLS`).

### Project Structure

```text
backend/
  models/
    Message.js
  routes/
    messageRoutes.js
  railway.json
  package.json
  server.js
```

### Notes and Best Practices

- Validate inputs (already included for required fields and basic email).
- Consider adding rate limiting (e.g., `express-rate-limit`) for public endpoints.
- Add authentication if exposing `GET /api/messages` publicly.
- Monitor logs for CORS denials in production.

### License

MIT

MIT

- I generated a concise backend README covering setup, env vars, routes, scripts, and deployment aligned with your current files.
