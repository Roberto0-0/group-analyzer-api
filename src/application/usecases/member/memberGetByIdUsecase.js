import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberGetByIdUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Get member by id.
     * @param {string} id - member id.
     * @returns {Promise<Result>} Result.
     */
    async execute(id) {
        const member = await this.#_repository.getByIdAsync(id);
        if (!member) return Result.failure("Membro não encontrado.", null);

        return Result.success("Membro encontrado.", member);
    }
}
