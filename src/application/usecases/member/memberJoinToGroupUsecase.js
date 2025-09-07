import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberJoinToGroupUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Validates the request and join member to group.
     * @param {string} memberId - member id 
     * @param {string} groupId  - group id
     * @returns {Promise<Result>} Result.
    */
    async execute(memberId, groupId) {
        const newMemberToGroup = new MemberToGroup(memberId, groupId);

        await this.#_repository.addMemberToGroupAsync(newMemberToGroup);

        return Result.success("Membro adicionado ao grupo.", null);
    }
}
