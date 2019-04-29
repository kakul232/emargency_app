-- Up 
CREATE TABLE IF NOT EXISTS contact (ID INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(50) NOT NULL,phone varchar(50) NOT NULL )

-- Down
Drop TABLE contact;