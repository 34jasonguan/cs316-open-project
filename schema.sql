CREATE TABLE users (
                  netID VARCHAR(10),
                  lastname VARCHAR(100),
                  firstname VARCHAR(100),
                  year VARCHAR(10),
                  email VARCHAR(100),
                  phone VARCHAR(20),
                  class VARCHAR(10),
                  dorm VARCHAR(30), 
                  PRIMARY KEY (netID)
              ); 

INSERT INTO users(netid, lastname, firstname, year, email, phone, class) VALUES
              ('aa101', 'Anderson', 'Alex', 'freshman', 'alex.anderson@duke.edu', '9191234501', 'student'),
              ('hs202', 'Sharma', 'Harsh', 'freshman', 'harsh.sharma@duke.edu', '9191234502', 'student'),
              ('km303', 'Murphy', 'Katie', 'freshman', 'katie.murphy@duke.edu', '9191234503', 'student'),
              ('yt404', 'Tanaka', 'Yuki', 'freshman', 'yuki.tanaka@duke.edu', '9191234504', 'student'),
              ('lc505', 'Chen', 'Liam', 'freshman', 'liam.chen@duke.edu', '9191234505', 'student'),
              ('ja606', 'Ahmed', 'Jasmine', 'freshman', 'jasmine.ahmed@duke.edu', '9191234506', 'student'),
              ('mp707', 'Patel', 'Maya', 'freshman', 'maya.patel@duke.edu', '9191234507', 'student'),
              ('og808', 'Garcia', 'Olivia', 'freshman', 'olivia.garcia@duke.edu', '9191234508', 'student'),
              ('jr909', 'Rodriguez', 'Jose', 'freshman', 'jose.rodriguez@duke.edu', '9191234509', 'student'),
              ('sm110', 'Miller', 'Sarah', 'freshman', 'sarah.miller@duke.edu', '9191234510', 'student'),
              ('at211', 'Thompson', 'Aiden', 'freshman', 'aiden.thompson@duke.edu', '9191234511', 'student'),
              ('rl312', 'Lee', 'Riley', 'freshman', 'riley.lee@duke.edu', '9191234512', 'student'),
              ('an413', 'Nguyen', 'Anh', 'freshman', 'anh.nguyen@duke.edu', '9191234513', 'student'),
              ('bs514', 'Smith', 'Brandon', 'freshman', 'brandon.smith@duke.edu', '9191234514', 'student'),
              ('so615', 'Omar', 'Sami', 'freshman', 'sami.omar@duke.edu', '9191234515', 'student'),
              ('kj716', 'Johnson', 'Kelsey', 'freshman', 'kelsey.johnson@duke.edu', '9191234516', 'student'),
              ('ld817', 'Davis', 'Lucas', 'freshman', 'lucas.davis@duke.edu', '9191234517', 'student'),
              ('ir918', 'Rivera', 'Isabella', 'freshman', 'isabella.rivera@duke.edu', '9191234518', 'student'),
              ('mn019', 'Nakamura', 'Mika', 'freshman', 'mika.nakamura@duke.edu', '9191234519', 'student'),
              ('mk120', 'Khan', 'Muhammad', 'freshman', 'muhammad.khan@duke.edu', '9191234520', 'student'),
              ('ec221', 'Carter', 'Emma', 'freshman', 'emma.carter@duke.edu', '9191234521', 'student'),
              ('dv322', 'Vasquez', 'Daniel', 'freshman', 'daniel.vasquez@duke.edu', '9191234522', 'student'),
              ('na423', 'Alvarez', 'Natalie', 'freshman', 'natalie.alvarez@duke.edu', '9191234523', 'student'),
              ('am524', 'Mehta', 'Arjun', 'freshman', 'arjun.mehta@duke.edu', '9191234524', 'student'),
              ('zb625', 'Baker', 'Zoe', 'freshman', 'zoe.baker@duke.edu', '9191234525', 'student'),
              ('sk726', 'Kim', 'Sung', 'freshman', 'sung.kim@duke.edu', '9191234526', 'student'),
              ('hl827', 'Lopez', 'Hector', 'freshman', 'hector.lopez@duke.edu', '9191234527', 'student'),
              ('mw928', 'White', 'Madison', 'freshman', 'madison.white@duke.edu', '9191234528', 'student'),
              ('ij129', 'Jones', 'Ian', 'freshman', 'ian.jones@duke.edu', '9191234529', 'student'),
              ('mg230', 'Gonzalez', 'Maria', 'freshman', 'maria.gonzalez@duke.edu', '9191234530', 'student'),
              ('ks331', 'Singh', 'Kiran', 'freshman', 'kiran.singh@duke.edu', '9191234531', 'student'),
              ('rb432', 'Brown', 'Rachel', 'freshman', 'rachel.brown@duke.edu', '9191234532', 'student'),
              ('aa533', 'Ali', 'Amir', 'freshman', 'amir.ali@duke.edu', '9191234533', 'student'),
              ('cj634', 'Jackson', 'Chloe', 'freshman', 'chloe.jackson@duke.edu', '9191234534', 'student'),
              ('kv735', 'Vega', 'Kevin', 'freshman', 'kevin.vega@duke.edu', '9191234535', 'student'),
              ('aa836', 'Ahmed', 'Aisha', 'freshman', 'aisha.ahmed@duke.edu', '9191234536', 'student'),
              ('fr937', 'Rossi', 'Francesco', 'freshman', 'francesco.rossi@duke.edu', '9191234537', 'student'),
              ('nw038', 'Wilson', 'Nina', 'freshman', 'nina.wilson@duke.edu', '9191234538', 'student'),
              ('ls139', 'Santos', 'Lorenzo', 'freshman', 'lorenzo.santos@duke.edu', '9191234539', 'student'),
              ('kj240', 'Johnson', 'Kim', 'sophomore', 'kim.johnson@duke.edu', '9191234540', 'RA'),
              ('rt341', 'Taylor', 'Ryan', 'junior', 'ryan.taylor@duke.edu', '9191234541', 'RA'),
              ('mm442', 'Martinez', 'Mia', 'senior', 'mia.martinez@duke.edu', '9191234542', 'RA'),
              ('pa543', 'Anderson', 'Peter', NULL, 'peter.anderson@duke.edu', '9191234543', 'RC'),
              ('hl644', 'Lee', 'Hana', NULL, 'hana.lee@duke.edu', '9191234544', 'RC'); 

