import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupNameUpdateUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Check and update the subject, if the group exists. 
     * @param {string} id - group id. 
     * @param {string} newName - new group subject. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, newName) {
        const groupExist = await this.#_repository.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repository.nameUpdateAsync(id, newName);

        return Result.success("Nome do grupo atualizado.", null);
    }
}
