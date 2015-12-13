CREATE TABLE auth_permission
(
  id              serial       NOT NULL,
  name            varchar(50)  NOT NULL,
  content_type_id integer      NOT NULL,
  codename        varchar(100) NOT NULL,
  CONSTRAINT auth_permission_pkey                         PRIMARY KEY (id),
  CONSTRAINT auth_permission_django_content_type_fkey     FOREIGN KEY (content_type_id) REFERENCES django_content_type (id),
  CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename)
)