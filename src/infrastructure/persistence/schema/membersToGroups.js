import { sqliteTable, index } from "drizzle-orm/sqlite-core";
import * as types from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { members } from "./member.js";
import { groups } from "./group.js";

export const membersToGroups = sqliteTable(
    "members_to_groups",
    {
        memberId: types.text("member_id", { length: 255 })
            .notNull()
            .references(() => members.id, { onDelete: "cascade" }),
        groupId: types.text("gorup_id", { length: 255 })
            .notNull()
            .references(() => groups.id, { onDelete: "cascade" }),
        level: types.integer("level", { mode: "number" }).notNull(),
        xp: types.integer("xp", { mode: "number" }).notNull(),
        requiredXp: types.integer("required_xp", { mode: "number" }).notNull(),
        messageCount: types.integer("message_count", { mode: "number" }).notNull(),
        lastMessageAt: types.integer("last_message_at", { mode: "number" }).notNull(),
    },
    (table) => [
        index("member_idx").on(table.memberId),
        index("group_idx").on(table.groupId)
    ]
);

export const membersToGroupRelations = relations(membersToGroups, ({ one }) => ({
    member: one(members, {
        fields: [membersToGroups.memberId],
        references: [members.id]
    }),
    group: one(groups, {
        fields: [membersToGroups.groupId],
        references: [groups.id]
    }),
}));
