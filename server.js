require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');

const authRoutes    = require('./server/routes/authRoutes');
const productRoutes = require('./server/routes/productRoutes');
const orderRoutes   = require('./server/routes/orderRoutes');
const errorHandler  = require('./server/middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images from public/images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Serve the React build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API Routes
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all: serve React app for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('');
  console.log('  🧣  R & M Collection Server');
  console.log('  ─────────────────────────────────────');
  console.log(`  🚀  Running at:  http://localhost:${PORT}`);
  console.log(`  📦  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  🗄️   Database:    ${process.env.DB_NAME}@${process.env.DB_HOST}`);
  console.log('  ─────────────────────────────────────');
  console.log('');
});
