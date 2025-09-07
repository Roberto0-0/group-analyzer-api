import { Result } from "../../common/result.js"
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupDeleteByIdUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Check and delete the group, if it exists..
     * @param {string} id - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupExist = await this.#_repository.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repository.deleteByIdAsync(id);

        return Result.success("Grupo deletado com sucesso.", null);
    }
}
