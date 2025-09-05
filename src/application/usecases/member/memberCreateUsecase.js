import { Member } from "../../../domain/entities/Member.js";
import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { membersToGroups } from "../../../infrastructure/persistence/schema/membersToGroups.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberCreateUsecase {
    /**
     * @property {MemberQLiteRespository} _repository - SQLite repository.
     */
    #_repositoy;

    /**
     * @param {MemberSQLiteRespository} repository - SQLite repository.
     */
    constructor(repository) {
        /** @type {MemberSQLiteRespository}*/
        this.#_repositoy = repository;
    }

    /**
     * Validates the request and returns a new member.
     * @param {string} groupId - group id.
     * @param {object} request - Member create request.
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, request) {
        const member = await this.#_repositoy.getByIdAsync(request.id);
        if (member) {
            const memberAssociation = await this.#_repositoy.getByGroupId(groupId, request.id);
            if (!memberAssociation) {
                const newMemberToGroup = new MemberToGroup(request.id, groupId);
                newMemberToGroup.setXpRequired(newMemberToGroup.level);

                await this.#_repositoy.addMemberToGroupAsync(newMemberToGroup);

                return Result.success("Membro adiconado ao grupo com successo.", null);
            }

            return Result.failure("Membro já existe.", null)
        };

        const newMember = new Member(request.id, request.name);

        const newMemberToGroup = new MemberToGroup(newMember.id, groupId);
        newMemberToGroup.setXpRequired(newMemberToGroup.level);

        await this.#_repositoy.addAsync(newMember);
        await this.#_repositoy.addMemberToGroupAsync(newMemberToGroup);

        return Result.success("Membro criado com successo.", newMember);
    }
}
