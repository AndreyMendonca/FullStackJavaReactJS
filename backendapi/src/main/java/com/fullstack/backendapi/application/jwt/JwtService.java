package com.fullstack.backendapi.application.jwt;

import com.fullstack.backendapi.domain.AccessToken;
import com.fullstack.backendapi.domain.entity.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final SecretKeyGenerator keyGenerator;

    public AccessToken generateToken(User user){

        SecretKey key = keyGenerator.getKey();
        Date expirationDate = generateExpirationDate();
        Map<String, Object> claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(expirationDate)
                .claims(claims)
                .compact();
        return new AccessToken(token);
    }

    private Date generateExpirationDate(){
        var expirationMinutes = 60;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> generateTokenClaims(User user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        return claims;
    }

    public String getEmailFromToken(String tokenJwt){
        try{
            return Jwts
                    .parser()
                    .verifyWith(keyGenerator.getKey())
                    .build()
                    .parseSignedClaims(tokenJwt)
                    .getPayload()
                    .getSubject();
        }catch (JwtException e){
            throw new InvalidTokenException(e.getMessage());
        }

    }
}
