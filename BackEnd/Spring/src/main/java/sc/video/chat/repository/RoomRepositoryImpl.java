package sc.video.chat.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import sc.video.chat.dto.Room;
import sc.video.chat.dto.TopicRoom;
import sc.video.chat.dto.UpdateRoomNumber;

@Repository
public class RoomRepositoryImpl implements RoomRepository {
	
	private String ns = "sc.video.chat.roommapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public int insert(Room room) {
		return session.insert(ns + "insert", room);
	}
	
	@Override
	public List<Room> selectExist() {
		return session.selectList(ns + "selectExist");
	}
	
	@Override
	public Room selectByRoomId(int roomId) {
		return session.selectOne(ns + "selectByRoomId", roomId);
	}
	
	@Override
	public List<Room> selectByTopic(TopicRoom topicRoom) {
		return session.selectList(ns + "selectByTopic", topicRoom);
	}
	
	@Override
	public int updateNumber(UpdateRoomNumber updateRoomNumber) {
		return session.update(ns + "updateNumber", updateRoomNumber);
	}
}
