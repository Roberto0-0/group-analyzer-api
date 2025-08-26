import { Group } from "../../../domain/entities/Group.js";
import { GroupInMemoryRespository } from "../../../infrastructure/repositories/groupInMemoryRespository.js";

export class GroupGetById {
    /** @property {GroupInMemoryRespository} _repository*/
    #_repository;

    /** @param {GroupInMemoryRespository} repository */
    constructor(repository) {
        this.#_repository = repository;
    }

    /**
     * Get group by id.
     * @param {string} id - group id.
     * @returns {(Group|null)} Group or null.
     */
    execute(id) {
        return this.#_repository.getById(id);
    }
}
