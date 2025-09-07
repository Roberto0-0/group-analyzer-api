import { pgTable } from "drizzle-orm/pg-core";
import * as types from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { membersToGroups } from "./membersToGroups.js";
import { membersTimeouts } from "./membersTimeouts.js";
import { blockedModules } from "./blockedModules.js";

export const groups = pgTable(
    "groups",
    {
        id: types.varchar("id").unique().notNull().primaryKey(),
        name: types.varchar("name").notNull(),
        memberCount: types.integer("member_count").notNull(),
        createdAt: types.bigint("created_at", { mode: "number" }).notNull(),
        registeredAt: types.bigint("registered_at", { mode: "number" }).notNull()
    }
);

export const groupRelations = relations(groups, ({ many }) => ({
    membersToGroups: many(membersToGroups),
    membersTimeouts: many(membersTimeouts),
    blockedModules: many(blockedModules)
}));
