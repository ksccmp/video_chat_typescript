package sc.video.chat.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sc.video.chat.dto.Command;
import sc.video.chat.dto.Elevator;
import sc.video.chat.dto.Passenger;

@RestController
@CrossOrigin("*")
public class KaKaoController {
	
	public static Command command = null;
	
	public static Map<Integer, List<Passenger>> timecalls = null;
	
	public static void init() {
		List<Elevator> elevators = new ArrayList<Elevator>();
		Elevator elevator1 = new Elevator(0, 1, new ArrayList<Passenger>(), "stop");
		Elevator elevator2 = new Elevator(1, 1, new ArrayList<Passenger>(), "stop");
		Elevator elevator3 = new Elevator(2, 1, new ArrayList<Passenger>(), "stop");
		Elevator elevator4 = new Elevator(3, 1, new ArrayList<Passenger>(), "stop");
		elevators.add(elevator1);
		elevators.add(elevator2);
		elevators.add(elevator3);
		elevators.add(elevator4);
		command = new Command("sdasihACZqezQAWE", 0, elevators, false, new ArrayList<Passenger>());
		
		timecalls = new HashMap<Integer, List<Passenger>>();
		List<Passenger> calls1 = new ArrayList<Passenger>();
		calls1.add(new Passenger(0, 0, 3, 8));
		calls1.add(new Passenger(1, 0, 1, 9));
		calls1.add(new Passenger(2, 0, 7, 2));
		timecalls.put(0, calls1);
		
		calls1 = new ArrayList<Passenger>();
		calls1.add(new Passenger(3, 1, 5, 10));
		calls1.add(new Passenger(4, 1, 13, 1));
		calls1.add(new Passenger(5, 1, 2, 4));
		calls1.add(new Passenger(6, 1, 3, 5));
		calls1.add(new Passenger(7, 1, 4, 2));
		timecalls.put(1, calls1);
		
		calls1 = new ArrayList<Passenger>();
		calls1.add(new Passenger(8, 2, 10, 1));
		calls1.add(new Passenger(9, 2, 11, 1));
		timecalls.put(2, calls1);
		
		calls1 = new ArrayList<Passenger>();
		calls1.add(new Passenger(10, 3, 1, 15));
		calls1.add(new Passenger(11, 3, 15, 1));
		calls1.add(new Passenger(12, 3, 2, 9));
		calls1.add(new Passenger(13, 3, 2, 10));
		timecalls.put(3, calls1);
		
		calls1 = new ArrayList<Passenger>();
		calls1.add(new Passenger(14, 4, 1, 2));
		calls1.add(new Passenger(15, 4, 15, 14));
		calls1.add(new Passenger(16, 4, 14, 13));
		calls1.add(new Passenger(17, 4, 13, 15));
		calls1.add(new Passenger(18, 4, 11, 9));
		calls1.add(new Passenger(19, 4, 2, 9));
		calls1.add(new Passenger(20, 4, 3, 7));
		calls1.add(new Passenger(21, 4, 11, 1));
		timecalls.put(4, calls1);
	}
	
	
	@GetMapping("/kakao/data/select")
	public ResponseEntity<Object> kakaoDataSelect() {
		if(command == null) {
			init();
		}
		
		System.out.println(command.getTimestamp());
		
		if(command.getTimestamp() <= 4) {
			List<Passenger> calls = command.getCalls();
			List<Passenger> timecall = timecalls.get(command.getTimestamp());
			for(int i=0; i<timecall.size(); i++) {
				calls.add(timecall.get(i));
			}
			command.setCalls(calls);
		}
		
		if(command.getCalls().size() == 0) {
			List<Elevator> elevators = command.getElevators();
			for(int i=0; i<elevators.size(); i++) {
				if(elevators.get(i).getPassengers().size() != 0) {
					break;
				}
				
				if(i == elevators.size()-1) {
					command.setEnd(true);
				}
			}
		}
		
		System.out.println(command);
		
		return new ResponseEntity<Object>(command, HttpStatus.OK);
	}
	
	@PostMapping("/kakao/data/insert")
	public ResponseEntity<Object> kakaoDataInsert(@RequestBody Command cmd) {
		System.out.println(cmd);
		command = cmd;
		
		System.out.println("Insert: " + command.getTimestamp());
		
		return new ResponseEntity<Object>("success", HttpStatus.OK);
	}
	
	@PutMapping("/kakao/data/init")
	public ResponseEntity<Object> kakaoDataInit() {
		
		command = null;
		
		return new ResponseEntity<Object>("success", HttpStatus.OK);
	}
}
