create database videochat;

use videochat;

set charset utf8;
alter database videochat default character set utf8;
alter table User convert to character set utf8;
alter table UserToken convert to character set utf8;
alter table Room convert to character set utf8;

create table User (
	user_id varchar(100) primary key, -- 사용자 아이디
    user_pw varchar(100), -- 사용자 비밀번호
    user_nm varchar(100), -- 사용자 이름
    user_gd enum('M', 'W'), -- 사용자 성별
    user_age int, -- 사용자 나이
    user_ph varchar(50), -- 사용자 번호
    user_ma varchar(100), -- 사용자 메일
    rgst_tm datetime, -- 등록시간
    updt_tm datetime -- 수정시간
);

create table UserToken (
	user_id varchar(100) primary key, -- 사용자 아이디
    refresh_token varchar(500), -- 사용자 갱신 토큰
    updt_tm datetime -- 수정시간
);

create table Room (
	room_id int primary key auto_increment,
    create_id varchar(100),
    contents varchar(500),
    password varchar(30),
    type enum('자유', '회의', '스터디'),
    max int,
    number int
);

select * from User;
select * from UserToken;
select * from Room;

update Room
set number = number + (-1)
where room_id = 3;

delete from User where user_id ='';
delete from UserToken where user_id ='';

drop table User;
drop table UserToken;
drop table Room;