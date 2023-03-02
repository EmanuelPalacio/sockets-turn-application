import express, { urlencoded, json } from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { socketController } from "./controllers/sockets.js";

/* ------ SERVER ------- */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "*",
  },
});
dotenv.config();
io.on("connection", socketController);

httpServer.listen(process.env.PORT, () => {
  console.log("server iniciado");
});

/* ------ CONNECT MONGODB ATLAS ------- */
try {
  mongoose.set("strictQuery", true);
  mongoose.set("autoIndex", true);
  mongoose.connect(process.env.MONGODB_CONNECTION);
  console.log("exito al conectar con mongo atlas");
} catch (error) {
  console.log(error);
}
