package com.abstractart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Autorise l'accès public aux pages et assets
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/gallery",
                                "/assets/**",
                                "/api/**"
                        ).permitAll()
                        .anyRequest().permitAll() // pour l’instant tout est public
                )

                // Désactive le formulaire de login par défaut
                .formLogin(form -> form.disable())

                // Désactive le login HTTP basic
                .httpBasic(basic -> basic.disable())

                // CSRF désactivé temporairement (on l’activera au moment du formulaire)
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
}

