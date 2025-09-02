import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberGetByIdUsecase {
    /** @property {MemberQLiteRespository} _repository - SQLite repository*/
    #_repository;

    /** @param {MemberSQLiteRespository} repository */
    constructor(repository) {
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
