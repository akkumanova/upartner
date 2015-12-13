CREATE TABLE auth_user_groups
(
  id       serial NOT NULL,
  user_id  integer NOT NULL,
  group_id integer NOT NULL,
  CONSTRAINT auth_user_groups_pkey           PRIMARY KEY (id),
  CONSTRAINT auth_user_groups_group_id_fkey  FOREIGN KEY (group_id) REFERENCES auth_group (id),
  CONSTRAINT auth_user_groups_auth_user_fkey FOREIGN KEY (user_id)  REFERENCES auth_user (id),
  CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id)
)