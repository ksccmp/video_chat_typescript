package sc.video.chat.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Command {
	private String token;
	private int timestamp;
	private List<Elevator> elevators;
	private boolean isEnd;
	private List<Passenger> calls;
}
