package sc.video.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sc.video.chat.dto.Room;
import sc.video.chat.dto.TopicRoom;
import sc.video.chat.dto.UpdateRoomNumber;
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
	public Room selectByRoomId(int roomId) {
		return rRepo.selectByRoomId(roomId);
	}
	
	@Override
	public List<Room> selectByTopic(TopicRoom topicRoom) {
		return rRepo.selectByTopic(topicRoom);
	}
	
	@Override
	public int selectMaxRoomId() {
		return rRepo.selectMaxRoomId();
	}
	
	@Override
	@Transactional
	public int updateNumber(UpdateRoomNumber updateRoomNumber) {
		return rRepo.updateNumber(updateRoomNumber);
	}
}
