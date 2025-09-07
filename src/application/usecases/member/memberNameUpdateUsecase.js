import { Result } from "../../common/result.js";
import { IMemberRepository } from "../../interfaces/IMemberRepository.js";

export class MemberNameUpdateUsecase {
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
     * @param {string} newName - member new name.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, newName) {
        const member = await this.#_repository.getByIdAsync(id);
        if(!member) return Result.failure("Membro não encontrado.", null);

        member.setName(newName);

        await this.#_repository.nameUpdateAsync(id, member.name, member.shortName);

        return Result.success("Nome atualizado com sucesso.", null);
    }
}
