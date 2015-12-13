CREATE TABLE nomenclatures_country
(
  id           serial       NOT NULL,
  name         varchar(200) NOT NULL,
  code         varchar(10)  NOT NULL,
  CONSTRAINT nomenclatures_country_pkey PRIMARY KEY (id),
  CONSTRAINT nomenclatures_country_code UNIQUE (code)
)