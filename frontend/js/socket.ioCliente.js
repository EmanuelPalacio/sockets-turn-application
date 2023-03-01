const socket = io();
const btn = document.querySelector("#btnEnviar");
const inputText = document.querySelector("#inputText");

socket.on("connect", () => {
  console.log("conectado");
});
socket.on("disconnect", () => {
  console.log("desconectado");
});

btn.addEventListener("click", () => {
  const send = inputText.value;
  /* enviar informacion por socket, el on es para escuchar, emit para emitir un evento */
  socket.emit(
    "sendMessage",
    send,
    //ejemplo de callback
    (id) => {
      console.log("desde el server", id);
    }
  );
});

socket.on("resend", (payload) => {
  console.log(payload, "recibido desde el servidor");
});
