let socketio = require("socket.io");

let setService = (server) => {
  console.log("setservice");
  let io = socketio.listen(server);
  const myio = io.of("");
  myio.on("connection", (socket) => {
    socket.emit("verifyuser", "");
  });
};
module.exports = { setService: setService };
