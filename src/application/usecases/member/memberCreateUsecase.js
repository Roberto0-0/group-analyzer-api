import { Member } from "../../../domain/entities/Member.js";
import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";
import { MemberCreateRequest } from "../../requests/memberCreateRequest.js";

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
     * @param {MemberCreateRequest} request - Member create request.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>} Result.
    */
    async execute(request, groupId) {
        const memberExist = await this.#_repositoy.getByIdAsync(request.id);
        if (memberExist) return Result.failure("Membro já existe.", null);

        const newMember = new Member(request.id, request.name);

        const newMemberToGroup = new MemberToGroup(newMember.id,groupId);

        await this.#_repositoy.addAsync(newMember);
        await this.#_repositoy.addMemberToGroupAsync(newMemberToGroup);

        return Result.success("Membro criado com successo.", newMember);
    }
}
