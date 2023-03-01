export const socketController = (socket) => {
  console.log(socket.id);

  socket.on("sendMessage", (payload, /* ejemplo de callback */ callback) => {
    socket.broadcast.emit("resend", payload);
    callback(
      socket.id
    ); /* de esta manera podemos enviar una respuesta rapida, si todo salio bien o mal. */
  });
};
