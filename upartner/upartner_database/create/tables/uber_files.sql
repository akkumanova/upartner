CREATE TABLE uber_files
(
  id           uuid          NOT NULL,
  filename     varchar(50)   NOT NULL,
  CONSTRAINT   uber_files_pk PRIMARY KEY (id)
);