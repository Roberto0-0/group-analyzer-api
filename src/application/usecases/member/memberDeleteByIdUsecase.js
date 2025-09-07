import { Result } from "../../common/result.js"
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberDeleteByIdUsecase {
    /** @property {IMemberRepository} _repository */
    #_repository;

    /** @param {IMemberRepository} repository */
    constructor(repository) {
        /** @type {IMemberRepository}*/
        this.#_repository = repository;
    }

    /**
     * Check and delete the member, if it exists..
     * @param {string} id - member id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupExist = await this.#_repository.getByIdAsync(id);
        if (!groupExist) return Result.failure("Membro não encontrado.", null);

        await this.#_repository.deleteByIdAsync(id);

        return Result.success("Membro deletado com sucesso.", null);
    }
}
