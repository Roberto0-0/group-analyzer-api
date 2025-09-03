import { BlockedModule } from "../../../domain/valueObject/BlockedModule.js";
import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupUnBlockModuleUsecase {
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
     * Unblock module.
     * @param {string} groupId - group id. 
     * @param {string} moduleName - module name. 
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, moduleName) {
        const [group, module] = await Promise.all([
            this.#_repositoy.getByIdAsync(groupId),
            this.#_repositoy.getModuleByName(groupId, moduleName),
        ]);

        if (!group) return Result.failure("Grupo não encontrado.", null);
        if (!module) return Result.failure("Module não encontrado.", null);

        await this.#_repositoy.unBlockModule(groupId, moduleName);

        return Result.success("Module desbloquado com successo.", null);
    }
}
