import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js"

export class MemberDeleteByGroupIdUsecase {
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
     * Check and delete the member by group id, if it exists..
     * @param {string} id - member id. 
     * @param {string} groupId - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, groupId) {
        const group = await this.#_groupRepository.getByIdAsync(groupId);
        if (!group) return Result.failure("Grupo não encontrado.", null);

        const member = await this.#_memberRepositoy.getByIdAsync(id);
        if (!member) return Result.failure("Membro não encontrado.", null);

        await this.#_memberRepositoy.deleteByGroupIdAsync(id, groupId);

        return Result.success("Membro do grupo deletado com sucesso.", null);
    }
}
