import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";
import { MemberCreateRequest } from "../../requests/memberCreateRequest.js";

export class MemberJoinToGroupUsecase {
    /**
     * @property {MemberSQLiteRespository} _memberRepository - member SQLite repository.
     * @property {GroupSQLiteRespository} _groupRepository - group SQLite repository.
     */
    #_memberRepositoy;
    #_groupRepository;

    /**
     * @param {MemberSQLiteRespository} memberRepository - member SQLite repository.
     * @param {GroupSQLiteRespository} groupRepository - SQLite repository.
     */
    constructor(memberRepository, groupRepository) {
        /** @type {MemberSQLiteRespository}*/
        this.#_memberRepositoy = memberRepository;
        /** @type {GroupSQLiteRespository}*/
        this.#_groupRepository = groupRepository;
    }

    /**
     * Validates the request and join member to group.
     * @param {string} memberId - member id 
     * @param {string} groupId  - group id
     * @returns {Promise<Result>} Result.
    */
    async execute(memberId, groupId) {
        const group = await this.#_groupRepository.getByIdAsync(groupId);
        if (!group) return Result.failure("Grupo não encontrado.", null);

        const memberToGroup = await this.#_memberRepositoy.getByGroupId(memberId, groupId);
        if (memberToGroup) return Result.failure("O membro já está neste grupo.", null);

        const newMemberToGroup = new MemberToGroup(memberId, groupId);

        await this.#_memberRepositoy.addMemberToGroupAsync(newMemberToGroup);

        return Result.success("Membro adicionado ao grupo.", null);
    }
}
