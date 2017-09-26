-- Primary drop entities --
DROP TABLE IF EXISTS job;
DROP FUNCTION IF EXISTS update_timestamp();
DROP TYPE IF EXISTS job_status;
DROP TYPE IF EXISTS job_type;
DROP TRIGGER IF EXISTS watch_status_trigger ON job;

-- Create additional fields types --
CREATE TYPE job_status AS ENUM ('waiting', 'pending','complete');
CREATE TYPE job_type AS ENUM ('feature','hotfix','deploy');

-- Create entity --
CREATE TABLE job (
  job_id      SERIAL PRIMARY KEY,
  title       TEXT,
  description TEXT,
  created     TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  modified    TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  type        JOB_TYPE,
  status      JOB_STATUS
);

-- Hangling events --
CREATE OR REPLACE FUNCTION update_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
     NEW.modified = now();
     RETURN NEW;
  END;
  $$ language 'plpgsql';

CREATE TRIGGER update_timestamp_trigger BEFORE UPDATE
  ON job FOR EACH ROW EXECUTE PROCEDURE
  update_timestamp();

CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
	DECLARE
		channel_name varchar DEFAULT 'watch_status';
    notification json;

	BEGIN
		IF TG_OP = 'UPDATE' AND OLD.status!= NEW.status THEN
        notification = json_build_object('id', OLD.job_id, 'status', NEW.status);
	  		PERFORM pg_notify(channel_name, notification::text);
		  	RETURN NEW;
		END IF;
    RETURN OLD;
	END;
	$$ LANGUAGE plpgsql;

CREATE TRIGGER watch_status_trigger AFTER UPDATE ON job
FOR EACH ROW EXECUTE PROCEDURE notify_trigger();