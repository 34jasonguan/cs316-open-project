CREATE TABLE users (
                  netID VARCHAR(10),
                  lastname VARCHAR(100),
                  firstname VARCHAR(100),
                  year VARCHAR(10),
                  email VARCHAR(100),
                  phone INTEGER,
                  class VARCHAR(10),
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    type TEXT NOT NULL CHECK (type IN ('Noise Complaint', 'Safety Issues', 'Maintenance Request')),  
    urgency TEXT NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),  
    description TEXT,  
    submitted_by VARCHAR(255), 
    is_anonymous BOOLEAN NOT NULL DEFAULT 0, 
    location TEXT,  
    issue_type TEXT,  
    equipment TEXT, 
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO report (type, urgency, description, submitted_by, is_anonymous, location, issue_type, equipment, timestamp) 
VALUES 
    ('Safety Issues', 'High', 'Fire hazard near Belltower', 'ir918', 0, 'Belltower', 'Fire Hazard', NULL, '2024-10-21 14:30:00'),
    ('Maintenance Request', 'Low', 'Air conditioning needs repair in room 102', 'mk120', 0, 'East House, Room 102', NULL, 'Air Conditioning', '2024-10-21 09:00:00'),
    ('Maintenance Request', 'Medium', 'Water leakage in restroom', 'zb625', 0, 'Trinity, Room 203', NULL, 'Water Pipe', '2024-10-21 11:15:00'),
    ('Safety Issues', 'High', 'Slip risk due to wet floor', 'at211', 0, 'Belltower, Hallway', 'Slip/Fall', NULL, '2024-10-21 13:45:00'),
    ('Safety Issues', 'High', 'Suspicious person sighted', NULL, 1, 'Parking Lot near Trinity', 'Suspicious Activity', NULL, '2024-10-21 15:20:00'), 
    ('Safety Issues', 'High', 'Fire alarm malfunctioning', 'sm110', 0, 'East House, Building C', 'Fire Alarm', NULL, '2024-10-21 17:00:00'),
    ('Safety Issues', 'High', 'Smoke detected in hallway', 'rb432', 0, 'Trinity, Hallway 3', 'Smoke Detected', NULL, '2024-10-21 18:30:00'),
    ('Maintenance Request', 'High', 'Elevator malfunction', 'kv735', 0, 'Belltower, Elevator', NULL, 'Elevator', '2024-10-21 08:45:00'),
    ('Noise Complaint', 'Low', 'Loud music from East House, Room 204', NULL, 1, 'East House, Room 204', NULL, NULL, '2024-10-20 22:30:00'),  
    ('Noise Complaint', 'Medium', 'Construction noise during quiet hours', 'bs514', 0, 'Trinity, North Wing', NULL, NULL, '2024-10-22 14:00:00');

CREATE TABLE password (
    netID VARCHAR(10),
    password VARCHAR(25),
    PRIMARY KEY (netID)
);

CREATE TABLE availability (
    netID VARCHAR(255), 
    available_date DATE,
    PRIMARY KEY (netID, available_date)
);



