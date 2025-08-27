import { Group } from "../../../domain/entities/Group.js";
import { GroupInMemoryRespository } from "../../../infrastructure/repositories/groupInMemoryRespository.js";

export class GroupGetAllUsecase {
    /** @property {GroupInMemoryRespository} _repositoy */
    #_repository;

    /** @param {GroupInMemoryRespository} repository */
    constructor(repository) {
        this.#_repository = repository;
    }

    /** 
    * Get all groups.
    * @returns {Map<Group>|Array} Group[] or [].
    */
    execute() {
        return this.#_repository.getAll();
    }
}
