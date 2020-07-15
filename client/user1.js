// connecting with sockets.
const socket = io("http://localhost:3001");
console.log("coming here");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlcnJvciI6ZmFsc2UsIm1lc3NhZ2UiOiJTaWduZWQgaW4gc3VjY2Vzc2Z1bGx5Iiwic3RhdHVzIjoyMDAsImRhdGEiOnsidXNlcklkIjoiSFJQb1otSDlvIiwiZmlyc3ROYW1lIjoidmFzdSIsImxhc3ROYW1lIjoidmVlbmFtIiwiZW1haWwiOiJ2YXN1QGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6Nzk4Nzk3OX0sImlhdCI6MTU5NDAxMjQyOH0.RIytB15JEFmA4ebQb4qqHvYp-PAq9_Y93nkmvHu3CSI";
const userId = "HRPoZ-H9o";
let chatMessage = {

  createdOn: Date.now(),
  receiverId: 'LcnDOuZBW',
  receiverName: 'kalyan',
  senderId: userId,
  senderName:'vasu'
}
let chatSocket = () => {
  socket.on("verifyuser", (data) => {
    console.log("socket trying to verify user");
    socket.emit("set-user", authToken);
  });
  socket.on('userlist', (data) => { 

    console.log('Users currently online are:')
    console.log(data)
  })
   socket.on(userId, (data) => {
    console.log('coming here man')
    console.log("you received a message : "+data.message)
   

   });
   $("#send").on('click', function () { 
     let messageText = $("#messageToSend").val()
     
    chatMessage.message = messageText;
    console.log('message sent:'+messageText)
     socket.emit("chat-msg", chatMessage)
  })
  
  
  
}; // end chat socket function

chatSocket();
