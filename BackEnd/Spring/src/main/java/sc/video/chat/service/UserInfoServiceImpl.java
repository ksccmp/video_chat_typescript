package sc.video.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sc.video.chat.dto.UserInfo;
import sc.video.chat.repository.UserInfoRepository;

@Service
public class UserInfoServiceImpl implements UserInfoService {
	
	@Autowired
	UserInfoRepository uiRepo;
	
	@Override
	@Transactional
	public int insert(UserInfo userInfo) {
		return uiRepo.insert(userInfo);
	}
	
	@Override
	public UserInfo selectByUserId(String userId) {
		return uiRepo.selectByUserId(userId);
	}
	
	@Override
	@Transactional
	public int updateTime(UserInfo userInfo) {
		return uiRepo.updateTime(userInfo);
	}
}
