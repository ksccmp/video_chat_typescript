package sc.video.chat.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sc.video.chat.dto.UserInfo;
import sc.video.chat.service.UserInfoService;

@RestController
@CrossOrigin("*")
public class UserInfoController {
	
	@Autowired
	UserInfoService uiServ;
	
	@PostMapping("/userInfo/insert")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody UserInfo userInfo) {
		try {
			return response(uiServ.insert(userInfo), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return getError(e.getMessage());
		}
	}
	
	@GetMapping("/userInfo/selectByUserId")
	public ResponseEntity<Map<String, Object>> selectByUserId(@RequestParam String userId) {
		try {
			return response(uiServ.selectByUserId(userId), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return getError(e.getMessage());
		}
	}
	
	@PutMapping("/userInfo/updateTime")
	public ResponseEntity<Map<String, Object>> updateTime(@RequestBody UserInfo userInfo) {
		try {
			if(uiServ.selectByUserId(userInfo.getUserId()) == null) {
				return response(uiServ.insert(userInfo), HttpStatus.CREATED, true);
			} else {
				return response(uiServ.updateTime(userInfo), HttpStatus.OK, true);
			}
		} catch(RuntimeException e) {
			return getError(e.getMessage());
		}
	}
	
	private ResponseEntity<Map<String, Object>> getError(String message) {
		return response(message, HttpStatus.CONFLICT, false);
	}
	
	private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("data", data);
		resultMap.put("status", status);
		return new ResponseEntity<Map<String,Object>>(resultMap, httpstatus);
	}
}
