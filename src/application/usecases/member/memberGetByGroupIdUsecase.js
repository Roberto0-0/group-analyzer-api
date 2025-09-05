import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberGetByGroupIdUsecase {
    /**@property {MemberSQLiteRespository} _memberRepository - member SQLite repository.*/
    #_memberRepositoy;

    /** @param {MemberSQLiteRespository} memberRepository - member SQLite repository.*/
    constructor(memberRepository) {
        /** @type {MemberSQLiteRespository}*/
        this.#_memberRepositoy = memberRepository;
    }

    /**
     * Get member by group id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, groupId) {
        const member = await this.#_memberRepositoy.getByGroupId(id, groupId);
        if (!member) return Result.failure("Membro para o grupo não encontrado.", null);

        return Result.success("Membro para o grupo encontrado.", member);
    }
}
