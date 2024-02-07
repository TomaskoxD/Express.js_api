-- Active: 1669418752265@@localhost@3306@expressAPI
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `person`;
DROP TABLE IF EXISTS `author`;
DROP TABLE IF EXISTS `teacher`;
DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `tutorials`;
DROP TABLE IF EXISTS `class`;
DROP TABLE IF EXISTS `student_class`;
DROP TABLE IF EXISTS `class_tutorial`;

CREATE TABLE IF NOT EXISTS `user` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `person` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- author is specializations of person
CREATE TABLE IF NOT EXISTS `author` (
    id int(11) NOT NULL, FOREIGN KEY (id) REFERENCES person (id), active BOOLEAN DEFAULT false
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `teacher` (
    id INT(11) NOT NULL, office VARCHAR(255) NOT NULL, type_of_employment VARCHAR(255) NOT NULL, FOREIGN KEY (id) REFERENCES person (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `student` (
    id INT(11) NOT NULL, grade INTEGER NOT NULL, locker VARCHAR(255) NOT NULL, FOREIGN KEY (id) REFERENCES person (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE IF NOT EXISTS `tutorials` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(255) NOT NULL, description varchar(255), published BOOLEAN DEFAULT false, author_id int, FOREIGN KEY (author_id) REFERENCES author (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `class` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(255) NOT NULL, 
    teacher_id int, 
    FOREIGN KEY (teacher_id) REFERENCES teacher (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `student_class` (
    student_id int, 
    class_id int, 
    FOREIGN KEY (student_id) REFERENCES student (id), 
    FOREIGN KEY (class_id) REFERENCES class (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `class_tutorial` (
    class_id int, 
    tutorial_id int, 
    FOREIGN KEY (class_id) REFERENCES class (id), 
    FOREIGN KEY (tutorial_id) REFERENCES tutorials (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- seed data
-- INSERT INTO `user` (username, email, password) VALUES ('admin

INSERT INTO `person` (name, email) VALUES ('John Doe', 'johndoe@mail.com');
INSERT INTO `author` (id, active) VALUES (1, true);

INSERT INTO `person` (name, email) VALUES ('Jane Doe', 'janedoe@mail.com');
INSERT INTO `teacher` (id, office, type_of_employment) VALUES (2, 'A-101', 'Full-time');

INSERT INTO `person` (name, email) VALUES ('John Smith', 'johnsmith@mail.com');
INSERT INTO `student` (id, grade, locker) VALUES (3, 10, 'A-101');

INSERT INTO `person` (name, email) VALUES ('Jane Smith', 'janesmith@mail.com');
INSERT INTO `student` (id, grade, locker) VALUES (4, 11, 'A-102');

INSERT INTO `tutorials` (title, description, published, author_id) VALUES ('Tutorial 1', 'Description 1', true, 1);
INSERT INTO `tutorials` (title, description, published, author_id) VALUES ('Tutorial 2', 'Description 2', true, 1);
INSERT INTO `tutorials` (title, description, published, author_id) VALUES ('Tutorial 3', 'Description 3', true, 1);

INSERT INTO `class` (name, teacher_id) VALUES ('Math', 2);
INSERT INTO `class` (name, teacher_id) VALUES ('Science', 2);
INSERT INTO `class` (name, teacher_id) VALUES ('English', 2);

INSERT INTO `student_class` (student_id, class_id) VALUES (3, 1);
INSERT INTO `student_class` (student_id, class_id) VALUES (3, 2);
INSERT INTO `student_class` (student_id, class_id) VALUES (4, 2);
INSERT INTO `student_class` (student_id, class_id) VALUES (4, 3);

INSERT INTO `class_tutorial` (class_id, tutorial_id) VALUES (1, 1);
INSERT INTO `class_tutorial` (class_id, tutorial_id) VALUES (1, 2);
INSERT INTO `class_tutorial` (class_id, tutorial_id) VALUES (2, 2);
INSERT INTO `class_tutorial` (class_id, tutorial_id) VALUES (2, 3);
INSERT INTO `class_tutorial` (class_id, tutorial_id) VALUES (3, 3);

