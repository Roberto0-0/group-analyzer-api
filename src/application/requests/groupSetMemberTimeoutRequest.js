export class GroupSetMemberTimeoutRequest {
    /**
     * @param {string} timeRef - time reference 30m.
     * @param {?string} reason - timeout reason.
     */
    constructor(
        timeRef,
        reason = null,
    ) {
        /** @type {string}*/
        this.timeRef = timeRef;
        /** @type {?string}*/
        this.reason = reason;
    }
}
