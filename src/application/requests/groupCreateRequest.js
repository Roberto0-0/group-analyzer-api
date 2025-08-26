export class GroupCreateRequest {
    /**
    * @param {string} id - group id.
    * @param {string} subject - group subject.
    * @param {string} ownerId - owner group id.
    * @param {number} memberCount - group member count.
    * @param {number} createdAt - creation group timestamp.
    */
    constructor(
        id,
        subject,
        ownerId,
        memberCount,
        createdAt,
    ) {
        this.id = id;
        /** @type {string}*/
        this.subject = subject;
        /** @type {string}*/
        this.ownerId = ownerId;
        /** @type {number}*/
        this.memberCount = memberCount;
        /** @type {number}*/
        this.createdAt = createdAt;
    }
}
