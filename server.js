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

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Allow the front-end page (served from this same app, or opened as a file) to call the API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'practice-secret-do-not-use-in-production';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 8;

// Database helper functions
async function findUserByEmail(email) {
  if (!email) return null;
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0];
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  try {
    // Check if token is revoked
    const [revoked] = await pool.query('SELECT token FROM revoked_tokens WHERE token = ? LIMIT 1', [token]);
    if (revoked.length > 0) {
      return res.status(401).json({ error: 'Token has been revoked' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/api/health', async (req, res) => {
  try {
    const [[{ count }]] = await pool.query('SELECT COUNT(*) as count FROM users');
    res.json({ status: 'ok', users: count });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    
    // In this practice app we store plaintext password for demonstration in /api/users
    const [result] = await pool.query(
      'INSERT INTO users (email, password, password_hash) VALUES (?, ?, ?)',
      [email.toLowerCase(), password, passwordHash]
    );

    return res.status(201).json({ id: result.insertId, email });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ id: user.id, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  const { email, password } = req.body || {};

  if (!email && !password) {
    return res.status(400).json({ error: 'Provide an email and/or a password to update' });
  }

  try {
    const user = await findUserById(req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let newEmail = user.email;
    let newPassword = user.password;
    let newPasswordHash = user.password_hash;

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const existing = await findUserByEmail(email);
      if (existing && existing.id !== user.id) {
        return res.status(409).json({ error: 'A user with this email already exists' });
      }
      newEmail = email.toLowerCase();
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: 'password must be at least 6 characters' });
      }
      newPassword = password;
      newPasswordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }

    await pool.query(
      'UPDATE users SET email = ?, password = ?, password_hash = ? WHERE id = ?',
      [newEmail, newPassword, newPasswordHash, user.id]
    );

    return res.json({ id: user.id, email: newEmail });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
    await pool.query('INSERT IGNORE INTO revoked_tokens (token) VALUES (?)', [req.token]);

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/logout', authMiddleware, async (req, res) => {
  try {
    await pool.query('INSERT IGNORE INTO revoked_tokens (token) VALUES (?)', [req.token]);
    return res.json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = 10;
  if (limit > 100) limit = 100;

  try {
    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM users');
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      'SELECT id, email, password, password_hash FROM users LIMIT ? OFFSET ?',
      [limit, offset]
    );

    return res.json({
      data: rows,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Practice login API running at http://localhost:${PORT}`);
});
