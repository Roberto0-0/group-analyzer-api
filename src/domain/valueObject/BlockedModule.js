export class BlockedModule {
    /**
     * @param {string} groupId - group id.
     * @param {string} moduleName - module name.
    */
    constructor(groupId, moduleName) {
        /** @type {string} */
        this.groupId = groupId;
        /** @type {string} */
        this.moduleName = moduleName.toLowerCase();
        /** @type {number} */
        this.createdAt = Date.now();
    }
}
