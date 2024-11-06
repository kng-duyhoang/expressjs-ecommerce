CREATE TABLE test_table (
	id INT NOT NULL,
	name VARCHAR(255) DEFAULT NULL,
	age int DEFAULT NULL,
	address VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4
<!-- Procedure -->
CREATE DEFINER=`root`@`%` PROCEDURE `insert_data`()
BEGIN
	DECLARE max_id INT DEFAULT 10;
	DECLARE i INT DEFAULT 1;
	WHILE i <= max_id DO
		INSERT INTO test_table (id, name, age, address) VALUES (i, CONCAT('name', i), i%100, CONCAT('address', i));
		SET i = i + 1;
	END WHILE;
END