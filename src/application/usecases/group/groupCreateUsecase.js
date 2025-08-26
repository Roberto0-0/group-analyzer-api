import { Group } from "../../../domain/entities/Group.js";
import { GroupInMemoryRespository } from "../../../infrastructure/repositories/groupInMemoryRespository.js";
import { GroupCreateRequest } from "../../requests/groupCreateRequest.js";

export class GroupCreateUsecase {
    /**
     * @property {GroupInMemoryRespository} _repository - in memory repository.
     */
    #_repositoy;

    /**
     * @param {GroupInMemoryRespository} repository - in memory repository.
     */
    constructor(repository) {
        /** @type {GroupInMemoryRespository}*/
        this.#_repositoy = repository;
    }

    /**
     * Validates the request and returns a new group.
     * @param {GroupCreateRequest} request
     * @returns {(Group|Error)} Group or Error.
    */
    execute(request) {
        const groupExist = this.#_repositoy.getById(request.id);
        if (groupExist) return new Error("This group already exist.");

        const newGroup = new Group(
            request.id,
            request.subject,
            request.ownerId,
            request.memberCount,
            request.createdAt
        );

        this.#_repositoy.create(newGroup);

        return newGroup;
    }
}
