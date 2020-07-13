let verifyClaim = require("../Libs/tokenLibs");
let socketio = require("socket.io");

let setService = (server) => {
  console.log("setservice");
  let io = socketio.listen(server);
  const myio = io.of("");
  myio.on("connection", (socket) => {
    socket.emit("verifyuser", "");
    socket.on("set-user", (data) => {
      console.log("getting authToken from client:" + data);
      verifyClaim.verifyTokenWithoutSecret(data, (user, err) => {
        if (user) {
          console.log(user);
        } else {
          console.log(err);
        }
      });
    });
  });
};
module.exports = { setService: setService };
