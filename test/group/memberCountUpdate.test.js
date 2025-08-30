import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupMemberCountUpdateUsecase } from "../../src/application/usecases/group/groupMemberCountUpdateUsecase.js";
import { GroupGetById } from "../../src/application/usecases/group/groupGetByIdUsecase.js";

test("should get group by id.", async () => {
    const groupRepository = new GroupSQLiteRespository();
    const id = "2039403040";

    const getGroupByIdUsecase = new GroupGetById(groupRepository);
    const getByIdresponse = await getGroupByIdUsecase.execute(id);

    const newMemberCount = getByIdresponse.data.memberCount - 70;

    const groupMmeberCountUpdate = new GroupMemberCountUpdateUsecase(groupRepository);
    const response = await groupMmeberCountUpdate.execute(getByIdresponse.data.id, newMemberCount);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
