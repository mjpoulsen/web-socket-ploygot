// references:
// https://github.com/socketio/socket.io/blob/main/examples/chat/index.js
// https://github.com/socketio/socket.io/blob/main/examples/express-session-example/ts/index.ts

import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";

const port = process.env.PORT || 3000;

// Chatroom
let numUsers = 0;

declare module "express-session" {
  interface SessionData {
    count: number;
  }
}

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => res.send("Hello World!"));

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  let addedUser = false;

  const req = socket.request as Request;

  socket.join(req.session.id);

  console.log(`${socket.id} connected`);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("newMessage", {
      user: data.user,
      message: data.message,
    });
  });

  socket.on("addUser", (username) => {
    if (addedUser) return;

    (socket as any).username = username;

    ++numUsers;
    addedUser = true;

    socket.emit("login", {
      numUsers: numUsers,
    });

    socket.broadcast.emit("userJoined", {
      user: (socket as any).username,
      numUsers: numUsers,
    });
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit("userLeft", {
        username: (socket as any).username,
        numUsers: numUsers,
      });
    }
  });

  socket.on("logOut", () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit("userLeft", {
        username: (socket as any).username,
        numUsers: numUsers,
      });
    }
  });
});

httpServer.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});
