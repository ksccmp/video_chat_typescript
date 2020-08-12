package sc.video.chat.service;

import sc.video.chat.dto.User;
import sc.video.chat.dto.UserToken;

public interface UserService {
	public int insert(User user);
	
	public User selectByUserId(String userId);
	
	public UserToken selectTokenByUserId(String userId);
	
	public int updateToken(UserToken userToken);
}
