/**
 * Practice Login API
 * A minimal, self-contained login system for practicing API test automation.
 *
 * Endpoints:
 *   POST   /api/auth/register  -> create a user
 *   POST   /api/auth/login     -> log in, returns a JWT
 *   GET    /api/auth/profile   -> read your own profile (protected)
 *   PUT    /api/auth/profile   -> update your email and/or password (protected)
 *   DELETE /api/auth/profile   -> delete your own account (protected)
 *   POST   /api/auth/logout    -> invalidates the token (simple in-memory blacklist)
 *   GET    /api/users          -> list all registered users, paginated (no login needed)
 *   GET    /api/health         -> simple health check
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Allow the front-end page (served from this same app, or opened as a file) to call the API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(require('path').join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'practice-secret-do-not-use-in-production';

// In-memory "database"
const users = []; // { id, email, passwordHash }
const revokedTokens = new Set();
let nextId = 1;

function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  if (revokedTokens.has(token)) {
    return res.status(401).json({ error: 'Token has been revoked' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', users: users.length });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters' });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'A user with this email already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 8);
  // NOTE: storing the plaintext password too is only for this practice app, so
  // GET /api/users can show it for learning purposes. Never do this in a real system.
  const user = { id: nextId++, email, password, passwordHash };
  users.push(user);

  return res.status(201).json({ id: user.id, email: user.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.json({ token, user: { id: user.id, email: user.email } });
});

app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ id: user.id, email: user.email });
});

app.put('/api/auth/profile', authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { email, password } = req.body || {};

  if (!email && !password) {
    return res.status(400).json({ error: 'Provide an email and/or a password to update' });
  }

  if (email && email.toLowerCase() !== user.email.toLowerCase()) {
    const existing = findUserByEmail(email);
    if (existing && existing.id !== user.id) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }
    user.email = email;
  }

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({ error: 'password must be at least 6 characters' });
    }
    user.password = password;
    user.passwordHash = bcrypt.hashSync(password, 8);
  }

  return res.json({ id: user.id, email: user.email });
});

app.delete('/api/auth/profile', authMiddleware, (req, res) => {
  const index = users.findIndex((u) => u.id === req.user.sub);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  revokedTokens.add(req.token); // the deleted account's token is no longer valid

  return res.status(204).send();
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  revokedTokens.add(req.token);
  return res.json({ message: 'Logged out successfully' });
});

app.get('/api/users', (req, res) => {
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = 10;
  if (limit > 100) limit = 100; // guard against someone asking for everything at once

  const total = users.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  const pageOfUsers = users.slice(start, start + limit);
  // Returns the full user object (id, email, password, passwordHash) with
  // no login required — only ever do this in a throwaway local practice app.

  return res.json({
    data: pageOfUsers,
    page,
    limit,
    total,
    totalPages,
  });
});

app.listen(PORT, () => {
  console.log(`Practice login API running at http://localhost:${PORT}`);
});
