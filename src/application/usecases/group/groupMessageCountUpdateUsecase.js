import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";

export class GroupMessageCountUpdateUsecase {
    /**
     * @property {GroupSQLiteRespository} _repository - SQLite repository.
     */
    #_repositoy;

    /**
     * @param {GroupSQLiteRespository} repository - SQLite repository.
     */
    constructor(repository) {
        /** @type {GroupSQLiteRespository}*/
        this.#_repositoy = repository;
    }

    /**
     * Check and update the message count, if the group exists. 
     * @param {string} id - group id. 
     * @param {number} newMessageCount - new group message count. 
     * @returns {Promise<Result>} Result 
    */
    async execute(id, newMessageCount) {
        const groupExist = await this.#_repositoy.getByIdAsync(id);
        if (!groupExist) return Result.failure("Grupo não encontrado.", null);

        await this.#_repositoy.messageCountUpdateAsync(id, newMessageCount);

        return Result.success("Contagem de mensagens atualizada.", null);
    }
}
