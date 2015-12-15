-- creating tables
\i './create/tables/django_content_type.sql';
\i './create/tables/django_session.sql';

\i './create/tables/auth_user.sql';
\i './create/tables/auth_group.sql';
\i './create/tables/auth_user_groups.sql';
\i './create/tables/auth_permission.sql';
\i './create/tables/auth_group_permissions.sql';
\i './create/tables/auth_user_user_permissions.sql';

\i './create/tables/nomenclatures_country.sql';

\i './create/tables/uber_partners.sql';
\i './create/tables/uber_files.sql'
\i './create/tables/uber_file_chunks.sql'
\i './create/tables/uber_check_files.sql'
\i './create/tables/uber_checks.sql'

-- inserting test data
\i './insert/auth_user.sql';
\i './insert/nomenclatures_country.sql';