CREATE TABLE auth_group_permissions
(
  id            serial NOT NULL,
  group_id      integer NOT NULL,
  permission_id integer NOT NULL,
  CONSTRAINT auth_group_permissions_pkey                       PRIMARY KEY (id),
  CONSTRAINT auth_group_permissions_auth_permission_fkey       FOREIGN KEY (permission_id) REFERENCES auth_permission (id),
  CONSTRAINT auth_group_permissions_auth_group                 FOREIGN KEY (group_id)      REFERENCES auth_group (id) MATCH SIMPLE,
  CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id)
)
