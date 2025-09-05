import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberCreateUsecase } from "../../src/application/usecases/member/memberCreateUsecase.js";

test("should create a member", async () => {
    const repository = new MemberSQLiteRespository();

    const groupId = "1293020340";
    const memberForm = {
        id: "29392030@c.us",
        name: "Ana maria"
    }

    const createMemberUsecase = new MemberCreateUsecase(repository);
    const response = await createMemberUsecase.execute(groupId, memberForm);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
