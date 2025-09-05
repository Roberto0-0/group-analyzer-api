import { MemberToGroup } from "../../../domain/valueObject/MemberToGroup.js";
import { Result } from "../../common/result.js";

export class MemberXpManagerUsecase {
    /**
     * xp amanger
     * @param {string} groupId - group id. 
     * @param {object} member - Member type. 
     * @returns {Result}
     */
    execute(groupId, member) {
        const memberToGroup = new MemberToGroup(member.id, groupId);

        memberToGroup.levelUp(member);

        return Result.success("XP genrenciado com sucesso.", {
            level: memberToGroup.level,
            xp: memberToGroup.xp,
            xpRequired: memberToGroup.xpRequired,
        });
    }
}
