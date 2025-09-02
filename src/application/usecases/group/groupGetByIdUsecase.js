import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupGetById {
    /** @property {GroupSQLiteRespository} _repository - SQLite repository*/
    #_repository;

    /** @param {GroupSQLiteRespository} repository */
    constructor(repository) {
        this.#_repository = repository;
    }

    /**
     * Get group by id.
     * @param {string} id - group id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id) {
        const group = await this.#_repository.getByIdAsync(id);
        if (!group) return Result.failure("Grupo não encontrado.", null);

        return Result.success("Grupo encontrado.", group);
    }
}
