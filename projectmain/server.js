require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Event = require('./models/eventModel'); // Import the Event model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// Retrieve all events
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
