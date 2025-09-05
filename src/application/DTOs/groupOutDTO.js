export class GroupOutDTO {
    /**
    * @param {string} id - group id.
    * @param {string} name - group name.
    * @param {number} memberCount - group member count.
    * @param {number} messageCount - group message count.
    * @param {number} createdAt - group creation timestamp.
    * @param {number} registeredAt - group registered timestamp.
    */
    constructor(
        id,
        name,
        memberCount,
        messageCount,
        createdAt,
        registeredAt
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.name = name;
        /** @type {number} */
        this.memberCount = memberCount;
        /** @type {number} */
        this.messageCount = messageCount;
        /** @type {number} */
        this.createdAt = createdAt;
        /** @type {number} */
        this.registeredAt = registeredAt;
    }
}
