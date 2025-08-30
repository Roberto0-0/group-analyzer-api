import { Group } from "../../../domain/entities/Group.js";
import { GroupSQLiteRespository } from "../../../infrastructure/repositories/groupSQLiteRepository.js";
import { Result } from "../../common/result.js";
import { GroupCreateRequest } from "../../requests/groupCreateRequest.js";

export class GroupCreateUsecase {
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
     * Validates the request and returns a new group.
     * @param {GroupCreateRequest} request
     * @returns {Promise<Result>} Result.
    */
    async execute(request) {
        const groupExist = await this.#_repositoy.getByIdAsync(request.id);
        if (groupExist) return Result.failure("Este grupo já existe.", null);

        const newGroup = new Group(
            request.id,
            request.subject,
            request.ownerId,
            request.memberCount,
            request.createdAt
        );

        await this.#_repositoy.addAsync(newGroup);

        return Result.success("Grupo criado com successo.", newGroup);
    }
}
