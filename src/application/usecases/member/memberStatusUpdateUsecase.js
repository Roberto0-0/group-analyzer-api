import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberStatusUpdateUsecase {
    /** @property {MemberQLiteRespository} _repository - SQLite repository*/
    #_repository;

    /** @param {MemberSQLiteRespository} repository */
    constructor(repository) {
        this.#_repository = repository;
    }

    /**
     * Get member by id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @param {object} request - member update request.
     * @returns {Promise<Result>} Result.
     */
    async execute(id, groupId, request) {
        await this.#_repository.statusUpdateAsync(id, groupId, request);
        return Result.success("Status atualizado com sucesso.", null);
    }
}
