package com.example.messagingstompwebsocket.config;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.example.messagingstompwebsocket.models.UserCount;

@Configuration
public class UserCountConfig {
  
  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
  public static UserCount userCount() {
    return UserCount.getINSTANCE();
  }
}
