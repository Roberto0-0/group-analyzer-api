CREATE TABLE "blocked_modules" (
	"group_id" varchar NOT NULL,
	"module_name" varchar NOT NULL,
	"created_at" bigint NOT NULL,
	CONSTRAINT "blocked_modules_group_id_pk" PRIMARY KEY("group_id"),
	CONSTRAINT "blocked_modules_module_name_unique" UNIQUE("module_name")
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"member_count" integer NOT NULL,
	"created_at" bigint NOT NULL,
	"registered_at" bigint NOT NULL,
	CONSTRAINT "groups_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"short_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members_timeouts" (
	"group_id" varchar NOT NULL,
	"member_id" varchar NOT NULL,
	"expires_in" bigint NOT NULL,
	"reason" text,
	CONSTRAINT "members_timeouts_group_id_member_id_pk" PRIMARY KEY("group_id","member_id")
);
--> statement-breakpoint
CREATE TABLE "members_to_groups" (
	"member_id" varchar NOT NULL,
	"gorup_id" varchar NOT NULL,
	"level" integer NOT NULL,
	"xp" bigint NOT NULL,
	"xp_required" bigint NOT NULL,
	"message_count" bigint NOT NULL,
	"last_message_at" bigint NOT NULL,
	CONSTRAINT "members_to_groups_gorup_id_member_id_pk" PRIMARY KEY("gorup_id","member_id")
);
--> statement-breakpoint
ALTER TABLE "blocked_modules" ADD CONSTRAINT "blocked_modules_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members_timeouts" ADD CONSTRAINT "members_timeouts_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members_timeouts" ADD CONSTRAINT "members_timeouts_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members_to_groups" ADD CONSTRAINT "members_to_groups_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members_to_groups" ADD CONSTRAINT "members_to_groups_gorup_id_groups_id_fk" FOREIGN KEY ("gorup_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "group_blocked_module_idx" ON "blocked_modules" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "group_timeouts_idx" ON "members_timeouts" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "member_timoutes_idx" ON "members_timeouts" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "member_to_grupo_idx" ON "members_to_groups" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "group_to_member_idx" ON "members_to_groups" USING btree ("gorup_id");