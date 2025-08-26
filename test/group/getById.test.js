import test from "node:test";
import assert from "node:assert/strict";
import { GroupInMemoryRespository } from "../../src/infrastructure/repositories/groupInMemoryRespository.js";
import { GroupGetById } from "../../src/application/usecases/group/groupGetByIdUsecase.js";

test("should get group by id.", () => {
    const id = "293902030";

    const groupRepository = new GroupInMemoryRespository();
    const getGroupByIdUsecase = new GroupGetById(groupRepository);
    const response = getGroupByIdUsecase.execute(id);

    assert.equal(response, null);
});
