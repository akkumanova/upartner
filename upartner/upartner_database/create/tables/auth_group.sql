CREATE TABLE auth_group
(
  id   serial                NOT NULL,
  name character varying(80) NOT NULL,
  CONSTRAINT auth_group_pkey     PRIMARY KEY (id),
  CONSTRAINT auth_group_name_key UNIQUE (name)
)

