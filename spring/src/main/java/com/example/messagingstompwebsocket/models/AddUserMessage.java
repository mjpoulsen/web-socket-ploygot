package com.example.messagingstompwebsocket.models;

public class AddUserMessage {
  
    private String name;
  
    public AddUserMessage() {
    }
  
    public AddUserMessage(String name) {
      this.name = name;
    }
  
    public String getName() {
      return name;
    }
}
