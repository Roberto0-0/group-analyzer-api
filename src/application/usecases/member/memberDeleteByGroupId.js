import { Result } from "../../common/result.js"
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberDeleteByGroupIdUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Check and delete the member by group id, if it exists..
     * @param {string} id - member id. 
     * @param {string} groupId - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, groupId) {
        await this.#_repository.deleteByGroupIdAsync(id, groupId);

        return Result.success("Membro do grupo deletado com sucesso.", null);
    }
}
