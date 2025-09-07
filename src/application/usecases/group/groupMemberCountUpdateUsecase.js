import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupMemberCountUpdateUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Check and update the member count, if the group exists. 
     * @param {string} id - group id. 
     * @param {number} newMemberCount - new group member count. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, newMemberCount) {
        const groupExist = await this.#_repository.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repository.memberCountUpdateAsync(id, newMemberCount);

        return Result.success("Contagem de membros atualizado.", null);
    }
}
