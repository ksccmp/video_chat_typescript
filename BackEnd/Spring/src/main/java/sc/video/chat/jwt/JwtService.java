package sc.video.chat.jwt;

import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import sc.video.chat.dto.User;

@Component
public class JwtService {
	private String secretKey = "video-chat"; // 암호화 알고리즘 적용 key
    private Long expireTime = 1000L * 60 * 60 * 24; // 토큰의 유효시간
    private Long refreshExpireTime = 1000L * 60 * 60 * 24 * 7 * 1000; // 갱신 토큰의 유효시간
	
	// 토큰 생성
	public String createUserToken(User user) {
		return Jwts.builder()
			.setHeaderParam("typ",  "JWT") // 토큰의 타입
            .setSubject("userToken") // 토큰의 제목
            .setExpiration(new Date(System.currentTimeMillis() + expireTime)) // 토큰의 유효시간
            .claim("user", user) // 토큰에 담고 싶은 정보
            .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // secretKey를 사용하여 암호화 알고리즘 적용
            .compact(); // 직렬화 처리 (String으로 변경)
	}
	
	// 갱신 토큰 생성
	public String createUserRefreshToken(User user) {
		return Jwts.builder()
			.setHeaderParam("typ",  "JWT") // 토큰의 타입
            .setSubject("userToken") // 토큰의 제목
            .setExpiration(new Date(System.currentTimeMillis() + refreshExpireTime)) // 토큰의 유효시간
            .claim("user", user) // 토큰에 담고 싶은 정보
            .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // secretKey를 사용하여 암호화 알고리즘 적용
            .compact(); // 직렬화 처리 (String으로 변경)
	}
	
   // 토큰을 사용하여 유저정보 얻기
   public Map<String, Object> getUser(String token) {
      Jws<Claims> claims = null;
      try {
         claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token); // secretKey를 사용하여 복호화
      } catch(Exception e) {
         throw new RuntimeException();
      }
      
      return claims.getBody();
   }
   
   // 토큰의 유효성 검증
   // 문제가 존재하면 예외 발생, 그렇지 않은 경우는 문제 없다고 판단
   public void checkValid(String token) {
      Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token);
   }
}