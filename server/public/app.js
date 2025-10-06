const socket = io("http://localhost:8000");

const activity = document.querySelector(".activity");
const msgInput = document.querySelector("input");

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

  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages
socket.on("message", (data) => {
  const list = document.createElement("list");
  list.textContent = data;
  document.querySelector("ul").appendChild(list);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer = activity;

socket.on("activity", (name) => {
  activity.textContent = `User ${name} is typing...`;

  // Clear after 3 secs
  clearTimeout(activityTimer);
});
