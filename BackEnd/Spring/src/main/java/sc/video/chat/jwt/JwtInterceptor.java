package sc.video.chat.jwt;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {
	
	@Autowired
	private JwtService jwtService;
   
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		// option 요청은 바로 통과
		if(request.getMethod().equals("OPTIONS")) {
			return true;
		} else {
			String token = request.getHeader("jwt-user-token"); // request의 header에 jwt-user-token이라는 key값에 알맞는 value값을 token으로 저장
			if(token != null && token.length() > 0) {
				jwtService.checkValid(token); // 토큰의 유효성 검증
				return true;
			} else { // 해당 토큰의 유효성이 알맞지 않은 경우
				throw new RuntimeException("인증 토큰이 존재하지 않습니다.");
			}
		}
	}
}