/*UPDATED DATA GENERATION QUERIES WITH DORMS*/

INSERT INTO users(netid, lastname, firstname, year, email, phone, class, dorm) VALUES
              ('aa101', 'Anderson', 'Alex', 'freshman', 'alex.anderson@duke.edu', '9191234501', 'student', 'Trinity'),
              ('hs202', 'Sharma', 'Harsh', 'freshman', 'harsh.sharma@duke.edu', '9191234502', 'student', 'Trinity'),
              ('km303', 'Murphy', 'Katie', 'freshman', 'katie.murphy@duke.edu', '9191234503', 'student', 'Trinity'),
              ('yt404', 'Tanaka', 'Yuki', 'freshman', 'yuki.tanaka@duke.edu', '9191234504', 'student', 'Trinity'),
              ('lc505', 'Chen', 'Liam', 'freshman', 'liam.chen@duke.edu', '9191234505', 'student', 'Trinity'),
              ('ja606', 'Ahmed', 'Jasmine', 'freshman', 'jasmine.ahmed@duke.edu', '9191234506', 'student', 'Trinity'),
              ('mp707', 'Patel', 'Maya', 'freshman', 'maya.patel@duke.edu', '9191234507', 'student', 'Trinity'),
              ('og808', 'Garcia', 'Olivia', 'freshman', 'olivia.garcia@duke.edu', '9191234508', 'student', 'Trinity'),
              ('jr909', 'Rodriguez', 'Jose', 'freshman', 'jose.rodriguez@duke.edu', '9191234509', 'student', 'Trinity'),
              ('sm110', 'Miller', 'Sarah', 'freshman', 'sarah.miller@duke.edu', '9191234510', 'student', 'Trinity'),
              ('at211', 'Thompson', 'Aiden', 'freshman', 'aiden.thompson@duke.edu', '9191234511', 'student', 'Trinity'),
              ('rl312', 'Lee', 'Riley', 'freshman', 'riley.lee@duke.edu', '9191234512', 'student', 'Trinity'),
              ('an413', 'Nguyen', 'Anh', 'freshman', 'anh.nguyen@duke.edu', '9191234513', 'student', 'Trinity'),
              ('bs514', 'Smith', 'Brandon', 'freshman', 'brandon.smith@duke.edu', '9191234514', 'student', 'Trinity'),
              ('so615', 'Omar', 'Sami', 'freshman', 'sami.omar@duke.edu', '9191234515', 'student', 'Trinity'),
              ('kj716', 'Johnson', 'Kelsey', 'freshman', 'kelsey.johnson@duke.edu', '9191234516', 'student', 'Belltower'),
              ('ld817', 'Davis', 'Lucas', 'freshman', 'lucas.davis@duke.edu', '9191234517', 'student', 'Belltower'),
              ('ir918', 'Rivera', 'Isabella', 'freshman', 'isabella.rivera@duke.edu', '9191234518', 'student', 'Belltower'),
              ('mn019', 'Nakamura', 'Mika', 'freshman', 'mika.nakamura@duke.edu', '9191234519', 'student', 'Belltower'),
              ('mk120', 'Khan', 'Muhammad', 'freshman', 'muhammad.khan@duke.edu', '9191234520', 'student', 'Belltower'),
              ('ec221', 'Carter', 'Emma', 'freshman', 'emma.carter@duke.edu', '9191234521', 'student', 'Belltower'),
              ('dv322', 'Vasquez', 'Daniel', 'freshman', 'daniel.vasquez@duke.edu', '9191234522', 'student', 'Belltower'),
              ('na423', 'Alvarez', 'Natalie', 'freshman', 'natalie.alvarez@duke.edu', '9191234523', 'student', 'Belltower'),
              ('am524', 'Mehta', 'Arjun', 'freshman', 'arjun.mehta@duke.edu', '9191234524', 'student', 'Blackwell'),
              ('zb625', 'Baker', 'Zoe', 'freshman', 'zoe.baker@duke.edu', '9191234525', 'student', 'Blackwell'),
              ('sk726', 'Kim', 'Sung', 'freshman', 'sung.kim@duke.edu', '9191234526', 'student', 'Blackwell'),
              ('hl827', 'Lopez', 'Hector', 'freshman', 'hector.lopez@duke.edu', '9191234527', 'student', 'Blackwell'),
              ('mw928', 'White', 'Madison', 'freshman', 'madison.white@duke.edu', '9191234528', 'student', 'Blackwell'),
              ('ij129', 'Jones', 'Ian', 'freshman', 'ian.jones@duke.edu', '9191234529', 'student', 'Blackwell'),
              ('mg230', 'Gonzalez', 'Maria', 'freshman', 'maria.gonzalez@duke.edu', '9191234530', 'student', 'Blackwell'),
              ('ks331', 'Singh', 'Kiran', 'freshman', 'kiran.singh@duke.edu', '9191234531', 'student', 'Blackwell'),
              ('rb432', 'Brown', 'Rachel', 'freshman', 'rachel.brown@duke.edu', '9191234532', 'student', 'Blackwell'),
              ('aa533', 'Ali', 'Amir', 'freshman', 'amir.ali@duke.edu', '9191234533', 'student', 'Blackwell'),
              ('cj634', 'Jackson', 'Chloe', 'freshman', 'chloe.jackson@duke.edu', '9191234534', 'student', 'Blackwell'),
              ('kv735', 'Vega', 'Kevin', 'freshman', 'kevin.vega@duke.edu', '9191234535', 'student', 'Blackwell'),
              ('aa836', 'Ahmed', 'Aisha', 'freshman', 'aisha.ahmed@duke.edu', '9191234536', 'student', 'Blackwell'),
              ('fr937', 'Rossi', 'Francesco', 'freshman', 'francesco.rossi@duke.edu', '9191234537', 'student', 'Blackwell'),
              ('nw038', 'Wilson', 'Nina', 'freshman', 'nina.wilson@duke.edu', '9191234538', 'student', 'Blackwell'),
              ('ls139', 'Santos', 'Lorenzo', 'freshman', 'lorenzo.santos@duke.edu', '9191234539', 'student', 'Blackwell'),
              ('kj240', 'Johnson', 'Kim', 'sophomore', 'kim.johnson@duke.edu', '9191234540', 'RA', 'Trinity'),
              ('rt341', 'Taylor', 'Ryan', 'junior', 'ryan.taylor@duke.edu', '9191234541', 'RA', 'Belltower'),
              ('mm442', 'Martinez', 'Mia', 'senior', 'mia.martinez@duke.edu', '9191234542', 'RA', 'Blackwell'),
              ('pa543', 'Anderson', 'Peter', NULL, 'peter.anderson@duke.edu', '9191234543', 'RC', 'Blackwell'),
              ('hl644', 'Lee', 'Hana', NULL, 'hana.lee@duke.edu', '9191234544', 'RC', 'Blackwell'),
              ('xx999', 'Smith', 'John', NULL, 'john.smith@duke.edu', '9191234599', 'RC', 'Blackwell');

