import { and, eq, sql } from "drizzle-orm";
import { IGroupRepository } from "../../application/interfaces/IGroupRepository.js";
import { Group } from "../../domain/entities/Group.js";
import { db } from "../persistence/dbContext.js";
import { groups } from "../persistence/schema/group.js";
import { membersToGroups } from "../persistence/schema/membersToGroups.js";
import { GroupOutDTO } from "../../application/DTOs/groupOutDTO.js";
import { GroupGetMembersDTO } from "../../application/DTOs/groupGetMembersDTO.js";
import { members } from "../persistence/schema/member.js";
import { MemberTimeout } from "../../domain/valueObject/MemberTimeout.js";
import { membersTimeouts } from "../persistence/schema/membersTimeouts.js";
import { BlockedModule } from "../../domain/valueObject/BlockedModule.js";
import { blockedModules } from "../persistence/schema/blockedModules.js";

/** @implements {IGroupRepository} */
export class GroupPgRepository {
    /**
     * Add group in SQLite db.
     * @param {Group} group
     * @returns {Promise<void>} void.
     */
    async addAsync(group) {
        await db.insert(groups).values({
            id: group.id,
            name: group.name,
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
            name: groups.name,
            memberCount: groups.memberCount,
            createdAt: groups.createdAt,
            registeredAt: groups.registeredAt,
        }).from(groups).where(eq(groups.id, id));

        if (!group[0]) return null;

        const result = await db.select({
            messageCount: sql`SUM(${membersToGroups.messageCount})`.mapWith(Number)
        }).from(membersToGroups).where(eq(membersToGroups.groupId, id))

        return new GroupOutDTO(
            group[0].id,
            group[0].name,
            group[0].memberCount,
            result[0].messageCount,
            group[0].createdAt,
            group[0].registeredAt
        );
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
     * group name update. 
     * @param {string} id - group id.
     * @param {string} newName - new group name.
     * @returns {Promise<void>} void 
     */
    async nameUpdateAsync(id, newName) {
        await db.update(groups).set({ name: newName }).where(eq(groups.id, id));
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

    /**
     * Add member timeout.
     * @param {MemberTimeout} memberTimeout
     * @returns {Promise<void>}
     */
    async addMemberTimeoutAsync(memberTimeout) {
        await db.insert(membersTimeouts).values({
            groupId: memberTimeout.groupId,
            memberId: memberTimeout.memberId,
            expiresIn: memberTimeout.expiresIn,
            reason: memberTimeout.reason,
        });
    }

    /**
     * Check if the member is in timeout.
     * @param {string} groupId - group id. 
     * @param {string} memberId - member id. 
     * @returns {Promise<boolean>}
     */
    async memberTimeoutVerifyAsync(groupId, memberId) {
        const memberTimeout = await db.select()
            .from(membersTimeouts)
            .where(and(
                eq(membersTimeouts.groupId, groupId),
                eq(membersTimeouts.memberId, memberId),
            ))

        if (!memberTimeout[0]) return false;
        if (memberTimeout[0].expiresIn - Date.now() > 0) return true;

        await db.delete(membersTimeouts)
            .where(and(
                eq(membersTimeouts.groupId, groupId),
                eq(membersTimeouts.memberId, memberId)
            ))

        return false
    }

    /**
     * Block module.
     * @param {BlockedModule} blockedModule
     * @return {Promise<void>} void
    */
    async blockModuleAsync(blockedModule) {
        await db.insert(blockedModules).values({
            groupId: blockedModule.groupId,
            moduleName: blockedModule.moduleName,
            createdAt: blockedModule.createdAt
        });
    }

    /**
     * Get module.
     * @param {string} groupId - group id.
     * @param {string} moduleName - module name. 
     * @return {Promise<BlockedModule>}
    */
    async getModuleByNameAsync(groupId, moduleName) {
        const blockedModule = await db.select()
            .from(blockedModules)
            .where(and(
                eq(blockedModules.groupId, groupId),
                eq(blockedModules.moduleName, moduleName)
            ));

        return (!blockedModule[0]) ? null : blockedModule[0];
    }

    /**
     * Unblock module.
     * @param {string} groupId - group id. 
     * @param {string} moduleName - module name. 
     * @return {Promise<void>} void
    */
    async unBlockModuleAsync(groupId, moduleName) {
        await db.delete(blockedModules).where(and(
            eq(blockedModules.groupId, groupId),
            eq(blockedModules.moduleName, moduleName),
        ));
    }
}
