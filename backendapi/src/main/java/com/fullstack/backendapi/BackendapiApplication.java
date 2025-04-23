package com.fullstack.backendapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackendapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendapiApplication.class, args);
	}

}
