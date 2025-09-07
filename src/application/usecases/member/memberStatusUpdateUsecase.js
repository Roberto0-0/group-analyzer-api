import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberStatusUpdateUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Get member by id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @param {object} request - member update request.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, groupId, request) {
        await this.#_repository.statusUpdateAsync(id, groupId, request);
        return Result.success("Status atualizado com sucesso.", null);
    }
}
