
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app  = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());


const authRequired = (req, res, next) => {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).send('no token');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).send('bad token');
  }
};

// signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) return res.status(400).send('email & password required');
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username,email,password) VALUES ($1,$2,$3)',
      [username || null, email, hashed]
    );
    res.status(201).send('user created');
  } catch (err) {
    if (err.code === '23505') return res.status(409).send('user exists');
    res.status(500).send('db error');
  }
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('email & password required');
  try {
    const { rows } = await pool.query('SELECT id,password FROM users WHERE email=$1', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send('bad creds');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).send('db error');
  }
});


app.get('/products', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT p.*, COALESCE(AVG(r.rating),0)::numeric(2,1) AS avg_rating ' +
    'FROM products p LEFT JOIN reviews r ON p.id = r.product_id ' +
    'GROUP BY p.id ORDER BY p.id'
  );
  res.json(rows);
});

app.post('/products', async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).send('name required');
  await pool.query('INSERT INTO products (name,description) VALUES ($1,$2)', [
    name,
    description || '',
  ]);
  res.sendStatus(201);
});

app.get('/products/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'SELECT * FROM reviews WHERE product_id=$1 ORDER BY created_at DESC',
    [id]
  );
  res.json(rows);
});

// submit review for one product  (now uses auth if provided)
app.post('/products/:id/reviews', async (req, res) => {
  const { id }              = req.params;
  const { rating, review_text } = req.body;
  const userId = req.userId || 1;               // JWT user if logged-in, else fallback 1

  if (!rating && !review_text) return res.status(400).send('rating or review required');

  try {
    await pool.query(
      'INSERT INTO reviews (product_id,user_id,rating,review_text) VALUES ($1,$2,$3,$4)',
      [id, userId, rating || null, review_text || null]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send('database error');
  }
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  if (rows.length) res.json(rows[0]);
  else             res.status(404).send('not found');
});


app.get('/reviews', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('database error');
  }
});

app.post('/reviews', async (req, res) => {
  const { product_id, user_id, rating, review_text } = req.body;
  if (!rating && !review_text) return res.status(400).send('rating or review required');
  try {
    await pool.query(
      'INSERT INTO reviews (product_id,user_id,rating,review_text) VALUES ($1,$2,$3,$4)',
      [product_id, user_id, rating || null, review_text || null]
    );
    res.sendStatus(201);
  } catch {
    res.status(409).send('duplicate');
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log('Server running on', process.env.PORT || 4000)
);