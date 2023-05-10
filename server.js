const { default: mongoose } = require("mongoose");
const app = require("./app");
const http = require("http").Server(app);
// console.log(app);

const message = require("./models/message");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("DB connected successfully");
});

// USING MIDDLEWARE
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`APP RUNNING IN PORT ${PORT}`);
});

// SOCKET IO CODE
// const app = require("express")();
// const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: "*",
  },
});
console.log("HHH");
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", async (data) => {
    const finalData = {
      sender: process.env.USERNAME,
      message: data.message,
      groupId: data.groupId,
    };
    console.log(finalData);
    const finalMessage = await message.create(finalData);

    console.log(finalMessage);

    socket.emit("emit-message", finalMessage);
  });

  socket.on("room-change", async (lastId) => {
    console.log(lastId);
    const listOfMessages = await message.find({ groupId: lastId });
    console.log(listOfMessages);

    const data0 = {
      usr: process.env.USERNAME,
      msg: listOfMessages,
    };
    console.log(`x${data0.usr}`);
    socket.emit("all-message", data0);
  });
});
