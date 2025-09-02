import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js"

export class GroupGetMembersUsecase {
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
     * Returns group members.
     * @param {string} id - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupMembers = await this.#_repositoy.getMembers(id);
        if (groupMembers.length < 1) Result.success("Nenhum membro foi encontrado", []);

        return Result.success(`${groupMembers.length} membro's encontrado's`, groupMembers);
    }
}
