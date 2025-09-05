import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberStatusUpdateUsecase } from "../../src/application/usecases/member/memberStatusUpdateUsecase.js";

test("should update member status.", async () => {
    const repository = new MemberSQLiteRespository();

    const groupId = "1293020340";
    const id = "29392030@c.us";

    const request = {
        messageCount: 5,
        lastMessageAt: Date.now()
    }

    const getMemberByIdUsecase = new MemberStatusUpdateUsecase(repository);
    const response = await getMemberByIdUsecase.execute(id, groupId, request);

    assert.equal(response.success, true);
});
