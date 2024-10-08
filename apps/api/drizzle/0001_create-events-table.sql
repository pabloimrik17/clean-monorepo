CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"date" text,
	"location" text,
	"total_capacity" integer,
	"available_capacity" integer,
	"state" text
);
