CREATE TABLE auth_user
(
  id           serial       NOT NULL,
  password     varchar(128) NOT NULL,
  last_login   timestamptz  NOT NULL,
  is_superuser boolean      NOT NULL,
  username     varchar(30)  NOT NULL,
  first_name   varchar(30)  NOT NULL,
  last_name    varchar(30)  NOT NULL,
  email        varchar(75)  NOT NULL,
  is_staff     boolean      NOT NULL,
  is_active    boolean      NOT NULL,
  date_joined  timestamptz  NOT NULL,
  CONSTRAINT auth_user_pkey PRIMARY KEY (id),
  CONSTRAINT auth_user_username_key UNIQUE (username)
)