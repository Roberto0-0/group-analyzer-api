import { pgTable, index, primaryKey } from "drizzle-orm/pg-core";
import * as types from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { groups } from "./group.js";

export const blockedModules = pgTable(
    "blocked_modules",
    {
        groupId: types.varchar("group_id")
            .references(() => groups.id, { onDelete: "cascade" })
            .notNull(),
        moduleName: types.varchar("module_name").unique().notNull(),
        createdAt: types.bigint("created_at", { mode: "number" }).notNull()
    },
    (table) => [
        index("group_blocked_module_idx").on(table.groupId),
        primaryKey({ columns: [table.groupId] })
    ]
);

export const blockedModulesRelations = relations(blockedModules, ({ one }) => ({
    group: one(groups, {
        fields: [blockedModules.groupId],
        references: [groups.id]
    })
}));