INSERT INTO users(netid, lastname, firstname, year, email, phone, class, dorm) VALUES
    ('ab102', 'Brown', 'Aiden', 'freshman', 'aiden.brown@duke.edu', '9193765123', 'student', 'East House'),
    ('km203', 'Nguyen', 'Kai', 'freshman', 'kai.nguyen@duke.edu', '9194857341', 'student', 'East House'),
    ('jz304', 'Zhang', 'Zara', 'freshman', 'zara.zhang@duke.edu', '9195748203', 'student', 'East House'),
    ('as405', 'Sanchez', 'Adriana', 'freshman', 'adriana.sanchez@duke.edu', '9196213857', 'student', 'East House'),
    ('lg506', 'Gonzalez', 'Luis', 'freshman', 'luis.gonzalez@duke.edu', '9196398294', 'student', 'East House'),
    ('hb607', 'Bennett', 'Harper', 'freshman', 'harper.bennett@duke.edu', '9197521493', 'student', 'East House'),
    ('ps708', 'Smith', 'Peyton', 'freshman', 'peyton.smith@duke.edu', '9197654932', 'student', 'East House'),
    ('bm809', 'Miller', 'Beatrice', 'freshman', 'beatrice.miller@duke.edu', '9198123467', 'student', 'East House'),
    ('mj910', 'Jones', 'Milo', 'freshman', 'milo.jones@duke.edu', '9199325678', 'student', 'East House'),
    ('ts011', 'Sullivan', 'Theo', 'freshman', 'theo.sullivan@duke.edu', '9194576230', 'student', 'East House'),
    ('dv112', 'Vasquez', 'Diego', 'freshman', 'diego.vasquez@duke.edu', '9195628743', 'student', 'East House'),
    ('pf213', 'Foster', 'Piper', 'freshman', 'piper.foster@duke.edu', '9196478901', 'student', 'East House'),
    ('ez314', 'Evans', 'Eli', 'freshman', 'eli.evans@duke.edu', '9197361294', 'student', 'East House'),
    ('tw415', 'Wong', 'Tess', 'freshman', 'tess.wong@duke.edu', '9198423567', 'student', 'East House'),
    ('ah516', 'Harris', 'Amara', 'freshman', 'amara.harris@duke.edu', '9199475632', 'student', 'East House'),
    ('kw617', 'Wright', 'Kendall', 'freshman', 'kendall.wright@duke.edu', '9199841762', 'student', 'East House'),
    ('rp718', 'Perez', 'Rafael', 'freshman', 'rafael.perez@duke.edu', '9191054283', 'student', 'Bassett'),
    ('sf819', 'Franklin', 'Sophia', 'freshman', 'sophia.franklin@duke.edu', '9192135974', 'student', 'Bassett'),
    ('jc920', 'Chang', 'Jin', 'freshman', 'jin.chang@duke.edu', '9193206759', 'student', 'Bassett'),
    ('kp021', 'Patel', 'Kiran', 'freshman', 'kiran.patel@duke.edu', '9194318296', 'student', 'Bassett'),
    ('tb122', 'Brown', 'Talia', 'freshman', 'talia.brown@duke.edu', '9195206137', 'student', 'Bassett'),
    ('dc223', 'Collins', 'Dylan', 'freshman', 'dylan.collins@duke.edu', '9196247938', 'student', 'Bassett'),
    ('lm324', 'Morris', 'Leah', 'freshman', 'leah.morris@duke.edu', '9197312045', 'student', 'Bassett'),
    ('hn425', 'Nelson', 'Hannah', 'freshman', 'hannah.nelson@duke.edu', '9198429157', 'student', 'Bassett'),
    ('ak526', 'Kim', 'Aiden', 'freshman', 'aiden.kim@duke.edu', '9199536702', 'student', 'Bassett'),
    ('cb627', 'Baker', 'Caleb', 'freshman', 'caleb.baker@duke.edu', '9190614379', 'student', 'Bassett'),
    ('cw728', 'White', 'Caitlyn', 'freshman', 'caitlyn.white@duke.edu', '9191346890', 'student', 'Bassett'),
    ('jw829', 'Allen', 'Jackson', 'freshman', 'jackson.allen@duke.edu', '9192075923', 'student', 'Bassett'),
    ('km930', 'Mason', 'Kelsey', 'freshman', 'kelsey.mason@duke.edu', '9193187456', 'student', 'Bassett'),
    ('zw031', 'Zhao', 'Zoe', 'freshman', 'zoe.zhao@duke.edu', '9194209867', 'student', 'Pegram'),
    ('am132', 'Mitchell', 'Ava', 'freshman', 'ava.mitchell@duke.edu', '9195310482', 'student', 'Pegram'),
    ('al233', 'Lee', 'Aaron', 'freshman', 'aaron.lee@duke.edu', '9196421803', 'student', 'Pegram'),
    ('bh334', 'Harrison', 'Bella', 'freshman', 'bella.harrison@duke.edu', '9197532948', 'student', 'Pegram'),
    ('rk435', 'King', 'Ryan', 'freshman', 'ryan.king@duke.edu', '9198640395', 'student', 'Pegram'),
    ('cz536', 'Zimmerman', 'Chloe', 'freshman', 'chloe.zimmerman@duke.edu', '9199754567', 'student', 'Pegram'),
    ('eh637', 'Hughes', 'Ella', 'freshman', 'ella.hughes@duke.edu', '9190865974', 'student', 'Pegram'),
    ('bh738', 'Hawkins', 'Ben', 'freshman', 'ben.hawkins@duke.edu', '9191976083', 'student', 'Pegram'),
    ('af839', 'Fowler', 'Amos', 'freshman', 'amos.fowler@duke.edu', '9192087195', 'student', 'Pegram'),
    ('ja940', 'Anderson', 'Jaxon', 'freshman', 'jaxon.anderson@duke.edu', '9193198306', 'student', 'Pegram'),
    ('ma041', 'Rodriguez', 'Maya', 'sophomore', 'maya.rodriguez@duke.edu', '9194309411', 'RA', 'Bassett'),
    ('lb142', 'Becker', 'Liam', 'junior', 'liam.becker@duke.edu', '9195412547', 'RA', 'Pegram'),
    ('jc243', 'Curtis', 'Julia', 'senior', 'julia.curtis@duke.edu', '9196523769', 'RA', 'East House'),
    ('nk344', 'Kramer', 'Nina', NULL, 'nina.kramer@duke.edu', '9197634590', 'RC', 'East House'),
    ('vp445', 'Patel', 'Vikram', NULL, 'vikram.patel@duke.edu', '9198745602', 'RC', 'Bassett'),
    ('em546', 'Morris', 'Ella', NULL, 'ella.morris@duke.edu', '9199856711', 'RC', 'Pegram');


