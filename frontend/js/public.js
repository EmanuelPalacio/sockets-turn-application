const socket = io("http://localhost:8080");

socket.on("viewTikets", (tikets) => {
  const audio = new Audio("./audio/new-ticket.mp3");
  audio.play();
  if (tikets.length !== 0) {
    tikets.forEach((tiket, index) => {
      const lblTicket = document.querySelector(`#lblTicket${index + 1}`);
      const lblEscritorio = document.querySelector(
        `#lblEscritorio${index + 1}`
      );

      lblTicket.innerText = `Turno: ${tiket.turn}`;
      lblEscritorio.innerText = tiket.desktop;
    });
  }
});

console.log("Público HTML");
