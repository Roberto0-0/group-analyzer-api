export class MemberGetByGroupDTO {
    /**
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @param {string} name - member name.
     * @param {string} shortName - member short name.
     * @param {number} level - member level.
     * @param {number} xp - member xp.
     * @param {number} requiredXp - member required xp.
     * @param {number} messageCount - member message count.
     * @param {number} lastMessageAt - member last message timestamp.
     */
    constructor(
        id,
        groupId,
        name,
        shortName,
        level,
        xp,
        requiredXp,
        messageCount,
        lastMessageAt
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.groupId = groupId;
        /** @type {string} */
        this.name = name;
        /** @type {string} */
        this.shortNeme = shortName;
        /** @type {number} */
        this.level = level;
        /** @type {number} */
        this.xp = xp;
        /** @type {number} */
        this.requiredXp = requiredXp;
        /** @type {number} */
        this.messageCount = messageCount;
        /** @type {number} */
        this.lastMessageAt = lastMessageAt;
    }
}