CREATE TABLE hasRA (
                  studentNetID VARCHAR(10),
                  studentLastName VARCHAR(100),
                  studentFirstName VARCHAR(100),
                  raNetID VARCHAR(10),
                  raLastName VARCHAR(100),
                  raFirstName VARCHAR(100)
              ); 

CREATE TABLE hasRC (
                  raNetID VARCHAR(10),
                  raLastName VARCHAR(100),
                  raFirstName VARCHAR(100),
                  rcNetID VARCHAR(10),
                  rcLastName VARCHAR(100),
                  rcFirstName VARCHAR(100)
              ); 

INSERT INTO hasRA (studentNetID, studentLastName, studentFirstName, raNetID, raLastName, raFirstName) VALUES
              -- Assign 15 students to Kim Johnson (RA 1)
              ('aa101', 'Anderson', 'Alex', 'kj240', 'Johnson', 'Kim'),
              ('hs202', 'Sharma', 'Harsh', 'kj240', 'Johnson', 'Kim'),
              ('km303', 'Murphy', 'Katie', 'kj240', 'Johnson', 'Kim'),
              ('yt404', 'Tanaka', 'Yuki', 'kj240', 'Johnson', 'Kim'),
              ('lc505', 'Chen', 'Liam', 'kj240', 'Johnson', 'Kim'),
              ('ja606', 'Ahmed', 'Jasmine', 'kj240', 'Johnson', 'Kim'),
              ('mp707', 'Patel', 'Maya', 'kj240', 'Johnson', 'Kim'),
              ('og808', 'Garcia', 'Olivia', 'kj240', 'Johnson', 'Kim'),
              ('jr909', 'Rodriguez', 'Jose', 'kj240', 'Johnson', 'Kim'),
              ('sm110', 'Miller', 'Sarah', 'kj240', 'Johnson', 'Kim'),
              ('at211', 'Thompson', 'Aiden', 'kj240', 'Johnson', 'Kim'),
              ('rl312', 'Lee', 'Riley', 'kj240', 'Johnson', 'Kim'),
              ('an413', 'Nguyen', 'Anh', 'kj240', 'Johnson', 'Kim'),
              ('bs514', 'Smith', 'Brandon', 'kj240', 'Johnson', 'Kim'),
              ('so615', 'Omar', 'Sami', 'kj240', 'Johnson', 'Kim'),
              
              -- Assign 15 students to Ryan Taylor (RA 2)
              ('kj716', 'Johnson', 'Kelsey', 'rt341', 'Taylor', 'Ryan'),
              ('ld817', 'Davis', 'Lucas', 'rt341', 'Taylor', 'Ryan'),
              ('ir918', 'Rivera', 'Isabella', 'rt341', 'Taylor', 'Ryan'),
              ('mn019', 'Nakamura', 'Mika', 'rt341', 'Taylor', 'Ryan'),
              ('mk120', 'Khan', 'Muhammad', 'rt341', 'Taylor', 'Ryan'),
              ('ec221', 'Carter', 'Emma', 'rt341', 'Taylor', 'Ryan'),
              ('dv322', 'Vasquez', 'Daniel', 'rt341', 'Taylor', 'Ryan'),
              ('na423', 'Alvarez', 'Natalie', 'rt341', 'Taylor', 'Ryan'),
              ('am524', 'Mehta', 'Arjun', 'rt341', 'Taylor', 'Ryan'),
              ('zb625', 'Baker', 'Zoe', 'rt341', 'Taylor', 'Ryan'),
              ('sk726', 'Kim', 'Sung', 'rt341', 'Taylor', 'Ryan'),
              ('hl827', 'Lopez', 'Hector', 'rt341', 'Taylor', 'Ryan'),
              ('mw928', 'White', 'Madison', 'rt341', 'Taylor', 'Ryan'),
              ('ij129', 'Jones', 'Ian', 'rt341', 'Taylor', 'Ryan'),
              ('mg230', 'Gonzalez', 'Maria', 'rt341', 'Taylor', 'Ryan'),
              
              -- Assign remaining students to Mia Martinez (RA 3)
              ('ks331', 'Singh', 'Kiran', 'mm442', 'Martinez', 'Mia'),
              ('rb432', 'Brown', 'Rachel', 'mm442', 'Martinez', 'Mia'),
              ('aa533', 'Ali', 'Amir', 'mm442', 'Martinez', 'Mia'),
              ('cj634', 'Jackson', 'Chloe', 'mm442', 'Martinez', 'Mia'),
              ('kv735', 'Vega', 'Kevin', 'mm442', 'Martinez', 'Mia'),
              ('aa836', 'Ahmed', 'Aisha', 'mm442', 'Martinez', 'Mia'),
              ('fr937', 'Rossi', 'Francesco', 'mm442', 'Martinez', 'Mia'),
              ('nw038', 'Wilson', 'Nina', 'mm442', 'Martinez', 'Mia'),
              ('ls139', 'Santos', 'Lorenzo', 'mm442', 'Martinez', 'Mia'); 

