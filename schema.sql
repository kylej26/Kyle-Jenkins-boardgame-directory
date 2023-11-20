# TODO: add mysql/mariadb table definitions
CREATE TABLE `game` (
	`gameid` INT(30) NOT NULL AUTO_INCREMENT,
	`Name` VARCHAR(30) NOT NULL,
	`times_played` INT(30) NULL DEFAULT 0,
	`MostRecent` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`gameid`) 
);

CREATE TABLE `session` (
	`session_id` INT(30) NOT NULL AUTO_INCREMENT,
	`gameid` INT(30) NOT NULL,
	`Date` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`session_id`),
	INDEX `fk_gameid` (`gameid`),
	CONSTRAINT `fk_gameid` FOREIGN KEY (`gameid`) REFERENCES `game` (`gameid`) ON UPDATE NO ACTION ON DELETE RESTRICT
);

CREATE TRIGGER update_most_recent_session
AFTER INSERT ON session
FOR EACH ROW
BEGIN
    UPDATE Game
    SET MostRecentSessionDate = (
        SELECT MAX(dateColumn)
        FROM GameSession
        WHERE GameID = NEW.GameID
    )
    WHERE GameID = NEW.GameID;
END;
 

 CREATE TRIGGER update_most_times_played
 AFTER INSERT ON session
 FOR EACH ROW
 BEGIN
	UPDATE game
   SET times_played = times_played + 1
   WHERE gameid = NEW.gameid;
END;

# TODO: add sample data
INSERT INTO Game (Name) VALUES ('LIFE');

 INSERT INTO Game (Name) VALUES ('Monopoly');

 INSERT INTO Game (Name) VALUES ('Scrabble');



