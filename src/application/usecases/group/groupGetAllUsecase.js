import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupGetAllUsecase {
    /** @property {GroupSQLiteRespository} _repositoy - SQLite repository */
    #_repository;

    /** @param {GroupSQLiteRespository} repository */
    constructor(repository) {
        this.#_repository = repository;
    }

    /** 
    * Get all groups.
    * @returns {Promise<Result>} Result.
    */
    async execute() {
        const groups = await this.#_repository.getAllAsync();
        if(groups.length < 1) Result.success("Nenhum grupo foi encontrado", null);

        return Result.success(`${groups.length} grupo's encontrado's`, groups);
    }
}
