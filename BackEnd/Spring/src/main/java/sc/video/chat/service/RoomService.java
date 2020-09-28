package sc.video.chat.service;

import java.util.List;

import sc.video.chat.dto.Room;

public interface RoomService {
	public int insert(Room room);
	
	public List<Room> selectExist();
	
	public int updateNumber(Room room);
}
