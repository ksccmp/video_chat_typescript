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
import org.springframework.web.bind.annotation.RestController;

import sc.video.chat.dto.Room;
import sc.video.chat.service.RoomService;

@RestController
@CrossOrigin("*")
public class RoomController {
	
	@Autowired
	RoomService rServ;
	
	@PostMapping("/room/insert")
	public ResponseEntity<Map<String, Object>> roomInsert(@RequestBody Room room) {
		try {
			return response(rServ.insert(room), HttpStatus.CREATED, true);
		} catch(RuntimeException e) {
			return getError(e.getMessage());
		}
	}
	
	@GetMapping("/room/selectExist")
	public ResponseEntity<Map<String, Object>> roomSelectExist() {
		try {
			return response(rServ.selectExist(), HttpStatus.OK, true);
		} catch(RuntimeException e) {
			return getError(e.getMessage());
		}
	}
	
	@PutMapping("/room/updateNumber")
	public ResponseEntity<Map<String, Object>> roomUpdateNumber(@RequestBody Room room) {
		try {
			return response(rServ.updateNumber(room), HttpStatus.OK, true);
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
