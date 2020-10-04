package sc.video.chat.service;

import java.util.List;

import sc.video.chat.dto.Room;
import sc.video.chat.dto.TopicRoom;
import sc.video.chat.dto.UpdateRoomNumber;

public interface RoomService {
	public int insert(Room room);
	
	public List<Room> selectExist();
	
	public Room selectByRoomId(int roomId);
	
	public List<Room> selectByTopic(TopicRoom topicRoom);
	
	public int selectMaxRoomId();
	
	public int updateNumber(UpdateRoomNumber updateRoomNumber);
}
