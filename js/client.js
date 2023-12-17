const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const numc = document.getElementById("no");
const append = (message, position) => {
  const messageElement = document.createElement("div");

  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);

  messageContainer.append(messageElement);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
const name = prompt("Enter your name to join:");
socket.emit("new-user-joined", name);
socket.on("user-joined", (name) => {
  numc.innerHTML = "";
  append(`${name.num} Online `, "no");
  append(`${name.name} join the chat `, "mid");
  // scrollToBottom();
});
socket.on("receive", (data) => {
  append(` ${data.name} : ${data.message}`, "left");
  // scrollToBottom();
});
socket.on("left", (name) => {
  numc.innerHTML = "";
  append(`${name.num} Online `, "no");
  append(` <-${name.id} left the chat ->`, "mid");
  // scrollToBottom();
});
