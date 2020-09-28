package sc.video.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sc.video.chat.dto.Room;
import sc.video.chat.repository.RoomRepository;

@Service
public class RoomServiceImpl implements RoomService{
	
	@Autowired
	RoomRepository rRepo;
	
	@Override
	@Transactional
	public int insert(Room room) {
		return rRepo.insert(room);
	}
	
	@Override
	public List<Room> selectExist() {
		return rRepo.selectExist();
	}
	
	@Override
	@Transactional
	public int updateNumber(Room room) {
		return rRepo.updateNumber(room);
	}
}
