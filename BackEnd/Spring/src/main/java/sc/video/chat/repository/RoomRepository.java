package sc.video.chat.repository;

import java.util.List;

import sc.video.chat.dto.Room;
import sc.video.chat.dto.TopicRoom;
import sc.video.chat.dto.UpdateRoomNumber;

public interface RoomRepository {
	public int insert(Room room);
	
	public List<Room> selectExist();
	
	public Room selectByRoomId(int roomId);
	
	public List<Room> selectByTopic(TopicRoom topicRoom);
	
	public int updateNumber(UpdateRoomNumber updateRoomNumber);
}
