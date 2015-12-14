CREATE TYPE check_result AS ENUM ('cl', 'dd', 'fd');

CREATE TABLE uber_partners
(
  id           serial       NOT NULL,
  country_id   integer      NOT NULL,
  user_id      integer      NOT NULL,
  password     varchar(10)  NULL,
  is_activated boolean      NOT NULL,
  check_result check_result NULL,
  CONSTRAINT uber_partners_pkey           PRIMARY KEY (id),
  CONSTRAINT uber_partners_user_fkey      FOREIGN KEY (user_id)    REFERENCES auth_user (id) ON DELETE CASCADE,
  CONSTRAINT uber_partners_countries_fkey FOREIGN KEY (country_id) REFERENCES nomenclatures_country (id)
)