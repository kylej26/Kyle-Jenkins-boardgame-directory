-- TODO: add mysql/mariadb table definitions
CREATE TABLE `game` (
	`gameid` INT(11) NOT NULL AUTO_INCREMENT,
	`Name` VARCHAR(30) NOT NULL,
	`times_played` INT(11) NULL DEFAULT 0,
	`MostRecent` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`gameid`) 
);

CREATE TABLE `session` (
	`session_id` INT(11) NOT NULL AUTO_INCREMENT,
	`gameid` INT(11) NOT NULL,
	`Date` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`session_id`),
	INDEX `fk_gameid` (`gameid`),
	CONSTRAINT `fk_gameid` FOREIGN KEY (`gameid`) REFERENCES `game` (`gameid`) ON UPDATE NO ACTION ON DELETE RESTRICT
);

DELIMITER $$

CREATE TRIGGER `update_most_recent_session`
AFTER INSERT ON `session`
FOR EACH ROW
BEGIN
    UPDATE `game`
    SET `MostRecent` = (
        SELECT MAX(`Date`)
        FROM `session`
        WHERE `gameid` = NEW.`gameid`
    )
    WHERE `gameid` = NEW.`gameid`;
END;
$$

CREATE TRIGGER `update_most_times_played`
AFTER INSERT ON `session`
FOR EACH ROW
BEGIN
	UPDATE `game`
    SET `times_played` = `times_played` + 1
    WHERE `gameid` = NEW.`gameid`;
END;
$$

DELIMITER ;

-- TODO: add sample data
INSERT INTO `game` (`Name`) VALUES ('LIFE');

INSERT INTO `game` (`Name`) VALUES ('Monopoly');

INSERT INTO `game` (`Name`) VALUES ('Scrabble');
