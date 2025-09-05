import { sqliteTable, index, primaryKey } from "drizzle-orm/sqlite-core";
import * as type from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { groups } from "./group.js";

export const blockedModules = sqliteTable(
    "blocked_modules",
    {
        groupId: type.text("group_id", { length: 255 })
            .references(() => groups.id, { onDelete: "cascade" })
            .notNull(),
        moduleName: type.text("module_name", { length: 255 }).unique().notNull(),
        createdAt: type.integer("created_at", { mode: "number" }).notNull()
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
