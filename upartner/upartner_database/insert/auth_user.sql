INSERT INTO auth_user
  (is_superuser, password                                                                       , last_login       , username, first_name, last_name , email               , is_staff, is_active, date_joined      )
VALUES
  -- pass: 12345678
  (true        , N'pbkdf2_sha256$12000$UIVpYRmFyI7V$3HyvpRpgCPJVKvkll4lAuxu3ErDF6rQ3+ikw2aoC7ik=', current_timestamp, N'admin', N'Ivan'   , N'Georgiev', N'admin@alabala.com', true   , true     , current_timestamp)