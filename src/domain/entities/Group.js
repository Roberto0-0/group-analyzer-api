export class Group {
    /**
    * @param {string} id - group id.
    * @param {string} name - group name.
    * @param {number} memberCount - group member count.
    * @param {number} createdAt - group creation timestamp.
    */
    constructor(
        id,
        name,
        memberCount,
        createdAt
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.name = name;
        /** @type {number} */
        this.memberCount = memberCount;
        /** @type {number} */
        this.createdAt = createdAt;
        /** @type {number} */
        this.registeredAt = Date.now();
    }
}
