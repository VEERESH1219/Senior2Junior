const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");

/* ===============================
   CREATE HTTP SERVER
================================ */
const server = http.createServer(app);

/* ===============================
   SOCKET.IO SETUP
================================ */
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* ===============================
   SOCKET EVENTS (1-to-1 CHAT)
================================ */
io.on("connection", socket => {
  console.log("User connected:", socket.id);

  // Join private room (buyer-seller)
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Send message to room
  socket.on("sendMessage", data => {
    /*
      data = {
        roomId,
        senderId,
        receiverId,
        message,
        time
      }
    */

    // Emit to both users in that room
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
