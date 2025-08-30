import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupMemberCountUpdateUsecase {
    /**
     * @property {GroupSQLiteRespository} _repository - SQLite repository.
     */
    #_repositoy;

    /**
     * @param {GroupSQLiteRespository} repository - SQLite repository.
     */
    constructor(repository) {
        /** @type {GroupSQLiteRespository}*/
        this.#_repositoy = repository;
    }

    /**
     * Check and update the member count, if the group exists. 
     * @param {string} id - group id. 
     * @param {number} newMemberCount - new group member count. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, newMemberCount) {
        const groupExist = await this.#_repositoy.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repositoy.memberCountUpdateAsync(id, newMemberCount);

        return Result.success("Contagem de membros atualizado.", null);
    }
}
