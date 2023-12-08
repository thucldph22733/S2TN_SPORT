package com.poly.springboot.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Slf4j
/*Lop giúp tạo và xác thực các token, cung cấp các hàm để quản lý xác thực người dùng.*/
public class JwtService {


    @Value("${jwt.secret-key}")  // Chứa khóa bí mật được sử dụng để ký và xác minh JWT
    private String secretKey;

    @Value("${jwt.expiration}") //Thời gian hết hạn của token JWT.
    private long jwtExpiration;

    @Value("${jwt.refresh-token}")  //Thời gian hết hạn của refresh token.
    private long refreshExpiration;

    // Phương thức getSignInKey: Lấy khóa dùng để ký và xác minh JWT từ chuỗi được decode từ secretKey.
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //Phương thức extractUsername: Trích xuất tên người dùng từ claim "subject" trong JWT.
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Phương thức extractAllClaims:Trích xuất tất cả các claims từ token.
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Phương thức generateToken: Tạo một token JWT với các claim từ UserDetails
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails

    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    //Phương thức generateRefreshToken: Tạo một refresh token
    public String generateRefreshToken(
            UserDetails userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    //Phương thức buildToken: Xây dựng token với các claims, người dùng chi tiết và thời gian hết hạn cụ thể.
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
//        List<String> roles = new ArrayList<>();
//
//        userDetails.getAuthorities().forEach(role -> {
//            roles.add(role.getAuthority());
//        });
        return Jwts
                .builder()
                .setClaims(extraClaims)
//                .claim("authorities", userDetails.getAuthorities()
//                        .stream().map(GrantedAuthority::getAuthority)
//                        .collect(Collectors.toList()))
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /* Phương thức isTokenValid: Kiểm tra xem một token có hợp lệ không bằng cách
    so sánh tên người dùng và kiểm tra thời gian hết hạn */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);

        } catch (ExpiredJwtException ex) {
            log.error("Token hết hạn token",ex);
            return false;
        }catch (UnsupportedJwtException ex){
            log.error("Token không được hỗ trợ",ex);
            return false;
        }catch (MalformedJwtException | SignatureException ex) {
            log.error("Token có định dạng không hợp lệ",ex);
            return false;
        } catch (Exception ex) {
            log.error("Đã xảy ra ngoại lệ khi xác thực token",ex);
            return false;
        }
    }

    //Phương thức isTokenExpired: Kiểm tra xem một token có hết hạn không
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //Phương thức extractExpiration: Trích xuất thời gian hết hạn từ token.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


}
