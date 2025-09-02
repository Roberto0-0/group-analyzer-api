import { MemberSQLiteRespository } from "../../../infrastructure/repositories/memberSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class MemberGetAllUsecase {
    /** @property {MemberQLiteRespository} _repositoy - SQLite repository */
    #_repository;

    /** @param {MemberSQLiteRespository} repository */
    constructor(repository) {
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
