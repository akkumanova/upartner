CREATE TABLE uber_check_files
(
  id            serial       NOT NULL,
  file_id       uuid         NOT NULL,
  is_imported   boolean      NOT NULL,
  date_created  timestamptz  NOT NULL,
  date_imported timestamptz  NOT NULL,
  CONSTRAINT   uber_check_files_pk          PRIMARY KEY (id),
  CONSTRAINT   uber_check_files_files_fkey  FOREIGN KEY (file_id) REFERENCES uber_files (id) ON DELETE CASCADE
);