package sc.video.chat.service;

import sc.video.chat.dto.UserInfo;

public interface UserInfoService {
	public int insert(UserInfo userInfo);
	
	public UserInfo selectByUserId(String userId);
		
	public int updateTime(UserInfo userInfo);
}
