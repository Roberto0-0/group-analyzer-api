import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupMessageCountUpdateUsecase } from "../../src/application/usecases/group/groupMessageCountUpdateUsecase.js";
import { GroupGetById } from "../../src/application/usecases/group/groupGetByIdUsecase.js";

test("should get group by id.", async () => {
    const groupRepository = new GroupSQLiteRespository();
    const id = "2039403040";

    const getGroupByIdUsecase = new GroupGetById(groupRepository);
    const getByIdresponse = await getGroupByIdUsecase.execute(id);

    const newMessageCount = getByIdresponse.data.messageCount + 1;

    const groupMessageCountUpdate = new GroupMessageCountUpdateUsecase(groupRepository);
    const response = await groupMessageCountUpdate.execute(getByIdresponse.data.id, newMessageCount);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});
