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
          socket.userId = user.data.userId;
          socket.userName = user.data.firstName;
          let userObj = { userId: socket.userId, userName: socket.userName }
          let userIndex=userlist.map(function (user) {return user.userId }).indexOf(socket.userId)
          console.log("index:"+userIndex)
          if (userIndex == -1) {
            
            userlist.push(userObj);
          }
           socket.emit('userlist', userlist)
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
