import test, { after } from "node:test";
import assert from "node:assert/strict";
import { GroupCreateUsecase } from "../../src/application/usecases/group/groupCreateUsecase.js";
import { GroupPgRepository } from "../../src/infrastructure/repositories/groupPgRepository.js";
import { db } from "../../src/infrastructure/persistence/dbContext.js";

test("should create group.", async () => {
    const groupForm = {
        id: "1293020340",
        name: "compras",
        memberCount: 10,
        createdAt: Date.now()
    };

    const repository = new GroupPgRepository();

    const createGroupUsecase = new GroupCreateUsecase(repository);
    const response = await createGroupUsecase.execute(groupForm);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);

    after(async () => {
        await db.$client.end();
    });
});