INSERT INTO hasRC (raNetID, raLastName, raFirstName, rcNetID, rcLastName, rcFirstName) VALUES
              ('kj240', 'Johnson', 'Kim', 'pa543', 'Anderson', 'Peter'),
              ('rt341', 'Taylor', 'Ryan', 'pa543', 'Anderson', 'Peter'),
              ('mm442', 'Martinez', 'Mia', 'hl644', 'Lee', 'Hana'); 

CREATE TABLE activities (
    activityid INTEGER NOT NULL,
    name VARCHAR(255),
    date DATE,
    time TIME,
    room_number VARCHAR(10),
    building_name VARCHAR(255),
    PRIMARY KEY (activityid)
);

INSERT INTO activities
VALUES (123, 'Pumpkin Carving', '2024-10-23', '17:00:00', '134', 'GA'),
       (456, 'Halloween Movie Night', '2024-10-25', '22:00:00', '122', 'Belltower'),
       (789, 'Costume Party', '2024-10-28', '20:00:00', '107', 'Pegram');

CREATE TABLE report (
    id SERIAL PRIMARY KEY,  
    type TEXT NOT NULL CHECK (type IN ('Noise Complaint', 'Safety Issues', 'Maintenance Request')),  
    urgency TEXT NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),  
    description TEXT,  
    submitted_by VARCHAR(255), 
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE, 
    location TEXT,  
    issue_type TEXT,  
    equipment TEXT, 
    timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO report (type, urgency, description, submitted_by, is_anonymous, location, issue_type, equipment, timestamp) 
