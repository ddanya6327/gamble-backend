document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("betting", (msg) => {
    console.log("Message received:", msg);
  });
});
