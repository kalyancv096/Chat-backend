// connecting with sockets.
const socket = io("http://localhost:3001");
console.log("coming here");
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlcnJvciI6ZmFsc2UsIm1lc3NhZ2UiOiJTaWduZWQgaW4gc3VjY2Vzc2Z1bGx5Iiwic3RhdHVzIjoyMDAsImRhdGEiOnsidXNlcklkIjoiSFJQb1otSDlvIiwiZmlyc3ROYW1lIjoidmFzdSIsImxhc3ROYW1lIjoidmVlbmFtIiwiZW1haWwiOiJ2YXN1QGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6Nzk4Nzk3OX0sImlhdCI6MTU5NDAxMjQyOH0.RIytB15JEFmA4ebQb4qqHvYp-PAq9_Y93nkmvHu3CSI";
const userId = "H1pOQGY9M";

let chatSocket = () => {
  socket.on("verifyuser", (data) => {
    console.log("socket trying to verify user");
    socket.emit("set-user", authToken);
  });

  // socket.on(userId, (data) => {

  //   console.log("you received a message")
  //   console.log(data)

  // });
}; // end chat socket function

chatSocket();
