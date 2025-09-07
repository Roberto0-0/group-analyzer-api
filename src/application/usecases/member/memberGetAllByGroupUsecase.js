import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberGetAllByGroupIdUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /** 
    * Get all members by group.
    * @param {string} groupId - group id.
    * @returns {Promise<Result>} Result.
    */
    async execute(groupId) {
        const members = await this.#_repository.getAllByGroupIdAsync(groupId);
        if(members.length < 1) Result.success("Nenhum membro foi encontrado para esse grupo.", null);

        return Result.success(`${members.length} membro's encontrado's`, members);
    }
}
