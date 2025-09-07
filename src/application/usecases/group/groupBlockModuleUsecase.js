import { BlockedModule } from "../../../domain/valueObject/BlockedModule.js";
import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupBlockModuleUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Block module.
     * @param {string} groupId - group id. 
     * @param {string} moduleName - module name. 
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, moduleName) {
        const module = await this.#_repository.getModuleByNameAsync(groupId, moduleName);
        if (module) return Result.failure("O module já está bloqueado.", null);

        const newBockModule = new BlockedModule(groupId, moduleName);

        await this.#_repository.blockModuleAsync(newBockModule);

        return Result.success("Module bloqueado com successo.", newBockModule);
    }
}
