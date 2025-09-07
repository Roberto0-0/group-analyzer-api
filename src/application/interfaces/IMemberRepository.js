// @ts-nocheck
import { Member } from "../../domain/entities/Member.js";
import { MemberToGroup } from "../../domain/valueObject/MemberToGroup.js";
import { MemberGetByGroupDTO } from "../DTOs/memberGetByGroupDTO.js";

/** @interface*/
export class IMemberRepository {
    /**
     * @param {Member} _member 
     * @returns {Promise<void>}
     */
    async addAsync(_member) { }

    /**
     * @param {string} _id 
     * @returns {Promise<Member|null>}
     */
    async getByIdAsync(_id) { }

    /**
     * @param {string} _id 
     * @param {string} _groupId 
     * @returns {Promise<MemberGetByGroupDTO|null>}
     */
    async getByGroupId(_id, _groupId) { }

    /**
     * @returns {Promise<Array<Member>|Array>}
     */
    async getAllAsync() { }

    /**
     * @param {string} _groupId
     * @returns {Promise<Array<MemberGetByGroupDTO>|Array>}
     */
    async getAllByGroupIdAsync(_groupId) { }

    /**
     * @param {string} _memberId
     * @param {string} _groupId
     * @returns {Promise<object|null>}
     */
    async getByAssociantion(_memberId, _groupId) { }

    /**
     * @param {string} _id
     * @returns {Promise<object>}
     */
    async getAssociationCount(_id) { }

    /**
     * @param {string} _id
     * @param {string} _newName 
     * @param {string} _newShortName 
     * @returns {Promise<void>} 
     */
    async nameUpdateAsync(_id, _newName, _newShortName) { }

    /**
     * @param {string} _id
     * @param {string} _groupId
     * @param {object} _request
     * @returns {Promise<void>} 
     */
    async statusUpdateAsync(_id, _groupId, _request) { }

    /**
     * @param {string} _id - member id.
     * @returns {Promise<void>} void
     */
    async deleteByIdAsync(_id) { }

    /**
     * @param {string} _id - member id.
     * @param {string} _groupId - group id.
     * @returns {Promise<void>} void
     */
    async deleteByGroupIdAsync(_id, _groupId) { }

    /**
     * @param {MemberToGroup} _memberToGroup - member to group.
     * @returns {Promise<void>} void
     */
    async addMemberToGroupAsync(_memberToGroup) { }
}
