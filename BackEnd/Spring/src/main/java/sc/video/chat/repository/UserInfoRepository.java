package sc.video.chat.repository;

import sc.video.chat.dto.UserInfo;

public interface UserInfoRepository {
	public int insert(UserInfo userInfo);
	
	public UserInfo selectByUserId(String userId);
	
	public int updateTime(UserInfo userInfo);
}
