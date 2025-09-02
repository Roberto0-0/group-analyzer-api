import { eq, sql } from "drizzle-orm";
import { db } from "../persistence/dbContext.js";
import { groups } from "../persistence/schema/group.js";
import { Group } from "../../domain/entities/Group.js";
import { members } from "../persistence/schema/member.js";
import { membersToGroups } from "../persistence/schema/membersToGroups.js";
import { GroupGetMembersDTO } from "../../application/DTOs/groupGetMembersDTO.js";

export class GroupSQLiteRespository {
    /**
     * Add group in SQLite db.
     * @param {Group} group
     * @returns {Promise<void>} void.
     */
    async addAsync(group) {
        await db.insert(groups).values({
            id: group.id,
            subject: group.subject,
            ownerId: group.ownerId,
            memberCount: group.memberCount,
            createdAt: group.createdAt,
            registeredAt: group.registeredAt
        });
    }

    /**
     * get group by id. 
     * @param {string} id 
     * @returns {Promise<Group|null>} Group or null.
     */
    async getByIdAsync(id) {
        const group = await db.select({
            id: groups.id,
            subject: groups.subject,
            ownerId: groups.ownerId,
            memberCount: groups.memberCount,
            messageCount: sql`count(${membersToGroups.messageCount})`.as("message_count"),
            createdAt: groups.createdAt,
            registeredAt: groups.registeredAt,
        })
            .from(groups)
            .innerJoin(membersToGroups, eq(membersToGroups.groupId, id))
            .where(eq(groups.id, id));

        return group[0] || null;
    }

    /**
     * get all group. 
     * @returns {Promise<Array<Group>|Array>} Group or []
     */
    async getAllAsync() {
        return await db.select().from(groups) || [];
    }

    /**
     * Get group members. 
     * @param {string} groupId - group id.
     * @returns {Promise<Array<GroupGetMembersDTO>|Array>} MemberGetByGroupDTO or []
     */
    async getMembers(groupId) {
        const groupMembers = await db.select({
            id: members.id,
            groupId: membersToGroups.groupId,
            shortName: members.shortName,
            messageCount: membersToGroups.messageCount,
            lastMessageAt: membersToGroups.lastMessageAt
        }).from(groups)
            .innerJoin(membersToGroups, eq(groups.id, membersToGroups.groupId))
            .innerJoin(members, eq(members.id, membersToGroups.memberId))
            .where(eq(groups.id, groupId));

        return (groupMembers.length > 0) ? groupMembers.map(member => new GroupGetMembersDTO(
            member.id,
            member.groupId,
            member.shortName,
            member.messageCount,
            member.lastMessageAt
        )) : [];
    }

    /**
     * group subject update. 
     * @param {string} id - group id.
     * @param {string} newSubject - new group subject.
     * @returns {Promise<void>} void 
     */
    async subjectUpdateAsync(id, newSubject) {
        await db.update(groups).set({ subject: newSubject }).where(eq(groups.id, id));
    }

    /**
     * group member count update. 
     * @param {string} id - group id.
     * @param {number} newMemberCount - new member count.
     * @returns {Promise<void>} void 
     */
    async memberCountUpdateAsync(id, newMemberCount) {
        await db.update(groups).set({ memberCount: newMemberCount }).where(eq(groups.id, id));
    }

    /**
     * Delete grup by id. 
     * @param {string} id - group id.
     * @returns {Promise<void>} void
     */
    async deleteByIdAsync(id) {
        await db.delete(groups).where(eq(groups.id, id));
    }
}
