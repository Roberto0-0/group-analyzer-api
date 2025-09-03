export class GroupOutDTO {
    /**
    * @param {string} id - group id.
    * @param {string} subject - group subject.
    * @param {string} ownerId - group owner id.
    * @param {number} memberCount - group member count.
    * @param {number} messageCount - group message count.
    * @param {number} createdAt - group creation timestamp.
    * @param {number} registeredAt - group registered timestamp.
    */
    constructor(
        id,
        subject,
        ownerId,
        memberCount,
        messageCount,
        createdAt,
        registeredAt
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.subject = subject;
        /** @type {string} */
        this.ownerId = ownerId;
        /** @type {number} */
        this.memberCount = memberCount;
        /** @type {number} */
        this.messsageCount = messageCount;
        /** @type {number} */
        this.createdAt = createdAt;
        /** @type {number} */
        this.registeredAt = registeredAt;
    }
}