VALUES 
    ('Safety Issues', 'High', 'Fire hazard near Belltower', 'ir918', FALSE, 'Belltower', 'Fire Hazard', NULL, '2024-10-21 14:30:00'),
    ('Maintenance Request', 'Low', 'Air conditioning needs repair in room 102', 'mk120', FALSE, 'East House, Room 102', NULL, 'Air Conditioning', '2024-10-21 09:00:00'),
    ('Maintenance Request', 'Medium', 'Water leakage in restroom', 'zb625', FALSE, 'Trinity, Room 203', NULL, 'Water Pipe', '2024-10-21 11:15:00'),
    ('Safety Issues', 'High', 'Slip risk due to wet floor', 'at211', FALSE, 'Belltower, Hallway', 'Slip/Fall', NULL, '2024-10-21 13:45:00'),
    ('Safety Issues', 'High', 'Suspicious person sighted', NULL, TRUE, 'Parking Lot near Trinity', 'Suspicious Activity', NULL, '2024-10-21 15:20:00'), 
    ('Safety Issues', 'High', 'Fire alarm malfunctioning', 'sm110', FALSE, 'East House, Building C', 'Fire Alarm', NULL, '2024-10-21 17:00:00'),
    ('Safety Issues', 'High', 'Smoke detected in hallway', 'rb432', FALSE, 'Trinity, Hallway 3', 'Smoke Detected', NULL, '2024-10-21 18:30:00'),
    ('Maintenance Request', 'High', 'Elevator malfunction', 'kv735', FALSE, 'Belltower, Elevator', NULL, 'Elevator', '2024-10-21 08:45:00'),
    ('Noise Complaint', 'Low', 'Loud music from East House, Room 204', NULL, TRUE, 'East House, Room 204', NULL, NULL, '2024-10-20 22:30:00'),  
    ('Noise Complaint', 'Medium', 'Construction noise during quiet hours', 'bs514', FALSE, 'Trinity, North Wing', NULL, NULL, '2024-10-22 14:00:00');

CREATE TABLE password (
    netID VARCHAR(10),
    password VARCHAR(25),
    PRIMARY KEY (netID)
);


CREATE TABLE availability (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(netid),
  FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



