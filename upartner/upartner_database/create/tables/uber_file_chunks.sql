CREATE TABLE uber_file_chunks
(
  id           serial       NOT NULL,
  order_num    integer      NOT NULL,
  file_id      uuid         NOT NULL,
  content      bytea        NOT NULL,
  CONSTRAINT   uber_file_chunks_pk    PRIMARY KEY (id),
  CONSTRAINT   uber_file_chunks_fkey  FOREIGN KEY (file_id) REFERENCES uber_files (id) ON DELETE CASCADE,
  CONSTRAINT   uber_file_chunks_unq   UNIQUE (order_num, file_id)
);