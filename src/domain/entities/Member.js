export class Member {
    /**
    * @param {string} id - member id.
    * @param {string} name - member name id.
    */
    constructor(
        id,
        name,
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.name = name;
        /** @type {string} */
        this.shortName;

        this.#setShortName();
    }

    /** 
     * Set name
     * @param {string} newName
     * @returns {void} 
     */
    setName(newName) {
        this.name = newName;
        this.#setShortName();
    }

    /** 
     * Set short name.
     * @returns {void} void
     */
    #setShortName() {
        this.shortName = (this.name.includes(" ")) ? this.name.split(" ")[0] : this.name;
    }
}
