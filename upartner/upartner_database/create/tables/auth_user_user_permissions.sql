CREATE TABLE auth_user_user_permissions
(
  id            serial  NOT NULL,
  user_id       integer NOT NULL,
  permission_id integer NOT NULL,
  CONSTRAINT auth_user_user_permissions_pkey            PRIMARY KEY (id),
  CONSTRAINT auth_user_user_permissions_permission_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission (id),
  CONSTRAINT auth_user_user_permissions_auth_user_fkey  FOREIGN KEY (user_id)       REFERENCES auth_user (id),
  CONSTRAINT auth_user_user_permissions_userid_permissionid_key UNIQUE (user_id, permission_id)
)