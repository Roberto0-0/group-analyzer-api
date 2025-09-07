import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberGetAllUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /** 
    * Get all members.
    * @returns {Promise<Result>} Result.
    */
    async execute() {
        const members = await this.#_repository.getAllAsync();
        if(members.length < 1) Result.success("Nenhum membro foi encontrado", null);

        return Result.success(`${members.length} membro's encontrado's`, members);
    }
}
