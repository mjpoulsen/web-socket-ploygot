package com.example.messagingstompwebsocket.models;

import java.util.concurrent.atomic.AtomicInteger;

public final class UserCount {
  
    private AtomicInteger count = new AtomicInteger(0);
    private static UserCount INSTANCE;

    private UserCount() {
    }
  
    public static UserCount getINSTANCE() {
      if (INSTANCE == null) {
        INSTANCE = new UserCount();
      }

      return INSTANCE;
    }

    public int getCount() {
      return count.get();
    }

    public int incrementAndGet() {
      return count.incrementAndGet();
    }
}
