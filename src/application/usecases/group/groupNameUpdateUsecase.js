import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupNameUpdateUsecase {
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
     * Check and update the subject, if the group exists. 
     * @param {string} id - group id. 
     * @param {string} newName - new group subject. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, newName) {
        const groupExist = await this.#_repositoy.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repositoy.nameUpdateAsync(id, newName);

        return Result.success("Nome do grupo atualizado.", null);
    }
}
