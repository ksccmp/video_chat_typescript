package sc.video.chat.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import sc.video.chat.dto.UserInfo;

@Repository
public class UserInfoRepositoryImpl implements UserInfoRepository {
	private String ns = "sc.video.chat.userinfomapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public int insert(UserInfo userInfo) {
		return session.insert(ns + "insert", userInfo);
	}
	
	@Override
	public UserInfo selectByUserId(String userId) {
		return session.selectOne(ns + "selectByUserId", userId);
	}
	
	@Override
	public int updateTime(UserInfo userInfo) {
		return session.update(ns + "updateTime", userInfo);
	}
}
