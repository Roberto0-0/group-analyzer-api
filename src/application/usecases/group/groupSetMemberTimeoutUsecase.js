import { MemberTimeout } from "../../../domain/valueObject/MemberTimeout.js";
import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupSetMemberTimeoutUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Define timeout for member.
     * @param {string} groupId - group id.
     * @param {string} memberId - member id.
     * @param {object} request
     * @returns {Promise<Result>} Result
    */
    async execute(groupId, memberId, request) {
        const newSetTimeout = new MemberTimeout(
            groupId,
            memberId,
            request.timeRef,
            request.reason,
        );

        await this.#_repository.addMemberTimeoutAsync(newSetTimeout);

        return Result.success("Timeout definido com sucesso.", newSetTimeout);
    }
}
