-- Database name: "painless_panes"

-- For cookie session (required by connect-pg-simple)
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- For email authentication
CREATE TABLE "user" (
  "id" BIGSERIAL PRIMARY KEY,
  "email" VARCHAR(345) UNIQUE NOT NULL
);

-- project table init
CREATE TABLE "project" (
  "id" BIGSERIAL PRIMARY KEY,
  "zip" VARCHAR(10),
  "user_id" BIGINT REFERENCES "user" NOT NULL,
  "submitted" BOOLEAN,
  "date" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- SELECT * FROM "project";

-- frame table init
CREATE TABLE "frame" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80),
  "description" TEXT,
  "image" TEXT -- this is open for discussion but will probably contain a hash/something that can identify the S3 bucket where we will store the image. can also potentially 
);			 -- just be a path to a local image

INSERT INTO "frame" (name, description, image)
VALUES 
('Awning', 'A casement frame', '/Awning.jpg'),
('Bay', 'A casement frame', '/Bay.jpg'),
('Casement', 'A casement frame', '/Casement.jpg'),
('Single hung', 'A single or double hung frame', '/Single_Hung.jpg'),
('Double hung', 'A single or double hung frame', '/Double_Hung.jpg'),
('Egress (basement)', 'An egress frame', '/Egress.jpg'),
('Fixed', 'A non-opening frame', '/Fixed.jpg');

-- SELECT * FROM "frame";

-- window table init
CREATE TABLE "window" (
  "id" BIGSERIAL PRIMARY KEY,
  "image" TEXT, -- link to stored image in S3 || hash value of image
  "annotated_image" TEXT, -- link to stored image in S3 || hash value of image
  "height" INT, -- for both height and width, we can discuss what the proper precision is/if decimals are needed
  "width" INT,
  "desired_frame_id" INT REFERENCES "frame",
  "project_id" BIGINT REFERENCES "project" NOT NULL
);