import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as types from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { membersToGroups } from "./membersToGroups.js";
import { membersTimeouts } from "./membersTimeouts.js";

export const members = sqliteTable(
    "members",
    {
        id: types.text("id", { length: 255 }).notNull().primaryKey(),
        name: types.text("name", { length: 255 }).notNull(),
        shortName: types.text("short_name", { length: 255 }).notNull() 
    }
);

export const membersRelations = relations(members, ({ many }) => ({
    membersToGroups: many(membersToGroups),
    membersTimeouts: many(membersTimeouts)
}));

