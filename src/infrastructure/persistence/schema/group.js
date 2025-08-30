import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as types from "drizzle-orm/sqlite-core";

export const groups = sqliteTable(
    "groups",
    {
        id: types.text("id", { length: 255 }).unique().notNull().primaryKey(),
        subject: types.text("subject", { length: 255 }).notNull(),
        ownerId: types.text("owner_id", { length: 255 }).notNull(),
        memberCount: types.integer("member_count").notNull(),
        messageCount: types.integer("message_count").notNull(),
        createdAt: types.integer("created_at", { mode: "number" }).notNull(),
        registeredAt: types.integer("registered_at", { mode: "number" }).notNull()
    }
);
