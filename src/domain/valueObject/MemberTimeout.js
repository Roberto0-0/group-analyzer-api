export class MemberTimeout {
    /**
     * @param {string} groupId - group id.
     * @param {string} memberId - member id.
     * @param {string} timeRef - refernce of timeout 1h.
     * @param {?string} reason - timeout reason or null.
    */

    constructor(
        groupId,
        memberId,
        timeRef,
        reason = null
    ) {
        /** @type {string} */
        this.groupId = groupId;
        /** @type {string} */
        this.memberId = memberId;
        /** @type {number} */
        this.expiresIn;
        /** @type {?string} */
        this.reason = reason;

        this.#applyDuration(timeRef);
    }
    /**
    * Apply timeout duration.
    * @param {string} timeRef 
    * @returns {void}
    */
    #applyDuration(timeRef) {
        let time = parseInt(timeRef, 10);
        let type = timeRef.replace(/[0-9]/g, "").toLowerCase();
        let duration;

        const types = {
            "s": 60,
            "m": 60,
            "h": 24,
            "d": 7
        }

        if (types[type]) {
            const timeLimite = types[type];
            time = (time > timeLimite) ? timeLimite : time;
        }

        switch (type) {
            case "s": duration = time * 1000; break;
            case "m": duration = time * 60 * 1000; break;
            case "h": duration = time * 60 * 60 * 1000; break;
            case "d": duration = time * 24 * 60 * 60 * 1000; break;
            default: duration = 30 * 60 * 1000; break;
        }

        this.expiresIn = Date.now() + duration;
    }
}
