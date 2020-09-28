package sc.video.chat.repository;

import java.util.List;

import sc.video.chat.dto.Room;

public interface RoomRepository {
	public int insert(Room room);
	
	public List<Room> selectExist();
	
	public int updateNumber(Room room);
}
