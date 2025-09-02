import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupGetById } from "../../src/application/usecases/group/groupGetByIdUsecase.js";

test("should get group by id.", async () => {
    const id = "1293020340";

    const groupRepository = new GroupSQLiteRespository();
    const getGroupByIdUsecase = new GroupGetById(groupRepository);
    const response = await getGroupByIdUsecase.execute(id);

    if(!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.data.id, id);
});
