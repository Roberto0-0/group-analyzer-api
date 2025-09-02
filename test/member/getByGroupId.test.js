import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { MemberGetByGroupIdUsecase } from "../../src/application/usecases/member/memberGetByGroupIdUsecase.js";

test("should get member to group.", async () => {
    const memberRepository = new MemberSQLiteRespository();
    const groupRepository = new GroupSQLiteRespository();

    const id = "29302030@c.us";
    const groupId = "1293020340"; 

    const getMemberByIdUsecase = new MemberGetByGroupIdUsecase(memberRepository, groupRepository);
    const response = await getMemberByIdUsecase.execute(id, groupId);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});
