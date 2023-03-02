import TiketSchema from "../models/TiketSchema.js";
import createTiketService from "../service/createTiketService.js";

export const socketController = async (socket) => {
  const [tikets, turns] = await Promise.all([
    TiketSchema.find({ state: "pending" }),
    TiketSchema.count(),
  ]);
  socket.emit("turns", turns);
  socket.on("createTiket", async () => {
    const tiket = await createTiketService();
    socket.emit("tiket", tiket);
  });

  socket.emit("tikets", tikets);
};
