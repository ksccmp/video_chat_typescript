package sc.video.chat.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Elevator {
	private int id;
	private int floor;
	private List<Passenger> passengers;
	private String status;
}
