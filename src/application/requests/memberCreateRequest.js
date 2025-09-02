export class MemberCreateRequest {
    /**
    * @param {string} id - member id.
    * @param {string} name - member name.
    */
    constructor(
        id,
        name
    ) {
        this.id = id;
        /** @type {string}*/
        this.name = name;
    }
}
