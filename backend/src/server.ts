import app from ".";
import { createServer } from "http";
import { Server } from "socket.io"; // taking Server from socket.io
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const server = createServer(app); // creating server using http and passing express app as parameter

const io = new Server(server, { cors: { origin: "*" } }); //Intialize socket io on http server

io.on("connection", (socket) => {
  console.log("user connectd", socket.id);

  socket.on("offer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.broadcast.emit("ice-candidate", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export { io };
