CREATE TABLE django_session
(
  session_key  varchar(40) NOT NULL,
  session_data text        NOT NULL,
  expire_date  timestamptz NOT NULL,
  CONSTRAINT django_session_pkey PRIMARY KEY (session_key)
)