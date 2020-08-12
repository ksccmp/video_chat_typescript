package sc.video.chat.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sc.video.chat.dto.User;
import sc.video.chat.dto.UserToken;
import sc.video.chat.jwt.JwtService;
import sc.video.chat.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserService uServ;
	
	@Autowired
	JwtService jServ;
	
	@PostMapping("/user/insert")
	public ResponseEntity<Map<String, Object>> userInsert(@RequestBody User user) {
		try {
			return response(uServ.insert(user), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/user/selectByUserId")
	public ResponseEntity<Map<String, Object>> userSelectByUserId(@RequestParam String userId, @RequestParam String userPw, HttpServletResponse res) {
		try {
			User user = uServ.selectByUserId(userId);
			if(user.getUserPw().equals(userPw)) {
				String token = jServ.createUserToken(user); // user를 저장하는 토큰 생성
				String refreshToken = jServ.createUserRefreshToken(user); // user를 저장하는 갱신 토큰 생성
				
				uServ.updateToken(new UserToken(userId, refreshToken, null)); // 갱신 토큰을 DB에 저장
				res.setHeader("jwt-user-token", token); // response의 header에 jwt-user-token 이름으로 만들어진 토큰을 담아 client에 전달

				return response(user, HttpStatus.OK, true); 
			} else {
				return response(0, HttpStatus.OK, false);
			}
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/user/selectByUserToken")
	public ResponseEntity<Map<String, Object>> userSelectByUserToken(@RequestParam String userToken) {
		try {
			Map<String, Object> userTokenMap = jServ.getUser(userToken);
			return response(userTokenMap.get("user"), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	@GetMapping("/user/selectByUserRefreshToken")
	public ResponseEntity<Map<String, Object>> useSelectByUserRefreshToken(@RequestParam String userId, HttpServletResponse res) {
		try {
			UserToken userToken = uServ.selectTokenByUserId(userId);
			Map<String, Object> userTokenMap = jServ.getUser(userToken.getRefreshToken());
			
			User user = (User)userTokenMap.get("user");
			
			String token = jServ.createUserToken(user); // user를 저장하는 토큰 생성
			String refreshToken = jServ.createUserRefreshToken(user); // user를 저장하는 갱신 토큰 생성
			
			uServ.updateToken(new UserToken(userId, refreshToken, null)); // 갱신 토큰을 DB에 저장
			res.setHeader("jwt-user-token", token); // response의 header에 jwt-user-token 이름으로 만들어진 토큰을 담아 client에 전달

			return response(user, HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return response(e.getMessage(), HttpStatus.CONFLICT, false);
		}
	}
	
	private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}
}
