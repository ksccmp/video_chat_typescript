package sc.video.chat.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import sc.video.chat.dto.User;
import sc.video.chat.dto.UserToken;

@Repository
public class UserRepositoryImpl implements UserRepository {
	
	private String ns = "sc.video.chat.usermapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public int insert(User user) {
		if(session.insert(ns + "insert", user) == 1) {
			 return session.insert(ns + "insertToken", user);
		} else {
			return 0;
		}
	}
	
	@Override
	public User selectByUserId(String userId) {
		return session.selectOne(ns + "selectByUserId", userId);
	}
	
	@Override
	public UserToken selectTokenByUserId(String userId) {
		return session.selectOne(ns + "selectTokenByUserId", userId);
	}
	
	@Override
	public int updateToken(UserToken userToken) {
		return session.update(ns + "updateToken", userToken);
	}
}
