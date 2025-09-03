import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as types from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { membersToGroups } from "./membersToGroups.js";
import { membersTimeouts } from "./membersTimeouts.js";
import { blockedModules } from "./blockedModules.js";

export const groups = sqliteTable(
    "groups",
    {
        id: types.text("id", { length: 255 }).unique().notNull().primaryKey(),
        subject: types.text("subject", { length: 255 }).notNull(),
        ownerId: types.text("owner_id", { length: 255 }).notNull(),
        memberCount: types.integer("member_count").notNull(),
        createdAt: types.integer("created_at", { mode: "number" }).notNull(),
        registeredAt: types.integer("registered_at", { mode: "number" }).notNull()
    }
);

export const groupRelations = relations(groups, ({ many }) => ({
    membersToGroups: many(membersToGroups),
    membersTimeouts: many(membersTimeouts),
    blockedModules: many(blockedModules)
}));
