const socket = io.connect();
console.log(socket);
console.log(location.href);

let lastId;
function clickFunction(element) {
  var parent = element.parentNode;
  var content = parent.querySelector("div");
  lastId = content.id;
  console.log(lastId);

  socket.emit("room-change", lastId);
}
socket.on("all-message", (allmessages) => {
  console.log(allmessages);
  document.getElementById("messageList").innerHTML = "";
  allmessages.msg.forEach((data) => {
    var newListItem = document.createElement("li");
    let str1;

    if (allmessages.usr == data.sender) {
      newListItem.innerHTML = ` <div class="d-flex flex-row justify-content-end">
    <div>
      <p>${data.sender}</p>
      <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${
        data.message
      }</p>
      <p class="small me-3 mb-3 rounded-3 text-muted">${data.timeStamp.slice(
        0,
        19
      )}</p>
    </div>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
  </div>
  
  </div>`;
    } else {
      newListItem.innerHTML = ` <div class="d-flex flex-row justify-content-start">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
      <div>
    
        <p>${data.sender}</p>
        <p class="small p-2 me-3 mb-1 text-black rounded-3 bg-white">${
          data.message
        }</p>
        <p class="small me-3 mb-3 rounded-3 text-muted">${data.timeStamp.slice(
          0,
          19
        )}</p>
      </div>
     
    </div>
    
    </div>`;
    }

    var parentList = document.getElementById("messageList");
    parentList.appendChild(newListItem);
  });
});

document.getElementById("buttonsubmit").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("YOU JUST CLICED ");
  const messageWritten = document.getElementById("textAreaExample2").value;
  document.getElementById("textAreaExample2").value = " ";
  console.log(lastId);

  const data = {
    message: messageWritten,
    groupId: lastId,
  };

  socket.emit("send-message", data);
  console.log(`message is ${messageWritten}`);
  console.log(data);
});

// const { io } = require("socket.io-client");
// const socket = io("http://localhost:3000");

socket.on("emit-message", (data, usr) => {
  var newListItem = document.createElement("li");
  newListItem.innerHTML = `  <div class="d-flex flex-row justify-content-end">
  <div>
    <p>${data.sender}</p>
    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${
      data.message
    }</p>
    <p class="small me-3 mb-3 rounded-3 text-muted">${data.timeStamp.slice(
      0,
      19
    )}</p>
  </div>
  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
    alt="avatar 1" style="width: 45px; height: 100%;">
</div>

</div>`;
  var parentList = document.getElementById("messageList");
  parentList.appendChild(newListItem);
});
console.log(localStorage.getItem("object"));

const receivedObject = JSON.parse(localStorage.getItem("object"));
console.log(receivedObject);
const data1 = receivedObject;

data1.forEach((ele, index) => {
  var chatProfile = document.createElement("li");
  chatProfile.innerHTML = ` <li class="p-2 border-bottom"   style="border-bottom: 1px solid rgba(255,255,255,.3) !important;">
  <a href="#!" class="d-flex justify-content-between link-light">
    <div class="d-flex flex-row" id=${ele._id} onclick = "clickFunction(this)">
    <img src="https://art.ngfiles.com/images/1518000/1518747_skeleben_discord-profile-pic.jpg?f1606265070" alt="avatar"
                      class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60"> 
    <div class="pt-1" style="margin:7px">
        <p class="fw-bold text-white mb-0"> ${ele.username}</p>
        <p class="small text-white">${ele.description}</p>
      </div>
    </div>

  </a>
</li>`;
  var parentList = document.getElementById("profile");
  parentList.appendChild(chatProfile);
});
