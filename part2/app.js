const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('./models/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'a really secret key',
    resave: false,
    saveUninitialized: false
}));

// Helper to protect pages
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

// Handle the login form
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query(
            'SELECT user_id, role, password_hash FROM Users WHERE username = ?',
            [username]
        );
        if (!rows.length) {
            return res.send('Invalid login');
        }

        const user = rows[0];
        // const match = await bcrypt.compare(password, user.password_hash);
        const match = (password === user.password_hash);
        if (!match) {
            return res.send('Invalid login');
        }

        // Save to session
        req.session.user = { id: user.user_id, role: user.role };

        // Send to the right dashboard
        if (user.role === 'owner') {
            return res.redirect('/owner-dashboard');
        }
        return res.redirect('/walker-dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

app, post('/logout', (req, res) => {
    req.session.destory(err => {
        if (err) {
            console.error('Logout eror:', err);
            return res.status(500).send('Could not log out.');
        }
        // Clear teh session cookie
        res.clearCookie('connect.sid');
        // Redirect back to the login form
        res.redirect('/');
    });
});


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Protect dashbaords
app.get('/owner-dashboard', requireLogin, (req, res) => {
    if (req.session.user.role !== 'owner') return res.redirect('/');
    res.sendFile(path.join(__dirname, 'public', 'owner-dashboard.html'));
});
app.get('/walker-dashboard', requireLogin, (req, res) => {
    if (req.session.user.role !== 'walker') return res.redirect('/');
    res.sendFile(path.join(__dirname, 'public', 'walker-dashboard.html'));
});

// Export the app instead of listening here
module.exports = app;