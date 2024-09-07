const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const tradeRoutes = require('./routes/tradeRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config();

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error: ', err));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// WebSocket connection
// io.on('connection', (socket) => {
//     console.log('New client connected');
  
//     // Handle real-time updates for cargo and trade
//     socket.on('subscribeToUpdates', () => {
//       console.log('Client subscribed to real-time updates');
//       // Emit initial data or confirm subscription
//       socket.emit('update', { message: 'Subscribed to real-time updates' });
//     });
  
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

// io.on('connection', (socket) => {
//     console.log('New client connected');
  
//     socket.on('subscribeToUpdates', () => {
//       console.log('Client subscribed to real-time updates');
//       socket.emit('update', { message: 'Subscribed to real-time updates' });
//     });
  
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
  




// Define Routes
app.use('/api/trade', tradeRoutes(io));  // Pass io to route for real-time updates
app.use('/api/cargo', cargoRoutes);
app.use('/api/inventory',inventoryRoutes);

// Listen to port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
