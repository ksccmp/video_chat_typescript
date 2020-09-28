package sc.video.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
	private int roomId;
	private String createId;
	private String contents;
	private String password;
	private String type;
	private int max;
	private int number;
}
