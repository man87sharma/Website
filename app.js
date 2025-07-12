require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

// Routers
const productRoutes = require('./routes/products');
const proposalRoutes = require('./routes/proposal');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Front‑end pages
app.get('/', (req, res) => {
  res.render('index', { title: 'Super DTH' });
});
app.get('/products', (req, res) => {
  res.render('products', { title: 'Products' });
});
app.get('/compare', (req, res) => {
  res.render('compare', { title: 'Compare' });
});
app.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/proposal', proposalRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});