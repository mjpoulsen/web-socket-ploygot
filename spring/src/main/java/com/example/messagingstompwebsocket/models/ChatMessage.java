package com.example.messagingstompwebsocket.models;

public class ChatMessage {
  private String user;
  private String message;

  public ChatMessage() {
  }

  public ChatMessage(String user, String message) {
    this.user = user;
    this.message = message;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
