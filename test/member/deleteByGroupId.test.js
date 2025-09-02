import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { MemberDeleteByGroupIdUsecase } from "../../src/application/usecases/member/memberDeleteByGroupId.js";

test("should delete member to group.", async () => {
    const memberRepository = new MemberSQLiteRespository();
    const groupRepository = new GroupSQLiteRespository();

    const groupId = "1293020340";
    const id = "29302030@c.us";

    const deleteMemberByIdUsecase = new MemberDeleteByGroupIdUsecase(memberRepository, groupRepository);
    const response = await deleteMemberByIdUsecase.execute(id, groupId);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});
