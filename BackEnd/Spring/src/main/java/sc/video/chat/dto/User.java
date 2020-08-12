package sc.video.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
	private String userId;
	private String userPw;
	private String userNm;
	private String userGd;
	private int userAge;
	private String userPh;
	private String userMa;
	private String rgstTm;
	private String updtTm;
}
