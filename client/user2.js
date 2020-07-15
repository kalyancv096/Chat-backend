// connecting with sockets.
const socket = io("http://localhost:3001");
console.log("coming here");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlcnJvciI6ZmFsc2UsIm1lc3NhZ2UiOiJTaWduZWQgaW4gc3VjY2Vzc2Z1bGx5Iiwic3RhdHVzIjoyMDAsImRhdGEiOnsidXNlcklkIjoiTGNuRE91WkJXIiwiZmlyc3ROYW1lIjoia2FseWFuIiwibGFzdE5hbWUiOiJ2ZWVuYW0iLCJlbWFpbCI6ImthbHlhbnZlZW5hbUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjc5ODc5Nzl9LCJpYXQiOjE1OTQ3MDYwMzh9.w6G2SHJSDQyE6MhUHJPYRGOKvNX16tpz0RqpOJVdw_k";
const userId = "LcnDOuZBW";
let chatMessage = {

  createdOn: Date.now(),
  receiverId: 'HRPoZ-H9o',
  receiverName: 'vasu',
  senderId: userId,
  senderName:'kalyan'
}
let chatSocket = () => {
  socket.on("verifyuser", (data) => {
    console.log("socket trying to verify user");
    socket.emit("set-user", authToken);
  });
  socket.on('userlist', (data) => { 
    console.log(data)
  })
  socket.on(userId, (data) => {

    console.log("you received a message : "+data.message)
     console.log(+data.senderName)

   });
  $("#send").on('click', function () { 
    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    console.log('message sent:'+messageText)
    socket.emit("chat-msg",chatMessage)
  })
  
  
  
  

}; // end chat socket function

chatSocket();
