require('dotenv').config();
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const axios = require('axios');

const app = express();

// Set up express session for login persistence
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email'],  // Specify the fields you need from the user's profile
},
function(accessToken, refreshToken, profile, done) {
  // In production, you would save the user to the database and save the accessToken
  return done(null, { profile, accessToken });
}));

// Serialize and deserialize user for session persistence
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Route to initiate Facebook login
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback route after successful login
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })
);

// Profile route for logged-in users
app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  // Display profile info and access token
  res.send(`Logged in as: ${req.user.profile.displayName}, Access Token: ${req.user.accessToken}`);
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});