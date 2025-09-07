import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupGetAllUsecase {
    /** @property {IGroupRepository} _repository*/
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /** 
    * Get all groups.
    * @returns {Promise<Result>} Result.
    */
    async execute() {
        const groups = await this.#_repository.getAllAsync();
        if(groups.length < 1) Result.success("Nenhum grupo foi encontrado", []);

        return Result.success(`${groups.length} grupo's encontrado's`, groups);
    }
}
