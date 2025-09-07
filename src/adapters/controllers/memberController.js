import { Result } from "../../application/common/result.js";
import { MemberCreateUsecase } from "../../application/usecases/member/memberCreateUsecase.js";
import { MemberDeleteByGroupIdUsecase } from "../../application/usecases/member/memberDeleteByGroupId.js";
import { MemberDeleteByIdUsecase } from "../../application/usecases/member/memberDeleteByIdUsecase.js";
import { MemberGetAllByGroupIdUsecase } from "../../application/usecases/member/memberGetAllByGroupUsecase.js";
import { MemberGetAllUsecase } from "../../application/usecases/member/memberGetAllUsecase.js";
import { MemberGetAssociationCountUsecase } from "../../application/usecases/member/memberGetAssociationCountUsecase.js";
import { MemberGetByAssociationUsacase } from "../../application/usecases/member/memberGetByAssociantionUsecase.js";
import { MemberGetByGroupIdUsecase } from "../../application/usecases/member/memberGetByGroupIdUsecase.js";
import { MemberGetByIdUsecase } from "../../application/usecases/member/memberGetByIdUsecase.js";
import { MemberJoinToGroupUsecase } from "../../application/usecases/member/memberJoinToGroupUsecase.js";
import { MemberNameUpdateUsecase } from "../../application/usecases/member/memberNameUpdateUsecase.js";
import { MemberStatusUpdateUsecase } from "../../application/usecases/member/memberStatusUpdateUsecase.js";
import { MemberXpManagerUsecase } from "../../application/usecases/member/memberXpManagerUsecase.js";
import { MemberPgRepository } from "../../infrastructure/repositories/memberPgRepository.js";

export class MemberController {
    /** @property {MemberPgRepository} memberRepository */ 
    #memberRepository = new MemberPgRepository();

    /**
     * create.
     * @param {string} groupId - group id.
     * @param {object} request - member create request.
     * @returns {Promise<Result>}
    */
    async create(groupId, request) {
        const usecase = new MemberCreateUsecase(this.#memberRepository);
        return await usecase.execute(groupId, request);
    }

    /**
     * get by id.
     * @param {string} id - member id.
     * @returns {Promise<Result>}
    */
    async getById(id) {
        const usecase = new MemberGetByIdUsecase(this.#memberRepository);
        return await usecase.execute(id);
    }

    /**
     * get by group id.
     * @param {string} id - member id.
     * @param {string} groupId - groupd id.
     * @returns {Promise<Result>}
    */
    async getByGroupId(id, groupId) {
        const usecase = new MemberGetByGroupIdUsecase(this.#memberRepository);
        return await usecase.execute(id, groupId);
    }

    /**
     * get by association.
     * @param {string} id - member id.
     * @param {string} groupId - groupd id.
     * @returns {Promise<Result>}
    */
    async getByAssociation(id, groupId) {
        const usecase = new MemberGetByAssociationUsacase(this.#memberRepository);
        return await usecase.execute(id, groupId);
    }

    /**
     * get all.
     * @returns {Promise<Result>}
    */
    async getAll() {
        const usecase = new MemberGetAllUsecase(this.#memberRepository);
        return await usecase.execute();
    }

    /**
     * get all by group id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>}
    */
    async getAllByGroupId(groupId) {
        const usecase = new MemberGetAllByGroupIdUsecase(this.#memberRepository);
        return await usecase.execute(groupId);
    }

    /**
     * get count by associantion.
     * @param {string} id - member id.
     * @returns {Promise<Result>}
    */
    async getCount(id) {
        const usecase = new MemberGetAssociationCountUsecase(this.#memberRepository);
        return await usecase.execute(id);
    }

    /**
     * name update.
     * @param {string} id - member id.
     * @param {string} name - new member name.
     * @returns {Promise<Result>}
    */
    async newName(id, name) {
        const usecase = new MemberNameUpdateUsecase(this.#memberRepository);
        return await usecase.execute(id, name);
    }

    /**
     * delete by id.
     * @param {string} id - member id.
     * @returns {Promise<Result>}
    */
    async deleteById(id) {
        const usecase = new MemberDeleteByIdUsecase(this.#memberRepository);
        return await usecase.execute(id);
    }

    /**
     * delete by group id.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>}
    */
    async deleteByGroupId(id, groupId) {
        const usecase = new MemberDeleteByGroupIdUsecase(this.#memberRepository);
        return await usecase.execute(id, groupId);
    }

    /**
     * add member to grupo.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @returns {Promise<Result>}
    */
    async addMemberToGroup(id, groupId) {
        const usecase = new MemberJoinToGroupUsecase(this.#memberRepository);
        return await usecase.execute(id, groupId);
    }

    /**
     * status update.
     * @param {string} id - member id.
     * @param {string} groupId - group id.
     * @param {object} request - status update request.
     * @returns {Promise<Result>}
    */
    async statusUpdate(id, groupId, request) {
        const usecase = new MemberStatusUpdateUsecase(this.#memberRepository);
        return await usecase.execute(id, groupId, request);
    }

    /**
     * xp manager.
     * @param {string} memberId - member id.
     * @param {string} groupId - group id.
     * @param {object} member
     * @returns {Result}
    */
    xpManager(memberId, groupId, member) {
        const usecase = new MemberXpManagerUsecase();
        return usecase.execute(memberId, groupId, member);
    }
}
