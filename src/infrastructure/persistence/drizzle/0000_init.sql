CREATE TABLE `blocked_modules` (
	`group_id` text(255) NOT NULL,
	`module_name` text(255) NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blocked_modules_module_name_unique` ON `blocked_modules` (`module_name`);--> statement-breakpoint
CREATE INDEX `group_blocked_module_idx` ON `blocked_modules` (`group_id`);--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`subject` text(255) NOT NULL,
	`owner_id` text(255) NOT NULL,
	`member_count` integer NOT NULL,
	`created_at` integer NOT NULL,
	`registered_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `groups_id_unique` ON `groups` (`id`);--> statement-breakpoint
CREATE TABLE `members` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`short_name` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members_timeouts` (
	`group_id` text(255) NOT NULL,
	`member_id` text(255) NOT NULL,
	`expires_in` integer NOT NULL,
	`reason` text(255),
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `group_timeouts_idx` ON `members_timeouts` (`group_id`);--> statement-breakpoint
CREATE INDEX `member_timoutes_idx` ON `members_timeouts` (`member_id`);--> statement-breakpoint
CREATE TABLE `members_to_groups` (
	`member_id` text(255) NOT NULL,
	`gorup_id` text(255) NOT NULL,
	`level` integer NOT NULL,
	`xp` integer NOT NULL,
	`required_xp` integer NOT NULL,
	`message_count` integer NOT NULL,
	`last_message_at` integer NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`gorup_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `member_to_grupo_idx` ON `members_to_groups` (`member_id`);--> statement-breakpoint
CREATE INDEX `group_to_member_idx` ON `members_to_groups` (`gorup_id`);