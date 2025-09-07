import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupVerifyMemberTimeoutUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Verify member timeout.
     * @param {string} groupId - group id.
     * @param {string} memberId - member id.
     * @returns {Promise<Result>} Result
    */
    async execute(groupId, memberId) {
        const memberTimeout = await this.#_repository.memberTimeoutVerifyAsync(groupId, memberId);

        return Result.success("Verificação concluida.", memberTimeout);
    }
}
