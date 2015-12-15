CREATE TABLE uber_checks
(
  id            serial       NOT NULL,
  check_file_id int          NOT NULL,
  id_str        text         NULL,
  name          text         NULL,
  result        text         NULL,
  partner_id    int          NULL,
  check_result  check_result NULL,
  is_valid      boolean      NOT NULL,
  error         text         NULL,
  CONSTRAINT uber_checks_pkey             PRIMARY KEY (id),
  CONSTRAINT uber_checks_check_files_fkey FOREIGN KEY (check_file_id) REFERENCES uber_check_files (id) ON DELETE CASCADE,
  CONSTRAINT uber_checks_partners_fkey    FOREIGN KEY (partner_id)    REFERENCES uber_partners (id)
);