const socket = io("http://localhost:8000");

// Add connection event listeners for debugging
socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server");
});

socket.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

socket.addEventListener("close", () => {
  console.log("WebSocket connection closed");
});

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages
socket.on("message", (data) => {
  const list = document.createElement("list");
  list.textContent = data;
  document.querySelector("ul").appendChild(list);
});
