import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberGetByGroupIdUsecase {
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
     * Get member by group id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, groupId) {
        const group = await this.#_groupRepository.getByIdAsync(groupId);
        if (!group) return Result.failure("Grupo não encontrado.", null);

        const member = await this.#_memberRepositoy.getByGroupId(id, groupId);
        if (!member) return Result.failure("Membro para o grupo não encontrado.", null);

        return Result.success("Membro para o grupo encontrado.", member);
    }
}
