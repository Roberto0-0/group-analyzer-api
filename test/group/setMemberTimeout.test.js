import test from "node:test";
import assert from "node:assert/strict";
import { GroupSetMemberTimeoutUsecase } from "../../src/application/usecases/group/groupSetMemberTimeoutUsecase.js";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";

test("should set member timeout.", async () => {
    const memberRepository = new MemberSQLiteRespository();
    const groupRepository = new GroupSQLiteRespository();

    const groupId = "1293020340";
    const memberId = "29392030@c.us";
    const request = {
        timeRef: "30m",
        reason: "Mucho gay"
    }

    const setMemberTimeouot = new GroupSetMemberTimeoutUsecase(groupRepository, memberRepository);
    const response = await setMemberTimeouot.execute(groupId, memberId, request);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
