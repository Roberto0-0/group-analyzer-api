import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberNameUpdateUsecase {
    /** @property {MemberQLiteRespository} _repository - SQLite repository*/
    #_repository;

    /** @param {MemberSQLiteRespository} repository */
    constructor(repository) {
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
