CREATE TABLE `groups` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`subject` text(255) NOT NULL,
	`owner_id` text(255) NOT NULL,
	`member_count` integer NOT NULL,
	`message_count` integer NOT NULL,
	`created_at` integer NOT NULL,
	`registered_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `groups_id_unique` ON `groups` (`id`);