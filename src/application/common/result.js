/** @template T */

export class Result {
    /** @property {Boolena} */
    success;
    /** @property {T} */
    data;
    /** @property {string} */
    message
    /** @property {string[]} */
    errors;

    /**
     * @param {Boolean} status 
     * @param {T} value 
     * @param {string} message 
     * @param {string[]} errors 
     */
    constructor(status, value, message, errors) {
        this.success = status;
        this.data = value;
        this.message = message;
        this.errors = errors;
    }

    /**
     * @template T
     * @param {string} message
     * @param {T} value
     * @returns {Result<T>}
     */
    static success(message, value) {
        return new Result(true, value, message, null);
    }

    /**
     * @template T
     * @param {string[]} errors
     * @param {string} message
     * @returns {Result<T>}
     */
    static failure(message, errors) {
        return new Result(false, null, message, errors);
    }
}
