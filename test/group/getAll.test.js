import test from "node:test";
import assert from "node:assert/strict";
import { GroupInMemoryRespository } from "../../src/infrastructure/repositories/groupInMemoryRespository.js";
import { GroupGetAllUsecase } from "../../src/application/usecases/group/groupGetAllUsecase.js";

test("should get all groups.", () => {
    const repository = new GroupInMemoryRespository();

    const getAllGroupsUsecase = new GroupGetAllUsecase(repository);
    const response = getAllGroupsUsecase.execute();

    assert.equal(response, 0);
});
