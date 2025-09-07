import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberGetAssociationCountUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /** 
    * Get member associantion count.
    * @param {string} id - member id.
    * @returns {Promise<Result>} Result.
    */
    async execute(id) {
        const member = await this.#_repository.getByIdAsync(id);
        if (!member) return Result.failure("Membro não encontrado.", null);

        const result = await this.#_repository.getAssociationCount(id);
        return Result.success(`${result.count} associações ao membro.`, result);
    }
}
