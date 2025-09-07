import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupVerifyBlockedModuleUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Verify module.
     * @param {string} groupId - group id. 
     * @param {string} moduleName - module name. 
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, moduleName) {
        const module = await this.#_repository.getModuleByNameAsync(groupId, moduleName);
        if (!module) return Result.failure("Module não encontrado.", null);

        return Result.success("Module encontrado.", module);
    }
}
