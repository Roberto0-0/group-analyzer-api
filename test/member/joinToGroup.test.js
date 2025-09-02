import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { MemberJoinToGroupUsecase } from "../../src/application/usecases/member/memberJoinToGroupUsecase.js";

test("should join member to group", async () => {
    const memberRepository = new MemberSQLiteRespository();
    const groupRepository = new GroupSQLiteRespository();

    const groupId = "1293020340";
    const id = "29302030@c.us";

    const createMemberUsecase = new MemberJoinToGroupUsecase(memberRepository, groupRepository);
    const response = await createMemberUsecase.execute(id, groupId);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
