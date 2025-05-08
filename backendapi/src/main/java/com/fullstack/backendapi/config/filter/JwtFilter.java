package com.fullstack.backendapi.config.filter;

import com.fullstack.backendapi.application.jwt.InvalidTokenException;
import com.fullstack.backendapi.application.jwt.JwtService;
import com.fullstack.backendapi.domain.entity.User;
import com.fullstack.backendapi.domain.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(request, response);
        String token = getToken(request);

        if(token!= null){
            try{
                String email = jwtService.getEmailFromToken(token);
                User user = userService.getByEmail(email);
                setUserAsAuthenticared(user);
            } catch (InvalidTokenException e) {
                log.error("Token invalido: {}", e.getMessage());
            } catch (Exception e) {
                log.error("Erro na validação do token: {}", e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }

    private void setUserAsAuthenticared(User user){
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private String getToken(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null){
            String[] authHeaderParts = authHeader.split(" ");
            if(authHeaderParts.length == 2){
                return authHeaderParts[1];
            }
        }
        return null;
    }
}
