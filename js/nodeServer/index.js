// node server which will handle socket io connections
const io = require("socket.io")(8000);
const users = {};
// io.on("connection", (socket) => {
//   socket.on("new-user-joined", (name) => {
//     console.log("New user", name);
//     users[socket.id] = name;
//     socket.broadcast.emit("user-joined", (name)=>{
//       name:name,
//       num : users.size();
//     });
//   });

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", {
      name: name,
      num: Object.keys(users).length,
    });
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    let idd = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit("left", {
      id: idd,
      num: Object.keys(users).length,
    });
  });
});
