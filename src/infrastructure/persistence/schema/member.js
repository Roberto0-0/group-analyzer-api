import { pgTable } from "drizzle-orm/pg-core";
import * as types from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { membersToGroups } from "./membersToGroups.js";
import { membersTimeouts } from "./membersTimeouts.js";

export const members = pgTable(
    "members",
    {
        id: types.varchar("id").notNull().primaryKey(),
        name: types.varchar("name").notNull(),
        shortName: types.varchar("short_name").notNull() 
    }
);

export const membersRelations = relations(members, ({ many }) => ({
    membersToGroups: many(membersToGroups),
    membersTimeouts: many(membersTimeouts)
}));

