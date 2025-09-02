export class MemberToGroup {
    /** 
     * @param {string} memberId - member id.
     * @param {string} groupId - group id.
     */

    constructor(memberId, groupId) {
        /** @type {string}*/
        this.memberId = memberId;
        /** @type {string}*/
        this.groupId = groupId;
        /** @type {number}*/
        this.level = 1;
        /** @type {number}*/
        this.xp = 0;
        /** @type {number}*/
        this.requiredXp;
        /** @type {number}*/
        this.messageCount = 1;
        /** @type {number}*/
        this.lastMessageAt = Date.now();

        this.#requiredXpCalculate();
    }

    /**
     * set level.
     * @param {number} newLevel - new member level.
     * @return {void} void
     */
    setRequiredXp(newLevel) {
        this.level = newLevel;
        this.#requiredXpCalculate();
    }

    /**
    * Calculate required xp.
    * @return {void} void
    */
    #requiredXpCalculate() {
        this.requiredXp = Math.floor(Math.pow(this.level, 2) * 10);
    }
}
