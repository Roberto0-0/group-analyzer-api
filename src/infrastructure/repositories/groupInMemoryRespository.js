import { Group } from "../../domain/entities/Group.js";

export class GroupInMemoryRespository {
    constructor() {
        this.storage = new Map();
    }

    /**
     * Add group in storage.
     * @param {Group} group
     * @returns {void} void.
     */
    create(group) {
        this.storage.set(group.id, group);
    }

    /**
     * get group by id. 
     * @param {string} id 
     * @returns {(Group|null)} Group or null.
     */
    getById(id) {
        const group = this.storage.get(id);
        return group || null;
    }

    /**
     * get all group. 
     * @returns {(Map<Group>|Array)}
     */
    getAll() {
        return this.storage || [];
    }
}
