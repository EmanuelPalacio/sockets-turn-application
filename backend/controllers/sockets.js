import TiketSchema from "../models/TiketSchema.js";
import { io } from "../server.js";
import createTiketService from "../service/createTiketService.js";
import {
  pendingCount,
  pendingTikets,
  turnComplete,
  turns,
  viewTikets,
} from "../service/requestDatabase.js";

export const socketController = async (socket) => {
  socket.emit("turns", await turns());

  socket.on("createTiket", async (callback) => {
    const tiket = await createTiketService();
    console.log(tiket.date);
    if (tiket.turn == 15) {
      await TiketSchema.deleteMany({});
    }
    callback(tiket);
    socket.broadcast.emit("pendingCount", await pendingCount());
  });

  socket.emit("pendingCount", await pendingCount());

  socket.emit("pendingTikets", await pendingTikets());

  socket.on("tiketAssing", async (desktop, tiket) => {
    const selectTiket = await pendingTikets();
    if (selectTiket.length !== 0) {
      await TiketSchema.findByIdAndUpdate(selectTiket[0]._id, {
        state: "attending",
        desktop,
      });
      io.emit("pendingCount", await pendingCount());
      tiket(selectTiket[0]);
      socket.broadcast.emit("viewTikets", await viewTikets());
    }
  });

  socket.on("turnComplete", async (desktop) => {
    await turnComplete(desktop);
  });

  socket.emit("viewTikets", await viewTikets());
};
