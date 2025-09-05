import test from "node:test";
import assert from "node:assert/strict";
import { GroupCreateUsecase } from "../../src/application/usecases/group/groupCreateUsecase.js";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";

test("should create group.", async () => {
    const groupForm = {
        id: "1293020340",
        subject: "compras",
        ownerId: "2930203@c.us",
        memberCount: 250,
        createdAt: Date.now()
    };

    const groupRepository = new GroupSQLiteRespository();
    const createGroupUsecase = new GroupCreateUsecase(groupRepository);
    const response = await createGroupUsecase.execute(groupForm);

    if(!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
