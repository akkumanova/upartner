CREATE TABLE uber_files
(
  id           uuid          NOT NULL,
  filename     varchar(50)   NOT NULL,
  extension    varchar(20)   NOT NULL,
  order_num    integer       NOT NULL,
  type         varchar(100)  NOT NULL,
  CONSTRAINT   uber_files_pk PRIMARY KEY (id),
  CONSTRAINT   uber_files_unq   UNIQUE (filename, extension, order_num)
);