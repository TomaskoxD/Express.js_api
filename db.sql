DELETE DATABASE IF EXISTS user;
DELETE DATABASE IF EXISTS person;
DELETE DATABASE IF EXISTS author;
DELETE DATABASE IF EXISTS teacher;
DELETE DATABASE IF EXISTS student;
DELETE DATABASE IF EXISTS tutorials;
DELETE DATABASE IF EXISTS class;
DELETE DATABASE IF EXISTS student_class;
DELETE DATABASE IF EXISTS class_tutorial;

CREATE TABLE IF NOT EXISTS `user` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `person` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- author is specializations of person
CREATE TABLE IF NOT EXISTS `author` (
    id int(11) NOT NULL FOREIGN KEY REFERENCES person (id), active BOOLEAN DEFAULT false
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

   