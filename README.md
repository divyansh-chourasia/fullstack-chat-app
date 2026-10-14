# Chatty

A realtime chat app. The page is React in `frontend/`. The API is Express in `backend/`. One running copy is at https://fullstack-chat-app-80jr.onrender.com.

Sign up with a full name, an email, and a password of at least six characters. Login stores an httpOnly `jwt` cookie for seven days. The home page then lists every other user. Choose one and the messages between you load. You can send text, a picture, or both. Pictures and profile photos are uploaded to Cloudinary. If the other person is connected, Socket.IO delivers the new message. The same socket keeps the list of who is online, and the sidebar can filter to those people.

Settings is a theme picker. The pick is saved in this browser as `chat-theme`. The first visit uses `coffee`.

## Run

Create `backend/.env`:

```
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

`npm start` runs from `backend/`, and that is where the server loads this file. With `NODE_ENV=development` the cookie is not marked secure, so a local browser will keep it. Any other value marks it secure.

From the repo root:

```bash
npm run build
npm start
```

`build` installs both packages and writes the frontend to `frontend/dist`. `start` listens on `PORT`, serves `/api/auth` and `/api/messages`, and serves that build for the rest of the routes.

To develop with reload, use two processes. In `backend/`, run `npm run dev`. In `frontend/`, run `npm run dev`. The dev page talks to port 5001, and the API only allows the Vite dev server on port 5173.

`backend/src/seeds/user.seed.js` inserts sample users if you run it by hand. Their passwords are plain text, and login expects a bcrypt hash, so those accounts will not sign in.
