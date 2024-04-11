package com.example.messagingstompwebsocket.service;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.messagingstompwebsocket.models.ChatMessage;
import com.example.messagingstompwebsocket.models.Greeting;
import com.example.messagingstompwebsocket.models.HelloMessage;
import com.example.messagingstompwebsocket.models.UserCount;

@Controller
public class GreetingController {

  private final UserCount userCount;

  public GreetingController(UserCount userCount) {
    this.userCount = userCount;
  }

  // todo remove me
  @MessageMapping("/hello") // event to listen for
  @SendTo("/greetings") // event to broadcast to
  public Greeting greeting(HelloMessage message) throws Exception {
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }

  @MessageMapping("/addUser")
  @SendTo("/userJoined")
  public Greeting userJoined(HelloMessage message) throws Exception {
    String response = "%s has joined the chat with %d users!";

    return new Greeting(String.format(response, HtmlUtils.htmlEscape(message.getName()), userCount.incrementAndGet()));
  }

  @MessageMapping("/sendMessage")
  @SendTo("/newMessage")
  public ChatMessage newMessage(ChatMessage message) throws Exception {
    return new ChatMessage(HtmlUtils.htmlEscape(message.getUser()), HtmlUtils.htmlEscape(message.getMessage()));
  }

}