import express, { urlencoded, json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { socketController } from "./controllers/sockets.js";

/* ------ SERVER ------- */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
dotenv.config();

app.use(express.static("public"));
app.use(json());
app.use(urlencoded({ extended: true }));
/* server.use("/api", router); */

io.on("connection", socketController);

httpServer.listen(process.env.PORT, () => {
  console.log("server iniciado");
});
