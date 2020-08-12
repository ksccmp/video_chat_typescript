package sc.video.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToken {
	private String userId;
	private String refreshToken;
	private String updtTm;
}
