import { Group } from "../../../domain/entities/Group.js";
import { Result } from "../../common/result.js";
import { IGroupRepository } from "../../interfaces/IGroupRepository.js";

export class GroupCreateUsecase {
    /** @property {IGroupRepository} _repository */
    #_repository;

    /** @param {IGroupRepository} repository */
    constructor(repository) {
        /** @type {IGroupRepository}*/
        this.#_repository = repository;
    }

    /**
     * Validates the request and returns a new group.
     * @param {object} request
     * @returns {Promise<Result>} Result.
    */
    async execute(request) {
        const groupExist = await this.#_repository.getByIdAsync(request.id);
        if (groupExist) return Result.failure("Este grupo já existe.", null);

        const newGroup = new Group(
            request.id,
            request.name,
            request.memberCount,
            request.createdAt
        );

        await this.#_repository.addAsync(newGroup);

        return Result.success("Grupo criado com successo.", newGroup);
    }
}
