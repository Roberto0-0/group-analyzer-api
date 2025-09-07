import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupGetByIdUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Get group by id.
     * @param {string} id - group id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id) {
        const group = await this.#_repository.getByIdAsync(id);
        if (!group) return Result.failure("Grupo não encontrado.", null);

        return Result.success("Grupo encontrado.", group);
    }
}
