drop schema if exists hospital_database;
CREATE SCHEMA `hospital_database`;
USE `hospital_database`;
CREATE TABLE Department (
    Name VARCHAR(50) PRIMARY KEY NOT NULL CHECK (
        Name IN (
            'педіатрія',
            'терапевтичне відділення',
            'хірургія',
            'неврологія',
            'офтальмологія',
            'стоматологія',
            'дерматологія'
        )
    )
);
CREATE TABLE Room (
    Number INTEGER PRIMARY KEY,
    DepartmentFK VARCHAR(50),
    FOREIGN KEY (DepartmentFK) REFERENCES Department(Name) ON DELETE
    SET NULL,
        PatientFK integer
);
CREATE TABLE Doctor (
    DoctorID INTEGER PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    DepartmentFK VARCHAR(50),
    FOREIGN KEY (DepartmentFK) REFERENCES Department(Name) ON DELETE
    SET NULL,
        Specialty VARCHAR(50) NOT NULL CHECK (
            Specialty IN (
                'педіатр',
                'окуліст дитячий',
                'дитячий стоматолог',
                'терапевт',
                'хірург',
                'невролог',
                'невропатолог',
                'офтальмолог',
                'отоларинголог',
                'окуліст',
                'стоматолог',
                'ортодонт',
                'дерматолог',
                'трихолог',
                'косметолог'
            )
        ),
        PhoneNumber CHAR(10) NOT NULL,
        StartedAt Date
);
CREATE TABLE Patient (
    PatientID INTEGER PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Sex CHAR(10) NOT NULL CHECK (Sex IN ('жіноча', 'чоловіча', 'інше')),
    PhoneNumber CHAR(10) NOT NULL,
    DateOfBirht Date,
    MedicalHistory TEXT,
    RoomFK INTEGER,
    FOREIGN KEY (RoomFK) REFERENCES Room(Number) ON DELETE
    SET NULL
);
ALTER TABLE Room DROP COLUMN PatientFK,
    ADD COLUMN PatientFK integer,
    ADD constraint FOREIGN KEY (PatientFK) REFERENCES Patient(PatientID) ON DELETE
SET NULL;
CREATE TABLE Appointment (
    AppointmentID INTEGER PRIMARY KEY,
    Diagnosis VARCHAR(50),
    DoctorFK INTEGER,
    FOREIGN KEY (DoctorFK) REFERENCES Doctor(DoctorID) ON DELETE
    SET NULL,
        PatientFK INTEGER,
        FOREIGN KEY (PatientFK) REFERENCES Patient(PatientID) ON DELETE
    SET NULL,
        Date DATETIME
);
INSERT INTO Department
VALUES ('стоматологія');
INSERT INTO Department
VALUES ('педіатрія');
INSERT INTO Department
VALUES ('терапевтичне відділення');
INSERT INTO Department
VALUES ('хірургія');
INSERT INTO Department
VALUES ('офтальмологія');
INSERT INTO Room
VALUES (1, 'педіатрія', Null);
INSERT INTO Room
VALUES (2, 'педіатрія', Null);
INSERT INTO Room
VALUES (3, 'педіатрія', Null);
INSERT INTO Room
VALUES (4, 'терапевтичне відділення', Null);
INSERT INTO Room
VALUES (5, 'терапевтичне відділення', Null);
INSERT INTO Room
VALUES (6, 'терапевтичне відділення', Null);
INSERT INTO Room
VALUES (7, 'хірургія', Null);
INSERT INTO Room
VALUES (8, 'хірургія', Null);
INSERT INTO Room
VALUES (9, 'хірургія', Null);
INSERT INTO Doctor
VALUES (
        1234,
        'Дмитро',
        'Шевченко',
        'педіатрія',
        'педіатр',
        '0933845672',
        "2001-12-03"
    );
INSERT INTO Doctor
VALUES (
        1235,
        'Андрій',
        'Слобоженко',
        'педіатрія',
        'окуліст дитячий',
        '0957445656',
        "2005-04-17"
    );
INSERT INTO Doctor
VALUES (
        1236,
        'Іванна',
        'Хвильова',
        'хірургія',
        'хірург',
        '0674659032',
        "2012-06-24"
    );
INSERT INTO Doctor
VALUES (
        1237,
        'Анастасія',
        'Квітка',
        'стоматологія',
        'ортодонт',
        '0973523456',
        "1998-01-05"
    );
INSERT INTO Doctor
VALUES (
        1238,
        'Анатолій',
        'Ткачук',
        'стоматологія',
        'стоматолог',
        '0983988880',
        "1999-11-03"
    );
INSERT INTO Doctor
VALUES (
        1239,
        'Анна',
        'Франко',
        'хірургія',
        'хірург',
        '0995675640',
        "2012-06-24"
    );
INSERT INTO Doctor
VALUES (
        1240,
        'Віталій',
        'Дубенко',
        'терапевтичне відділення',
        'терапевт',
        '0631232121',
        "2012-06-24"
    );
INSERT INTO Doctor
VALUES (
        1241,
        'Марина',
        'Шнурова',
        'офтальмологія',
        'офтальмолог',
        '0682359083',
        "2012-06-24"
    );
INSERT INTO Patient
VALUES (
        3000,
        'Олексій',
        'Мироненко',
        'чоловіча',
        '0995675669',
        "1990-12-03",
        'вітрянка, грип, орві',
        5
    );
INSERT INTO Patient
VALUES (
        3001,
        'Валерія',
        'Ткаченко',
        'жіноча',
        '0995785600',
        "1999-10-01",
        'гепатит, підшлункова',
        4
    );
INSERT INTO Patient
VALUES (
        3002,
        'Діана',
        'Ширіна',
        'жіноча',
        '0633875432',
        "2004-06-07",
        'грип, гострий отит,видалення апендициту',
        9
    );
INSERT INTO Patient
VALUES (
        3003,
        'Олександр',
        'Дукач',
        'чоловіча',
        '0983889830',
        "2017-11-28",
        'вітрянка, застуда',
        2
    );
INSERT INTO Patient
VALUES (
        3004,
        'Володимир',
        'Нутела',
        'чоловіча',
        '0975677471',
        "2014-12-15",
        'вітрянка',
        1
    );
UPDATE Room
SET PatientFK = 3000
WHERE Number = 5;
UPDATE Room
SET PatientFK = 3001
WHERE Number = 4;
UPDATE Room
SET PatientFK = 3002
WHERE Number = 9;
UPDATE Room
SET PatientFK = 3003
WHERE Number = 2;
UPDATE Room
SET PatientFK = 3004
WHERE Number = 1;
INSERT INTO Appointment
VALUES (11111, 'грип', 1234, 3003, "2024-03-23 13:00:00");
INSERT INTO Appointment
VALUES (
        11112,
        'видалення апендициту',
        1236,
        3002,
        "2024-03-23 13:30:00"
    );
INSERT INTO Appointment
VALUES (
        11113,
        'погіршення зору',
        1235,
        3004,
        "2024-03-23 14:00:00"
    );
INSERT INTO Appointment
VALUES (
        11114,
        'карієс',
        1238,
        3001,
        "2024-03-24 14:30:00"
    );
INSERT INTO Appointment
VALUES (
        11115,
        'встановлення брекетів',
        1237,
        3000,
        "2024-03-24 15:00:00"
    );
INSERT INTO Appointment
VALUES (
        11116,
        'видалення апендициту',
        1236,
        3002,
        "2024-03-25 15:30:00"
    );