import test, { after } from "node:test";
import assert from "node:assert/strict";
import { GroupSetMemberTimeoutUsecase } from "../../src/application/usecases/group/groupSetMemberTimeoutUsecase.js";
import { GroupPgRepository } from "../../src/infrastructure/repositories/groupPgRepository.js";
import { db } from "../../src/infrastructure/persistence/dbContext.js";

test("should set member timeout.", async () => {
    const repository = new GroupPgRepository();

    const groupId = "2930203002029@c.us";
    const memberId = "29393020300@c.us";
    const request = {
        timeRef: "30m",
        reason: "Message spam"
    }

    const setMemberTimeouot = new GroupSetMemberTimeoutUsecase(repository);
    const response = await setMemberTimeouot.execute(groupId, memberId, request);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);

    after(async () => {
        await db.$client.end();
    });
});
