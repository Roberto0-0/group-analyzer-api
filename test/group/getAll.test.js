import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupGetAllUsecase } from "../../src/application/usecases/group/groupGetAllUsecase.js";

test("should get all groups.", async () => {
    const repository = new GroupSQLiteRespository();

    const getAllGroupsUsecase = new GroupGetAllUsecase(repository);
    const response = await getAllGroupsUsecase.execute();

    if(!response.success) assert.fail(response.message);

    assert.equal(response.data.length, 1);
});
