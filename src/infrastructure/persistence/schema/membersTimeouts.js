import { pgTable, index, primaryKey } from "drizzle-orm/pg-core";
import * as types from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { groups } from "./group.js";
import { members } from "./member.js";

export const membersTimeouts = pgTable(
    "members_timeouts",
    {
        groupId: types.varchar("group_id")
            .references(() => groups.id, { onDelete: "cascade" })
            .notNull(),
        memberId: types.varchar("member_id")
            .references(() => members.id, { onDelete: "cascade" })
            .notNull(),
        expiresIn: types.bigint("expires_in", { mode: "number" }).notNull(),
        reason: types.text("reason")
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
