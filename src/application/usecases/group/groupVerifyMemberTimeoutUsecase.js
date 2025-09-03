import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupVerifyMemberTimeoutUsecase {
    /**
     * @property {GroupSQLiteRespository} _groupRepository - group SQLite repository.
     * @property {MemberSQLiteRespository} _memberRepository - member SQLite repository.
     */
    #_groupRepository;
    #_memberRepositoy;

    /**
     * @param {GroupSQLiteRespository} groupRepository - SQLite repository.
     * @param {MemberSQLiteRespository} memberRepository - member SQLite repository.
     */
    constructor(groupRepository, memberRepository) {
        /** @type {GroupSQLiteRespository}*/
        this.#_groupRepository = groupRepository;
        /** @type {MemberSQLiteRespository}*/
        this.#_memberRepositoy = memberRepository;
    }

    /**
     * Verify member timeout.
     * @param {string} groupId - group id.
     * @param {string} memberId - member id.
     * @returns {Promise<Result>} Result
    */
    async execute(groupId, memberId) {
        const [group, member] = await Promise.all([
            this.#_groupRepository.getByIdAsync(groupId),
            this.#_memberRepositoy.getByIdAsync(memberId)
        ]);

        if (!group) return Result.failure("Grupo não encontrado.", null);
        if (!member) return Result.failure("Membro não encontrado.", null);

        const memberTimeout = await this.#_groupRepository.memberTimeoutVerify(groupId, memberId);

        return Result.success("Verificação concluida.", memberTimeout);
    }
}
