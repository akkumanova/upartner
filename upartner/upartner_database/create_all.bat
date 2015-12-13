@psql -p 8000 --username postgres -f create_database.sql
@psql -p 8000 -d upartner --username postgres -f create_tables.sql