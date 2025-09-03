import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupVerifyMemberTimeoutUsecase } from "../../src/application/usecases/group/groupVerifyMemberTimeoutUsecase.js";

test("should set member timeout.", async () => {
    const memberRepository = new MemberSQLiteRespository();
    const groupRepository = new GroupSQLiteRespository();

    const groupId = "1293020340";
    const memberId = "29392030@c.us";

    const setMemberTimeouot = new GroupVerifyMemberTimeoutUsecase(groupRepository, memberRepository);
    const response = await setMemberTimeouot.execute(groupId, memberId);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.data, true);
});
