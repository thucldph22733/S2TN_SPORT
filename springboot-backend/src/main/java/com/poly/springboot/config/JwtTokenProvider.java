package com.poly.springboot.config;

import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.security.CustomUserDetailService;
import com.poly.springboot.security.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Slf4j
//Lop nay dung de sinh ra chuoi JWT
public class JwtTokenProvider {

    @Autowired
    private  CustomUserDetailService userDetailService;

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
//    @Value("${application.security.jwt.refresh-token.expiration}")
//    private long refreshExpiration;


    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

//    Tao ra jwt tu thong tin cua staff
    public String generateToken(CustomUserDetails customUserDetails) {

        Date now = new Date();
        Date dateExpired = new Date(now.getTime()+jwtExpiration);
//        Tao chuoi jwt tu email
        return Jwts.builder()
                .setSubject(customUserDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(dateExpired)
                .signWith(getSignInKey(),SignatureAlgorithm.HS256)
                .compact();

    }
// Lay thong tin staff tu jwt
    public String extractUsername(String token) {
        Claims claims =  Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
//        Tra ve thong tin username
        return claims.getSubject();
    }

    public boolean isValidToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        }catch (ExpiredJwtException ex) {
            log.error("Token hết hạn",ex);
        }catch (UnsupportedJwtException ex){
            log.error("Token không hỗ trợ.",ex);
        }catch (MalformedJwtException | SignatureException ex) {
            log.error("Token không đúng.",ex);
        }catch (IllegalArgumentException ex){
            log.error("Token chống.",ex);
        }
        return false;
    }


}
