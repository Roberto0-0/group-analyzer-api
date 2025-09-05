import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberGetAssociationCountUsecase {
    /** @property {MemberQLiteRespository} _repositoy - SQLite repository */
    #_repository;

    /** @param {MemberSQLiteRespository} repository */
    constructor(repository) {
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
