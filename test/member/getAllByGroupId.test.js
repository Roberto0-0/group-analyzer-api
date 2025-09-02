import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberGetAllByGroupIdUsecase } from "../../src/application/usecases/member/memberGetAllByGroupUsecase.js";

test("should get all members by group.", async () => {
    const repository = new MemberSQLiteRespository();

    const groupId = "210390230";

    const getAllMemberByGroupUsecase = new MemberGetAllByGroupIdUsecase(repository);
    const response = await getAllMemberByGroupUsecase.execute(groupId);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});
