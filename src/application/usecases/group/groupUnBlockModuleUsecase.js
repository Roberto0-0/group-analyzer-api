import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupUnBlockModuleUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Unblock module.
     * @param {string} groupId - group id. 
     * @param {string} moduleName - module name. 
     * @returns {Promise<Result>} Result.
    */
    async execute(groupId, moduleName) {
        await this.#_repository.unBlockModuleAsync(groupId, moduleName);

        return Result.success("Module desbloquado com successo.", null);
    }
}
