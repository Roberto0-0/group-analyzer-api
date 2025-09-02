import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js"

export class MemberDeleteByIdUsecase {
    /**
     * @property {MemberSQLiteRespository} _repository - SQLite repository.
     */
    #_repositoy;

    /**
     * @param {MemberSQLiteRespository} repository - SQLite repository.
     */
    constructor(repository) {
        /** @type {MemberSQLiteRespository}*/
        this.#_repositoy = repository;
    }

    /**
     * Check and delete the member, if it exists..
     * @param {string} id - member id. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id) {
        const groupExist = await this.#_repositoy.getByIdAsync(id);
        if (!groupExist) return Result.failure("Membro não encontrado.", null);

        await this.#_repositoy.deleteByIdAsync(id);

        return Result.success("Membro deletado com sucesso.", null);
    }
}
