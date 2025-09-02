export class GroupGetMembersDTO {
    /**
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @param {string} shortName - member short name.
     * @param {number} messageCount - member message count.
     * @param {number} lastMessageAt - member last message timestamp.
     */
    constructor(
        id,
        groupId,
        shortName,
        messageCount,
        lastMessageAt
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.groupId = groupId;
        /** @type {string} */
        this.shortNeme = shortName;
        /** @type {number} */
        this.messageCount = messageCount;
        /** @type {number} */
        this.lastMessageAt = lastMessageAt;
    }
}
