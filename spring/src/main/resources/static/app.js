const stompClient = new StompJs.Client({
  brokerURL: "ws://localhost:3000/chat",
});

stompClient.onConnect = (frame) => {
  setConnected(true);
  console.log("Connected: " + frame);
  stompClient.subscribe("/userJoined", (greeting) => {
    showGreeting(JSON.parse(greeting.body).content);
  });
  stompClient.subscribe("/newMessage", (newMessage) => {
    const body = JSON.parse(newMessage.body);
    showGreeting(`${body.user}: ${body.message}`);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  } else {
    $("#conversation").hide();
  }
  $("#greetings").html("");
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  setConnected(false);
  console.log("Disconnected");
}

function addUser() {
  stompClient.publish({
    destination: "/addUser",
    body: JSON.stringify({ name: $("#name").val() }),
  });
}

function sendChatMessage() {
  stompClient.publish({
    destination: "/sendMessage",
    body: JSON.stringify({
      user: $("#name").val(),
      message: $("#chatMessage").val(),
    }),
  });
}

function showGreeting(message) {
  console.log(message);
  $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
  $("form").on("submit", (e) => e.preventDefault());
  $("#connect").click(() => connect());
  $("#disconnect").click(() => disconnect());
  $("#send").click(() => addUser());
  $("#sendChatMessage").click(() => sendChatMessage());
});
