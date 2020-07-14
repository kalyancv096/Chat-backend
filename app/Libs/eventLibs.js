let verifyClaim = require("../Libs/tokenLibs");
let socketio = require("socket.io");
let userlist = [];
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
          socket.emit(user.data.userId, "you are online")
          let userObj = {"userId":user.data.userId, "name":user.data.firstName}
          socket.emit('userlist',userObj)
          console.log(user);
        } else {
          console.log(err);
        }
      });
    });
    socket.on('chat-msg', (data) => { 
      console.log("from here:"+data);
    console.log(data.receiverId)
    myio.emit(data.receiverId,data)
    })
    socket.on('disconnect', () => { 
      console.log('user is disconnected');

    })
  });
};
module.exports = { setService: setService };
