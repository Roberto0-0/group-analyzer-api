import { sqliteTable, index, primaryKey } from "drizzle-orm/sqlite-core";
import * as type from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { groups } from "./group.js";
import { members } from "./member.js";

export const membersTimeouts = sqliteTable(
    "members_timeouts",
    {
        groupId: type.text("group_id", { length: 255 })
            .references(() => groups.id, { onDelete: "cascade" })
            .notNull(),
        memberId: type.text("member_id", { length: 255 })
            .references(() => members.id, { onDelete: "cascade" })
            .notNull(),
        expiresIn: type.integer("expires_in", { mode: "number" }).notNull(),
        reason: type.text("reason", { length: 255 })
    },
    (table) => [
        index("group_timeouts_idx").on(table.groupId),
        index("member_timoutes_idx").on(table.memberId),
        primaryKey({ columns: [table.groupId, table.memberId]})
    ]
);

export const memberTimeoutsRelations = relations(membersTimeouts, ({ one }) => ({
    group: one(groups, {
        fields: [membersTimeouts.groupId],
        references: [groups.id]
    }),
    member: one(members, {
        fields: [membersTimeouts.memberId],
        references: [members.id]
    })
}));
