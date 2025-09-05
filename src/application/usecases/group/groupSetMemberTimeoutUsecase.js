import { MemberTimeout } from "../../../domain/valueObject/MemberTimeout.js";
import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupSetMemberTimeoutUsecase {
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
     * Define timeout for member.
     * @param {string} groupId - group id.
     * @param {string} memberId - member id.
     * @param {object} request
     * @returns {Promise<Result>} Result
    */
    async execute(groupId, memberId, request) {
        const [group, member, timeout] = await Promise.all([
            this.#_groupRepository.getByIdAsync(groupId),
            this.#_memberRepositoy.getByIdAsync(memberId),
            this.#_groupRepository.memberTimeoutVerify(groupId, memberId),
        ]);

        if (!group) return Result.failure("Grupo não encontrado.", null);
        if (!member) return Result.failure("Membro não encontrado.", null);
        if (timeout) return Result.failure("Este membro já está em um timeout.", null);

        const newSetTimeout = new MemberTimeout(
            groupId,
            memberId,
            request.timeRef,
            request.reason,
        );

        await this.#_groupRepository.addMemberTimeoutAsync(newSetTimeout);

        return Result.success("Timeout definido com sucesso.", newSetTimeout);
    }
}
