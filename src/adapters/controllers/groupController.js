import { Result } from "../../application/common/result.js";
import { GroupCreateUsecase } from "../../application/usecases/group/groupCreateUsecase.js";
import { GroupGetByIdUsecase } from "../../application/usecases/group/groupGetByIdUsecase.js";
import { GroupGetAllUsecase } from "../../application/usecases/group/groupGetAllUsecase.js";
import { GroupDeleteByIdUsecase } from "../../application/usecases/group/groupDeleteByIdUsecase.js";
import { GroupNameUpdateUsecase } from "../../application/usecases/group/groupNameUpdateUsecase.js";
import { GroupMemberCountUpdateUsecase } from "../../application/usecases/group/groupMemberCountUpdateUsecase.js";
import { GroupGetMembersUsecase } from "../../application/usecases/group/groupGetMembersUsecase.js";
import { GroupSetMemberTimeoutUsecase } from "../../application/usecases/group/groupSetMemberTimeoutUsecase.js";
import { GroupVerifyMemberTimeoutUsecase } from "../../application/usecases/group/groupVerifyMemberTimeoutUsecase.js";
import { GroupBlockModuleUsecase } from "../../application/usecases/group/groupBlockModuleUsecase.js";
import { GroupUnBlockModuleUsecase } from "../../application/usecases/group/groupUnBlockModuleUsecase.js";
import { GroupVerifyBlockedModuleUsecase } from "../../application/usecases/group/groupVerifyBlockedModuleUsecase.js";
import { GroupPgRepository } from "../../infrastructure/repositories/groupPgRepository.js";

export class GroupController {
    /** @property {GroupPgRepository} groupRepository */
    #repository = new GroupPgRepository();

    /**
     * create.
     * @param {object} request - group request.
     * @returns {Promise<Result>}
    */
    async create(request) {
        const usecase = new GroupCreateUsecase(this.#repository);
        return await usecase.execute(request);
    }

    /**
     * get by id.
     * @param {string} id - group id.
     * @returns {Promise<Result>}
    */
    async getById(id) {
        const usecase = new GroupGetByIdUsecase(this.#repository);
        return await usecase.execute(id);
    }

    /**
     * get all.
     * @returns {Promise<Result>}
    */
    async getAll() {
        const usecase = new GroupGetAllUsecase(this.#repository);
        return await usecase.execute();
    }

    /**
     * get members.
     * @param {string} id - group id.
     * @returns {Promise<Result>}
    */
    async getMembers(id) {
        const usecase = new GroupGetMembersUsecase(this.#repository);
        return await usecase.execute(id);
    }

    /**
     * subject update.
     * @param {string} id - group id.
     * @param {string} name - new group name.
     * @returns {Promise<Result>}
    */
    async newName(id, name) {
        const usecase = new GroupNameUpdateUsecase(this.#repository);
        return await usecase.execute(id, name);
    }

    /**
     * memebr count update.
     * @param {string} id - group id.
     * @param {number} newCount - new member count.
     * @returns {Promise<Result>}
    */
    async newMemberCount(id, newCount) {
        const usecase = new GroupMemberCountUpdateUsecase(this.#repository);
        return await usecase.execute(id, newCount);
    }

    /**
     * delete by id.
     * @param {string} id - group id.
     * @returns {Promise<Result>}
    */
    async deleteById(id) {
        const usecase = new GroupDeleteByIdUsecase(this.#repository);
        return await usecase.execute(id);
    }

    /**
     * set member timeout.
     * @param {string} id - group id.
     * @param {string} memberId - member id.
     * @param {object} request 
     * @returns {Promise<Result>}
    */
    async setTimeout(id, memberId, request) {
        const usecase = new GroupSetMemberTimeoutUsecase(this.#repository);
        return await usecase.execute(id, memberId, request);
    }

    /**
     * timeout verify.
     * @param {string} id - group id.
     * @param {string} memberId - member id.
     * @returns {Promise<Result>}
    */
    async timeoutVerify(id, memberId) {
        const usecase = new GroupVerifyMemberTimeoutUsecase(this.#repository);
        return await usecase.execute(id, memberId);
    }

    /**
     * block module.
     * @param {string} id - group id.
     * @param {string} moduleName  - module name.
     * @returns {Promise<Result>}
    */
    async blockModule(id, moduleName) {
        const usecase = new GroupBlockModuleUsecase(this.#repository);
        return await usecase.execute(id, moduleName);
    }

    /**
     * unblock module.
     * @param {string} id - group id.
     * @param {string} moduleName  - module name.
     * @returns {Promise<Result>}
    */
    async unblockModule(id, moduleName) {
        const usecase = new GroupUnBlockModuleUsecase(this.#repository);
        return await usecase.execute(id, moduleName);
    }

    /**
     * blocked module verify.
     * @param {string} id - group id.
     * @param {string} moduleName  - module name.
     * @returns {Promise<Result>}
    */
    async moduleVerify(id, moduleName) {
        const usecase = new GroupVerifyBlockedModuleUsecase(this.#repository);
        return await usecase.execute(id, moduleName);
    }
}
