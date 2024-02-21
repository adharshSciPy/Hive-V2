const express = require("express");
const app = express();
const User = require('./models/userSchema')
const socket = require('socket.io')
const PORT = 5000;
const connect = require("./mongodb/config.js");
const userRouter = require("./routers/UserRouter.js");
const publicRouter = require("./routers/PublicRouter.js");
const adminRouter = require("./routers/adminRouter.js")
const studentRouter = require('./routers/studentRouter.js')
const chatRoute = require('./routers/chatRoute.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

// mongoose connection
connect();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use('/public', express.static(__dirname + '/uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/public", publicRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/chat', chatRoute)

// Start the server
const server = app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

// chat socket.io logic
const io = socket(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    }
  })
})

