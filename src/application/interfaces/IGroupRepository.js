// @ts-nocheck
import { Group } from "../../domain/entities/Group.js";
import { BlockedModule } from "../../domain/valueObject/BlockedModule.js";
import { MemberTimeout } from "../../domain/valueObject/MemberTimeout.js";

/** @interface*/
export class IGroupRepository {
    /**
     * @param {Group} _group
     * @returns {Promise<void>}
     */
    async addAsync(_group) { }

    /**
     * @param {string} _id 
     * @returns {Promise<Group|null>} Group or null.
     */
    async getByIdAsync(_id) { }

    /**
     * @returns {Promise<Array<Group>|Array>} Group or []
     */
    async getAllAsync() { }

    /**
     * @param {string} _groupId
     * @returns {Promise<Array<GroupGetMembersDTO>|Array>} MemberGetByGroupDTO or []
     */
    async getMembers(_groupId) { }

    /**
     * @param {string} _id
     * @param {string} _newName 
     * @returns {Promise<void>} void 
     */
    async nameUpdateAsync(_id, _newName) { }

    /**
     * @param {string} _id
     * @param {number} _newMemberCount
     */
    async memberCountUpdateAsync(_id, _newMemberCount) { }

    /**
     * @param {string} _id
     */
    async deleteByIdAsync(_id) { }

    /**
     * @param {MemberTimeout} _memberTimeout
     */
    async addMemberTimeoutAsync(_memberTimeout) { }

    /**
     * @param {string} _groupId 
     * @param {string} _memberId 
     * @returns {Promise<boolean>}
     */
    async memberTimeoutVerifyAsync(_groupId, _memberId) { }

    /**
     * @param {BlockedModule} _blockedModule
    */
    async blockModuleAsync(_blockedModule) { }

    /**
     * Get module.
     * @param {string} _groupId
     * @param {string} _moduleName 
     * @return {Promise<BlockedModule>}
    */
    async getModuleByNameAsync(_groupId, _moduleName) { }

    /**
     * @param {string} _groupId 
     * @param {string} _moduleName 
     * @return {Promise<void>}
    */
    async unBlockModuleAsync(_groupId, _moduleName) { }
}
