import { Result } from "../../common/result.js"
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupGetMembersUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Returns group members.
     * @param {string} id - group id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupMembers = await this.#_repository.getMembers(id);
        if (groupMembers.length < 1) Result.success("Nenhum membro foi encontrado", []);

        return Result.success(`${groupMembers.length} membro's encontrado's`, groupMembers);
    }
}
