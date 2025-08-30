import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js"

export class GroupDeleteByIdUsecase {
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
     * Check and delete the group, if it exists..
     * @param {string} id - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupExist = await this.#_repositoy.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repositoy.deleteByIdAsync(id);

        return Result.success("Grupo deletado com sucesso.", null);
    }
}
