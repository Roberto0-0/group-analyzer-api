export class MemberGetByIdDTO {
    /**
     * @param {string} id - member id.
     * @param {string} name - member name.
     */
    constructor(
        id,
        name,
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.name = name;
    }
}
