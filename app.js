const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const materialRoutes = require('./routes/materialRoutes');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const connectdb = require('./config/mono-connection.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/materials', materialRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const Material = require('./models/Material');

app.get('/', async (req, res) => {
  const materials = await Material.find();
  res.render('index', { materials });
});

io.on('connection', socket => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    connectdb();
});