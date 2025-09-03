import { BlockedModule } from "../../../domain/valueObject/BlockedModule.js";
import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupBlockModuleUsecase {
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
     * Block module.
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
        if (module) return Result.failure("O module já está bloqueado.", null);

        const newBockModule = new BlockedModule(groupId, moduleName);

        await this.#_repositoy.blockModuleAsync(newBockModule);

        return Result.success("Module bloqueado com successo.", newBockModule);
    }
}
