CREATE TABLE django_content_type
(
  id        serial       NOT NULL,
  name      varchar(100) NOT NULL,
  app_label varchar(100) NOT NULL,
  model     varchar(100) NOT NULL,
  CONSTRAINT django_content_type_pkey PRIMARY KEY (id),
  CONSTRAINT django_content_type_applabel_model_key UNIQUE (app_label, model)
)