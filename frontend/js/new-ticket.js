const socket = io("http://localhost:8080");
const btn = document.querySelector(".btn");
const textTiket = document.querySelector("#lblNuevoTicket");

socket.on("turns", (turns) => {
  if (turns === 0) {
    return (textTiket.innerText = "No se han cargando turnos todavia");
  }
  textTiket.innerText = `Turno : ${turns}`;
});

btn.addEventListener("click", () => {
  socket.emit("createTiket");
  socket.on("tiket", (tiket) => {
    textTiket.innerText = `Turno : ${tiket.turn}`;
  });
});

console.log("Nuevo Ticket HTML");
