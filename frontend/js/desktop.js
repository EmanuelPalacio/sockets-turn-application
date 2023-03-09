const socket = io("http://localhost:8080");
const pending = document.querySelector("#lblPendings");
const alert = document.querySelector(".alert");
const btnAssing = document.querySelector(".btn");
const btnComplete = document.querySelector("#completeTiket");
const viewTiketAssing = document.querySelector("#tiketAssing");
const searchParams = new URLSearchParams(window.location.search);
const desktop = searchParams.get("escritorio");

socket.on("pendingCount", (pendingCount) => {
  pendingCount !== 0
    ? ((pending.innerText = pendingCount),
      (alert.style.display = "none"),
      (pending.style.display = "block"))
    : ((pending.style.display = "none"), (alert.style.display = "block"));
});

btnAssing.addEventListener("click", () => {
  socket.emit("tiketAssing", desktop, (tiket) => {
    viewTiketAssing.innerText = tiket.turn;
  });
  btnAssing.disabled = true;
  btnComplete.disabled = false;
});

btnComplete.addEventListener("click", () => {
  socket.emit("turnComplete", desktop);
  btnAssing.disabled = false;
  btnComplete.disabled = true;
});
