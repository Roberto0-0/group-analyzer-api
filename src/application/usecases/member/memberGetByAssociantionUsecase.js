import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberGetByAssociationUsacase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Get member by group id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, groupId) {
        const member = await this.#_repository.getByAssociantion(id, groupId);
        if (!member) return Result.failure("Associação não encontrada.", null);

        return Result.success("Associação encontrada.", member);
    }
}
