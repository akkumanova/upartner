DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_database WHERE datname = 'upartner') THEN
    UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'upartner';

    PERFORM pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'upartner';
  END IF;
END;
$$