import { Member } from "../../../domain/entities/Member.js";
import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberCreateUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Validates the request and returns a new member.
     * @param {string} groupId - group id.
     * @param {object} request - Member create request.
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, request) {
        const member = await this.#_repository.getByIdAsync(request.id);
        if (member) {
            const memberAssociation = await this.#_repository.getByGroupId(groupId, request.id);
            if (!memberAssociation) {
                const newMemberToGroup = new MemberToGroup(request.id, groupId);
                newMemberToGroup.setXpRequired(newMemberToGroup.level);

                await this.#_repository.addMemberToGroupAsync(newMemberToGroup);

                return Result.success("Membro adiconado ao grupo com successo.", null);
            }

            return Result.failure("Membro já existe.", null)
        };

        const newMember = new Member(request.id, request.name);

        const newMemberToGroup = new MemberToGroup(newMember.id, groupId);
        newMemberToGroup.setXpRequired(newMemberToGroup.level);

        await this.#_repository.addAsync(newMember);
        await this.#_repository.addMemberToGroupAsync(newMemberToGroup);

        return Result.success("Membro criado com successo.", newMember);
    }
}
