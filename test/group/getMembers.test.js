import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupGetMembersUsecase } from "../../src/application/usecases/group/groupGetMembers.js";

test("should get all members by group.", async () => {
    const repository = new GroupSQLiteRespository();

    const groupId = "1293020340";

    const getGroupMembersUsecase = new GroupGetMembersUsecase(repository);
    const response = await getGroupMembersUsecase.execute(groupId);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});
